import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const { data: services, error: servicesError } = await supabase
		.from('services')
		.select('*')
		.order('created_at', { ascending: true });

	if (servicesError) {
		console.error('Error fetching services:', servicesError);
		throw error(500, 'Could not load services');
	}

	return {
		services,
		session: await getSession()
	};
};
