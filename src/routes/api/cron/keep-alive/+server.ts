import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CRON_SECRET } from '$env/static/private';

export const GET: RequestHandler = async ({ request, locals: { supabase } }) => {
	// 1. Verify Authorization (Vercel Cron sends a specific header or we use a secret)
	const authHeader = request.headers.get('authorization');
	
	// If CRON_SECRET is set, we verify it. Vercel Cron uses "Bearer CRON_SECRET"
	if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
		return json({ error: 'UNAUTHORIZED_TRANSMISSION' }, { status: 401 });
	}

	try {
		// 2. Perform a lightweight query to active the Supabase instance
		// We fetch one column from the company profile as a heartbeat
		const { data, error } = await supabase
			.from('company_profile')
			.select('name')
			.limit(1)
			.single();

		if (error) {
			console.error('CRON: HEARTBEAT_FAILED', error);
			return json({ error: 'HEARTBEAT_FAILED', details: error.message }, { status: 500 });
		}

		console.log('CRON: HEARTBEAT_SUCCESSFUL', { timestamp: new Date().toISOString() });
		
		return json({
			success: true,
			message: 'HEARTBEAT_STABLE',
			system: 'BATUAH_ENGINE_STAY_ALIVE',
			ping: data.name
		});
	} catch (err) {
		console.error('CRON: SYSTEM_CRITICAL_FAILURE', err);
		return json({ error: 'SYSTEM_CRITICAL_FAILURE' }, { status: 500 });
	}
};
