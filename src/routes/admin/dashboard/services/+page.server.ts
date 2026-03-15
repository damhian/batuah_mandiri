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
		const id = formData.get('id');
		const title_id = formData.get('title_id');
		const title_en = formData.get('title_en');
		const description_id = formData.get('description_id');
		const description_en = formData.get('description_en');
		const image_url = formData.get('image_url');

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
		const id = formData.get('id');

		const { error: deleteError } = await supabase
			.from('services')
			.delete()
			.eq('id', id);

		if (deleteError) return fail(500, { message: 'Delete failed' });

		return { success: true };
	}
};
