export const load = async ({ locals }) => {
	const { data: profile } = await locals.supabase
		.from('company_profile')
		.select('*')
		.single();

	const { data: testimonials } = await locals.supabase
		.from('testimonials')
		.select('*')
		.eq('is_published', true)
		.order('created_at', { ascending: false });

	return {
		profile,
		testimonials: testimonials ?? []
	};
};
