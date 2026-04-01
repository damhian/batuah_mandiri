<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { lang } from '$lib/lang';

	let { data } = $props();

	let container = $state<HTMLElement | null>(null);

	onMount(() => {
		let ctx: any;
		
		tick().then(() => {
			if (!container) return;
			
			ctx = gsap.context(() => {
				const cards = gsap.utils.toArray('.fleet-card');
				if (cards.length > 0) {
					gsap.from(cards, {
						opacity: 0,
						y: 40,
						duration: 1,
						stagger: {
							each: 0.1,
							from: "start"
						},
						ease: 'expo.out',
						clearProps: "all"
					});
				}
			}, container);
		});

		return () => {
			if (ctx) ctx.revert();
		};
	});
</script>

<svelte:head>
	<title>{$lang === 'en' ? 'Our Services & Fleet' : 'Layanan & Armada Kami'} | PT. Batuah Mandiri Persada</title>
</svelte:head>

<section class="bg-industrial-black pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-32 lg:pb-20">
	<div class="container mx-auto px-6">
		<h1 class="text-3xl font-black uppercase tracking-tighter sm:text-4xl md:text-7xl lg:text-8xl text-white">
			{$lang === 'en' ? 'Heavy' : 'Armada'} <span class="text-industrial-yellow">{$lang === 'en' ? 'Fleet' : 'Alat Berat'}</span><br />
			<span class="text-industrial-orange">{$lang === 'en' ? 'Industrial Scope.' : 'Skala Industri.'}</span>
		</h1>
		<p class="mt-4 text-xs text-white/40 uppercase tracking-[0.15em] sm:mt-8 sm:text-sm lg:text-lg sm:tracking-[0.3em]">
			{$lang === 'en' ? 'Precision Engineering / Unstoppable Force' : 'Teknik Presisi / Kekuatan Tak Terbendung'}
		</p>
	</div>
</section>

<section class="py-12 sm:py-16 lg:py-24 bg-industrial-black min-h-[400px] sm:min-h-[600px]" bind:this={container}>
	<div class="container mx-auto px-4 sm:px-6">
		{#if !data?.services || data.services.length === 0}
			<div class="py-40 text-center border border-dashed border-industrial-silver/10 rounded-none">
				<p class="text-industrial-silver/40 uppercase tracking-widest text-sm">
					{$lang === 'en' ? 'No cataloged services found.' : 'Data layanan belum tersedia.'}
				</p>
			</div>
		{:else}
			<div class="grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-2 border border-white/5">
				{#each data.services as item}
					<div class="fleet-card flex flex-col gap-6 sm:gap-8 lg:gap-12 bg-industrial-black p-6 sm:p-8 lg:p-12 transition-all hover:bg-industrial-slate/20 md:flex-row group border-white/5 overflow-hidden">
						<div class="aspect-video w-full overflow-hidden bg-industrial-slate md:aspect-square md:w-48 lg:w-64 border border-white/5">
							{#if item?.image_url}
								<img 
									src={item.image_url.startsWith('http') ? item.image_url : `/api/storage/${item.image_url}`} 
									alt={$lang === 'en' ? (item.title_en || 'Service') : (item.title_id || 'Layanan')} 
									class="h-full w-full object-cover grayscale brightness-75 transition-all group-hover:grayscale-0 group-hover:scale-110 duration-700" 
								/>
							{:else}
								<div class="w-full h-full flex items-center justify-center bg-industrial-slate opacity-20">
									<span class="text-[8px] font-bold uppercase tracking-widest text-white">No Imagery Available</span>
								</div>
							{/if}
						</div>
						<div class="flex-1 flex flex-col">
							<span class="text-[10px] font-bold uppercase tracking-[0.5em] text-industrial-yellow">
								{$lang === 'en' ? 'Industrial Rental' : 'Penyewaan Alat'}
							</span>
							<h3 class="mt-4 text-2xl font-black uppercase text-white tracking-tight leading-tight">
								{$lang === 'en' ? (item.title_en || 'Equipment Unit') : (item.title_id || 'Unit Armada')}
							</h3>
							
							<div class="mt-6 text-sm text-white/60 leading-relaxed max-w-sm flex-1">
								{$lang === 'en' ? (item.description_en || 'Heavy duty equipment support for mining operations.') : (item.description_id || 'Dukungan armada berat untuk operasional pertambangan.')}
							</div>
							
							<div class="mt-8 pt-6 border-t border-white/5">
								<Button
									variant="ghost"
									href="/contact?ref={$lang === 'en' ? (item.title_en || 'Quote') : (item.title_id || 'Penawaran')}"
									class="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-yellow pb-2 hover:text-industrial-gold transition-all h-auto p-0 rounded-none bg-transparent hover:bg-transparent"
								>
									{$lang === 'en' ? 'Inquire Unit' : 'Ajukan Penawaran'}
									<span class="ml-2">→</span>
								</Button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<section class="border-t border-white/5 bg-industrial-black py-16 sm:py-24 lg:py-32">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl md:text-5xl">
				{$lang === 'en' ? 'Reliability & Support' : 'Keandalan & Dukungan'}
			</h2>
			<p class="mt-6 text-sm text-white/60 leading-relaxed italic border-l-4 border-industrial-yellow pl-6 text-left sm:mt-8 sm:text-base lg:text-lg sm:pl-8">
				{$lang === 'en' 
					? "Our fleet is meticulously maintained to exceed international mining safety standards. We guarantee 99% uptime with on-site rapid response teams." 
					: "Armada kami dirawat dengan teliti untuk melampaui standar keamanan tambang internasional. Kami menjamin 99% uptime dengan tim respon cepat di lokasi."}
			</p>
			<div class="mt-8 flex flex-col items-center gap-8 text-industrial-gold sm:flex-row sm:justify-center sm:mt-12 sm:gap-16">
				<div class="flex flex-col items-center">
					<span class="block text-4xl font-black sm:text-5xl">99%</span>
					<span class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mt-2">
						{$lang === 'en' ? 'Uptime Standard' : 'Standar Uptime'}
					</span>
				</div>
				<div class="flex flex-col items-center">
					<span class="block text-4xl font-black sm:text-5xl">24/7</span>
					<span class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mt-2">
						{$lang === 'en' ? 'Technical Force' : 'Tim Teknis'}
					</span>
				</div>
			</div>
		</div>
	</div>
</section>
