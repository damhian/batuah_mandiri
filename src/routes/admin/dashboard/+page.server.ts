import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: stats } = await locals.supabase.rpc('get_admin_stats');
	return { stats };
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		// scope: 'global' invalidates ALL refresh tokens for this user,
		// not just the current session — prevents token reuse from other devices
		await locals.supabase.auth.signOut({ scope: 'global' });
		throw redirect(303, '/');
	}
};
