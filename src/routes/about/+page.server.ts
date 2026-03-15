export const load = async ({ locals }) => {
	const { data: profile } = await locals.supabase
		.from('company_profile')
		.select('*')
		.single();

	const { data: team } = await locals.supabase
		.from('team_members')
		.select('*')
		.order('display_order', { ascending: true });

	return {
		profile,
		team: team ?? []
	};
};
