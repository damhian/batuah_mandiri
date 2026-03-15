import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const filePath = params.path;
	if (!filePath) throw error(400, 'Path is required');

	// 1. Check if the project environment is properly configured
	if (!supabase) {
		console.error('API_STORAGE: Supabase client not initialized. Check Environment Variables.');
		// Fallback to static if possible
		throw redirect(302, `/images/services/${filePath}`);
	}

	// 2. Try to verify the file exists in Supabase 'media' bucket
	// In production (Vercel), fs.readFile is restricted. 
	// We use the Supabase public URL as our source of truth.
	const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(filePath);

	// 3. We attempt a quick "check" if file exists by trying to download metadata (optional)
	// but for efficiency, we can just redirect to Supabase Public URL 
	// and fallback to static if the URL is requested and fails (browser level handle)
	
	// Better Resilient Logic:
	// A) If it's an uploaded file (usually with a timestamp or UUID), it's in Supabase.
	// B) If it's a template file (which we pushed to Git), it's in /static/images/services.
	
	// We can try to download from Supabase first
	const { error: storageError } = await supabase.storage.from('media').createSignedUrl(filePath, 60);

	if (storageError) {
		// If not in Supabase, assume it's a local static asset
		console.log(`API_STORAGE: Asset ${filePath} not in Supabase. Redirecting to static fallback.`);
		throw redirect(302, `/images/services/${filePath}`);
	}

	// If found in Supabase, return the public URL redirect
	const { data: finalUrl } = supabase.storage.from('media').getPublicUrl(filePath);
	throw redirect(302, finalUrl.publicUrl);
};
