import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: services, error: servicesError } = await supabase
		.from('services')
		.select('*')
		.order('created_at', { ascending: true });

	if (servicesError) {
		throw error(500, 'Error loading services');
	}

	return {
		services
	};
};

export const actions: Actions = {
	seed: async ({ locals: { supabase } }) => {
		const { data: existing } = await supabase.from('services').select('id').limit(1);
		
		if (existing && existing.length > 0) {
			return { success: true, message: 'Already seeded' };
		}

		const templateServices = [
			{
				title_id: 'Penyewaan Excavator Berbagai Tipe dan Kapasitas',
				title_en: 'Excavator Rentals of Various Types and Capacities',
				description_id: 'Menyediakan excavator untuk berbagai kebutuhan proyek.',
				description_en: 'Providing excavators for various project needs.',
				image_url: 'excavator_rental_industrial_1773593524838.png'
			},
			{
				title_id: 'Penyewaan Bulldozer',
				title_en: 'Bulldozer Rentals',
				description_id: 'Alat berat untuk pendorongan material.',
				description_en: 'Heavy equipment for material pushing.',
				image_url: 'bulldozer_rental_industrial_1773593545398.png'
			},
			{
				title_id: 'Penyewaan Wheel Loader',
				title_en: 'Wheel Loader Rentals',
				description_id: 'Alat berat untuk pemuatan material.',
				description_en: 'Heavy equipment for material loading.',
				image_url: 'wheel_loader_industrial_1773593565592.png'
			},
			{
				title_id: 'Penyewaan Vibro Roaler',
				title_en: 'Vibro Roller Rentals',
				description_id: 'Alat berat untuk pemadatan tanah.',
				description_en: 'Heavy equipment for soil compaction.',
				image_url: 'vibro_roller_industrial_1773593581498.png'
			},
			{
				title_id: 'Penyewaan Dump Truck',
				title_en: 'Dump Truck Rentals',
				description_id: 'Kendaraan pengangkut material berat.',
				description_en: 'Heavy material transport vehicles.',
				image_url: 'dump_truck_industrial_1773593599542.png'
			},
			{
				title_id: 'Layanan Mobilisasi dan Demobilisasi Alat Berat',
				title_en: 'Heavy Equipment Mobilization and Demobilization Services',
				description_id: 'Layanan transportasi antar jemput alat berat.',
				description_en: 'Heavy equipment transport and delivery services.',
				image_url: 'heavy_mobilization_industrial_1773593614498.png'
			}
		];

		const { error: seedError } = await supabase.from('services').insert(templateServices);

		if (seedError) {
			return fail(500, { message: 'Failed to seed services' });
		}

		return { success: true };
	},

	upsert: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const title_id = formData.get('title_id');
		const title_en = formData.get('title_en');
		const description_id = formData.get('description_id');
		const description_en = formData.get('description_en');
		
		const service_image = formData.get('service_image') as File;
		const existing_image_url = formData.get('existing_image_url') as string;
		
		const delete_image = formData.get('delete_image') === 'true';
		
		let image_url: string | null = existing_image_url;

		if (delete_image) {
			image_url = null;
			if (existing_image_url && existing_image_url.includes('/media/')) {
				try {
					const urlParts = existing_image_url.split('/media/');
					const rawPath = urlParts[urlParts.length - 1].split('?')[0];
					const oldPath = decodeURIComponent(rawPath);
					await supabase.storage.from('media').remove([oldPath]);
				} catch {
					// Silently ignore cleanup errors if file is already missing
				}
			}
		} else if (service_image && service_image.size > 0) {
			const fileName = `services/${Date.now()}-${service_image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
			const { error: uploadError } = await supabase.storage
				.from('media')
				.upload(fileName, service_image);

			if (uploadError) {
				return fail(500, { message: 'Upload failed: ' + uploadError.message });
			}

			const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
			image_url = publicUrl;

			// Delete old image if it exists and is a Supabase URL
			if (existing_image_url && existing_image_url.includes('/media/')) {
				try {
					const urlParts = existing_image_url.split('/media/');
					const rawPath = urlParts[urlParts.length - 1].split('?')[0];
					const oldPath = decodeURIComponent(rawPath);
					
					const { error: deleteError } = await supabase.storage.from('media').remove([oldPath]);
					if (deleteError) {
						return { success: false, message: 'Saved, but failed to clean up old image: ' + deleteError.message };
					}
				} catch (e: any) {
					return { success: false, message: 'System error during old image cleanup: ' + (e.message || 'Unknown error') };
				}
			}
		}

		const data = {
			title_id,
			title_en,
			description_id,
			description_en,
			image_url
		};

		if (id) {
			const { error: upsertError } = await supabase
				.from('services')
				.update(data)
				.eq('id', id);
			
			if (upsertError) return fail(500, { message: 'Update failed' });
		} else {
			const { error: upsertError } = await supabase
				.from('services')
				.insert(data);
			
			if (upsertError) return fail(500, { message: 'Insert failed' });
		}

		return { success: true };
	},

	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		// Get the service to find the image URL
		const { data: service } = await supabase.from('services').select('image_url').eq('id', id).single();

		const { error: deleteError } = await supabase
			.from('services')
			.delete()
			.eq('id', id);

		if (deleteError) return fail(500, { message: 'Delete failed' });

		// Clean up storage
		if (service?.image_url && service.image_url.includes('/media/')) {
			try {
				const urlParts = service.image_url.split('/media/');
				const rawPath = urlParts[urlParts.length - 1].split('?')[0];
				const path = decodeURIComponent(rawPath);
				
				const { error: storageError } = await supabase.storage.from('media').remove([path]);
				if (storageError) {
					return { success: false, message: 'Record deleted, but failed to delete image file: ' + storageError.message };
				}
			} catch (e: any) {
				return { success: false, message: 'Record deleted, but system error during image cleanup: ' + (e.message || 'Unknown error') };
			}
		}

		return { success: true };
	}
};
