import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: profile } = await locals.supabase
		.from('company_profile')
		.select('*')
		.single();

	return {
		profile
	};
};

export const actions = {
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const updates = {
			vision_statement: formData.get('vision_statement'),
			vision_statement_id: formData.get('vision_statement_id'),
			mission_statement: formData.get('mission_statement'),
			mission_statement_id: formData.get('mission_statement_id'),
			about_us_body: formData.get('about_us_body'),
			about_us_body_id: formData.get('about_us_body_id'),
			years_of_experience: parseInt(formData.get('years_of_experience') as string),
			active_projects_count: parseInt(formData.get('active_projects_count') as string),
			hero_video_youtube_url: formData.get('hero_video_youtube_url')
		};

		const { error } = await locals.supabase
			.from('company_profile')
			.update(updates)
			.eq('id', formData.get('id'));

		if (error) {
			return { success: false, message: error.message };
		}

		return { success: true };
	}
};
