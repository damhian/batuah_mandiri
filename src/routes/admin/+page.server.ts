import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { message: 'Email and password are required' });
		}

		const { error } = await locals.supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return fail(401, { message: error.message });
		}

		throw redirect(303, '/admin/dashboard');
	}
};
