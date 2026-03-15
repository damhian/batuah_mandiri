import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const identity = formData.get('identity') as string;
		const email = formData.get('email') as string;
		const requirements = formData.get('requirements') as string;

		if (!identity || !email || !requirements) {
			return fail(400, { 
				message: 'ALL TRANSMISSION FIELDS ARE REQUIRED',
				error: true 
			});
		}

		const { error } = await supabase
			.from('contact_submissions')
			.insert({
				sender_identity: identity,
				sender_email: email,
				requirements: requirements
			});

		if (error) {
			console.error('Submission Error:', error);
			// Fallback: If table doesn't exist yet, we still return success for UX
			// but log the error for the dev to fix the table.
			if (error.code === '42P01') {
				return fail(500, {
					message: 'TRANSMISSION CORE OFFLINE: PLEASE RUN SQL MIGRATION',
					error: true
				});
			}
			return fail(500, { 
				message: 'SYSTEM MALFUNCTION: UNABLE TO TRANSMIT',
				error: true 
			});
		}

		return { 
			success: true,
			message: 'TRANSMISSION RECEIVED. OUR TEAM WILL CONTACT YOU SOON.' 
		};
	}
};
