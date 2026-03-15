import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: testimonials } = await locals.supabase
		.from('testimonials')
		.select('*')
		.order('created_at', { ascending: false });

	return {
		testimonials: testimonials ?? []
	};
};

export const actions = {
	upsert: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const client_photo = formData.get('client_photo') as File;
		const existing_photo_url = formData.get('existing_photo_url') as string;
		
		let client_photo_url = existing_photo_url;

		// Handle image upload if a new file is provided
		if (client_photo && client_photo.size > 0) {
			const fileName = `testimonials/${Date.now()}-${client_photo.name}`;
			const { data: uploadData, error: uploadError } = await locals.supabase.storage
				.from('media')
				.upload(fileName, client_photo);

			if (uploadError) {
				return { success: false, message: 'Upload failed: ' + uploadError.message };
			}

			const { data: { publicUrl } } = locals.supabase.storage.from('media').getPublicUrl(fileName);
			client_photo_url = publicUrl;

			// Delete old image if it exists and is different
			if (existing_photo_url && existing_photo_url.includes('/media/')) {
				try {
					const urlParts = existing_photo_url.split('/media/');
					const rawPath = urlParts[urlParts.length - 1].split('?')[0];
					const oldPath = decodeURIComponent(rawPath);
					
					await locals.supabase.storage.from('media').remove([oldPath]);
				} catch (e) {
					// Silent fail
				}
			}
		}
		
		const data = {
			client_name: formData.get('client_name'),
			client_company: formData.get('client_company'),
			quote_text: formData.get('quote_text'),
			quote_text_id: formData.get('quote_text_id'),
			client_photo_url,
			is_published: formData.get('is_published') === 'on'
		};

		if (id) {
			const { error } = await locals.supabase.from('testimonials').update(data).eq('id', id);
			if (error) return { success: false, message: error.message };
		} else {
			const { error } = await locals.supabase.from('testimonials').insert(data);
			if (error) return { success: false, message: error.message };
		}

		return { success: true };
	},
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		// Get the record to find the image URL
		const { data: testimonial } = await locals.supabase.from('testimonials').select('client_photo_url').eq('id', id).single();
		
		const { error } = await locals.supabase.from('testimonials').delete().eq('id', id);
		if (error) return { success: false, message: error.message };

		// Clean up storage
		if (testimonial?.client_photo_url && testimonial.client_photo_url.includes('/media/')) {
			try {
				const urlParts = testimonial.client_photo_url.split('/media/');
				const rawPath = urlParts[urlParts.length - 1].split('?')[0];
				const path = decodeURIComponent(rawPath);
				
				await locals.supabase.storage.from('media').remove([path]);
			} catch (e) {
				// Silent fail
			}
		}

		return { success: true };
	}
};
