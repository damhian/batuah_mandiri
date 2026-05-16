import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: team } = await locals.supabase
		.from('team_members')
		.select('*')
		.order('display_order', { ascending: true });

	return {
		team: team ?? []
	};
};

export const actions: Actions = {
	upsert: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const profile_image = formData.get('profile_image') as File;
		const existing_image_url = formData.get('existing_image_url') as string;
		const delete_image = formData.get('delete_image') === 'true';
		
		let profile_image_url: string | null = existing_image_url;

		if (delete_image) {
			profile_image_url = null;
			if (existing_image_url && existing_image_url.includes('/media/')) {
				try {
					const urlParts = existing_image_url.split('/media/');
					const rawPath = urlParts[urlParts.length - 1].split('?')[0];
					const oldPath = decodeURIComponent(rawPath);
					await locals.supabase.storage.from('media').remove([oldPath]);
				} catch {
					// Silently ignore cleanup errors if file is already missing
				}
			}
		} else if (profile_image && profile_image.size > 0) {
			const fileName = `team/${Date.now()}-${profile_image.name}`;
			const { error: uploadError } = await locals.supabase.storage
				.from('media')
				.upload(fileName, profile_image);

			if (uploadError) {
				return { success: false, message: 'Upload failed: ' + uploadError.message };
			}

			const { data: { publicUrl } } = locals.supabase.storage.from('media').getPublicUrl(fileName);
			profile_image_url = publicUrl;

			// Delete old image if it exists and is different
			if (existing_image_url && (existing_image_url.includes('/media/team/') || existing_image_url.includes('/media/testimonials/'))) {
				try {
					// Robust path extraction: extract everything after the bucket name 'media/'
					const urlParts = existing_image_url.split('/media/');
					const rawPath = urlParts[urlParts.length - 1].split('?')[0];
					const oldPath = decodeURIComponent(rawPath);
					
					const { error: deleteError } = await locals.supabase.storage.from('media').remove([oldPath]);
					if (deleteError) {
						return { success: false, message: 'Failed to clean up old image: ' + deleteError.message };
					}
				} catch (e: any) {
					return { success: false, message: 'System error during old image cleanup: ' + (e.message || 'Unknown error') };
				}
			}
		}
		
		const data = {
			name: formData.get('name'),
			role_title: formData.get('role_title'),
			bio: formData.get('bio'),
			bio_id: formData.get('bio_id'),
			profile_image_url,
			display_order: parseInt(formData.get('display_order') as string || '0')
		};

		if (id) {
			const { error } = await locals.supabase.from('team_members').update(data).eq('id', id);
			if (error) return { success: false, message: error.message };
		} else {
			const { error } = await locals.supabase.from('team_members').insert(data);
			if (error) return { success: false, message: error.message };
		}

		return { success: true };
	},
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		// Get the member to find the image URL
		const { data: member } = await locals.supabase.from('team_members').select('profile_image_url').eq('id', id).single();
		
		const { error } = await locals.supabase.from('team_members').delete().eq('id', id);
		if (error) return { success: false, message: error.message };

		// Clean up storage
		if (member?.profile_image_url && member.profile_image_url.includes('/media/')) {
			try {
				const urlParts = member.profile_image_url.split('/media/');
				const rawPath = urlParts[urlParts.length - 1].split('?')[0];
				const path = decodeURIComponent(rawPath);
				
				const { error: deleteError } = await locals.supabase.storage.from('media').remove([path]);
				if (deleteError) {
					return { success: false, message: 'Record deleted, but failed to delete image file: ' + deleteError.message };
				}
			} catch (e: any) {
				return { success: false, message: 'Record deleted, but system error during image cleanup: ' + (e.message || 'Unknown error') };
			}
		}

		return { success: true };
	}
};
