import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs/promises';
import path from 'path';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const filePath = params.path;
	if (!filePath) throw error(400, 'Path is required');

	// 1. Try to serve from static/images/services/ if it's a template image
	const localPath = path.join(process.cwd(), 'static/images/services', filePath);
	try {
		const fileBuffer = await fs.readFile(localPath);
		return new Response(fileBuffer, {
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	} catch (e) {
		// Not a local file, continue to Supabase
	}

	// 2. Try to download from Supabase 'media' bucket
	const { data, error: storageError } = await supabase.storage.from('media').download(filePath);

	if (storageError) {
		console.error('Storage error:', storageError);
		throw error(404, 'Image not found in local storage or Supabase');
	}

	return new Response(data, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
