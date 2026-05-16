import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: stats } = await locals.supabase.rpc('get_admin_stats');
	return { stats };
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/admin');
	}
};
