<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { lang } from '$lib/lang';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let heroTitle: HTMLElement;
	let statsSection: HTMLElement;
	
	onMount(async () => {
		const {gsap} = await import ('gsap')
		const {ScrollTrigger} = await import ('gsap/ScrollTrigger');
		
		gsap.registerPlugin(ScrollTrigger);

		// GSAP Reveal for Hero
		gsap.from(heroTitle, {
			y: 100,
			opacity: 0,
			duration: 1.5,
			ease: 'power4.out',
			delay: 0.5
		});

		// GSAP for Stats
		gsap.from('.stat-item', {
			scrollTrigger: {
				trigger: statsSection,
				start: 'top 80%'
			},
			y: 50,
			opacity: 0,
			duration: 1,
			stagger: 0.2,
			ease: 'power3.out'
		});
	});
</script>

<div class="relative min-h-screen overflow-hidden -mt-16 lg:-mt-20">
	<!-- Background Video -->
	<div class="absolute inset-0 z-0 overflow-hidden bg-industrial-black pointer-events-none">
		{#if data.profile?.hero_video_youtube_url}
			{@const url = data.profile.hero_video_youtube_url}
			{#if url.includes('youtube.com') || url.includes('youtu.be')}
				<!-- YouTube Player with 1.4x scaling to crop UI -->
				{@const rawId = url.includes('v=') ? url.split('v=')[1]?.split('&')[0] : url.split('/').pop()}
				{@const videoId = rawId ? rawId.split('?')[0] : ''}
				<div class="absolute w-[150vw] h-[150vh] inset-0 flex items-center justify-center pointer-events-none overflow-hidden scale-[1.4]">
					<iframe
						src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&mute=1&loop=1&playlist={videoId}&start=25&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&origin={typeof window !== 'undefined' ? window.location.origin : ''}"
						title="Background Video"
						class="w-[120vw] h-[120vh] min-w-[177.77vh] min-h-screen object-cover border-none"
						allow="autoplay; encrypted-media; fullscreen"
					></iframe>
				</div>
			{:else if url.includes('jumpshare.com')}
				<!-- Jumpshare Player: Adjusted to fill screen as much as possible -->
				<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
					<iframe 
						src={url.includes('/embed/') ? url : url.replace('/v/', '/embed/')}
						frameborder="0" 
						allowfullscreen 
						class="w-full h-full min-w-[177.77vh] min-h-screen scale-[1.1] border-none"
						title="Background Video (Jumpshare)"
					></iframe>
				</div>
			{:else if url.includes('drive.google.com')}
				<!-- Google Drive Player: Using /preview for bypass of virus scan warnings on large files -->
				{@const driveId = url.split('/d/')[1]?.split('/')[0]}
				<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
					<iframe 
						src="https://drive.google.com/file/d/{driveId}/preview"
						frameborder="0" 
						class="w-full h-full min-w-[177.77vh] min-h-screen scale-[1.2] border-none"
						title="Background Video (Google Drive)"
						allow="autoplay"
					></iframe>
				</div>
			{:else}
				<!-- Native Video Player (Supabase / Imgur / Local) -->
				<video
					src="{url}#t=25"
					autoplay
					loop
					muted
					playsinline
					class="absolute inset-0 w-full h-full object-cover pointer-events-none"
				></video>
			{/if}
		{:else}
			<div class="h-full w-full bg-industrial-slate opacity-50"></div>
		{/if}
		
		<!-- Adjusted overlay: Slightly more transparent to reveal machinery, but kept semi-dark for readability -->
		 <div class="absolute inset-0 bg-linear-to-b from-industrial-black/30 via-transparent to-industrial-black/90 z-10"></div>
	</div>

	<!-- Hero Content -->
	<section class="relative z-10 flex min-h-screen items-center justify-center px-4">
		<div class="text-center">
			<h1 
				bind:this={heroTitle}
				class="text-3xl font-black uppercase tracking-tighter sm:text-4xl md:text-7xl lg:text-9xl text-white"
			>
				{#if $lang === 'en'}
					Powering <span class="text-industrial-yellow">Industry</span><br />
					Moving <span class="text-industrial-orange">Ground</span>
				{:else}
					Kekuatan <span class="text-industrial-yellow">Industri</span><br />
					Energi <span class="text-industrial-orange">Bumi</span>
				{/if}
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-sm text-white/60 sm:text-base md:text-xl tracking-wide uppercase px-2">
				{#if $lang === 'id'}
					Solusi alat berat dan pertambangan terkemuka di jantung PT. Batuah Mandiri Persada.
				{:else}
					Leading heavy machinery and mining solutions at the heart of PT. Batuah Mandiri Persada.
				{/if}
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 px-4 sm:mt-12 sm:gap-6 md:flex-row">
				<Button 
					href="/contact" 
					class="w-full rounded-none bg-industrial-yellow h-12 sm:h-14 lg:h-16 text-[10px] font-black uppercase tracking-widest text-black hover:bg-white transition-all md:w-auto px-8 lg:px-12"
				>
					{$lang === 'en' ? 'Start Inquiry' : 'Konsultasi Proyek'}
				</Button>
				<Button 
					href="/services" 
					variant="outline"
					class="w-full rounded-none border-white/20 h-12 sm:h-14 lg:h-16 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:bg-white/10 hover:text-white transition-all md:w-auto px-8 lg:px-12"
				>
					{$lang === 'en' ? 'Our Services' : 'Layanan Kami'}
				</Button>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section 
		bind:this={statsSection}
		class="relative z-10 border-y border-white/5 bg-industrial-black py-12 sm:py-16 lg:py-24"
	>
		<div class="container mx-auto px-6">
			<div class="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4 lg:gap-16">
				<div class="stat-item">
					<span class="text-[10px] font-bold uppercase tracking-[0.3em] text-industrial-yellow">{$lang === 'en' ? 'Experience' : 'Pengalaman'}</span>
					<div class="mt-4 flex items-baseline gap-2">
						<span class="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{data.profile?.years_of_experience || 0}</span>
						<span class="text-xl font-bold uppercase text-white/40">{$lang === 'en' ? 'Years' : 'Tahun'}</span>
					</div>
				</div>
				<div class="stat-item">
					<span class="text-[10px] font-bold uppercase tracking-[0.3em] text-industrial-orange">{$lang === 'en' ? 'Projects' : 'Proyek'}</span>
					<div class="mt-4 flex items-baseline gap-2">
						<span class="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{data.profile?.active_projects_count || 0}</span>
						<span class="text-xl font-bold uppercase text-white/40">Sets</span>
					</div>
				</div>
				<div class="stat-item">
					<span class="text-[10px] font-bold uppercase tracking-[0.3em] text-industrial-yellow">{$lang === 'en' ? 'Reliability' : 'Keandalan'}</span>
					<div class="mt-4 flex items-baseline gap-2">
						<span class="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">24/7</span>
					</div>
				</div>
				<div class="stat-item">
					<span class="text-[10px] font-bold uppercase tracking-[0.3em] text-industrial-orange">{$lang === 'en' ? 'Safety' : 'Keamanan'}</span>
					<div class="mt-4 flex items-baseline gap-2">
						<span class="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">100%</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Vision/Mission Section -->
	<section class="relative z-10 py-16 sm:py-24 lg:py-32 bg-industrial-black">
		<div class="container mx-auto px-6">
			<div class="flex flex-col items-start gap-12 lg:gap-16 lg:flex-row">
				<div class="flex-1">
					<h2 class="text-2xl font-black uppercase tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl text-white">
						{$lang === 'en' ? 'Our' : 'Komitmen'} <span class="text-industrial-yellow">{$lang === 'en' ? 'Commitment' : 'Terhadap'}</span> {$lang === 'en' ? 'To Excellence' : 'Keunggulan'}
					</h2>
					<p class="mt-6 text-base text-white/60 leading-relaxed max-w-2xl font-medium sm:mt-8 sm:text-lg lg:text-xl">
						{$lang === 'en' ? data.profile?.about_us_body : data.profile?.about_us_body_id}
					</p>
					<a href="/about" class="mt-12 inline-block border-b-2 border-industrial-yellow pb-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-industrial-yellow transition-colors">
						{$lang === 'en' ? 'Learn More About Us' : 'Tentang Kami'}
					</a>
				</div>
				<div class="grid flex-1 gap-6 sm:grid-cols-2 sm:gap-8 w-full">
					<div class="border border-white/5 bg-industrial-slate/5 p-6 sm:p-8 lg:p-10 hover:border-industrial-yellow transition-all">
						<h3 class="text-sm font-black uppercase tracking-widest text-industrial-yellow">Vision</h3>
						<p class="mt-4 text-[11px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">
							{$lang === 'en' ? data.profile?.vision_statement : data.profile?.vision_statement_id}
						</p>
					</div>
					<div class="border border-white/5 bg-industrial-slate/5 p-6 sm:p-8 lg:p-10 hover:border-industrial-orange transition-all">
						<h3 class="text-sm font-black uppercase tracking-widest text-industrial-orange">Mission</h3>
						<p class="mt-4 text-[11px] font-bold uppercase tracking-widest text-white/40 leading-relaxed">
							{$lang === 'en' ? data.profile?.mission_statement : data.profile?.mission_statement_id}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials -->
	<section class="relative z-10 border-t border-white/5 bg-industrial-slate/5 py-16 sm:py-24 lg:py-32 overflow-hidden">
		<div class="container mx-auto px-6">
			<div class="flex items-center justify-between mb-12 lg:mb-20">
				<h2 class="text-lg font-black uppercase tracking-[0.15em] text-white sm:text-xl lg:text-2xl lg:tracking-[0.2em]">{$lang === 'en' ? 'Proof of Work' : 'Bukti Kerja'}</h2>
				<span class="h-px flex-1 mx-4 sm:mx-8 bg-white/5"></span>
			</div>
			
			<div class="flex gap-4 sm:gap-8 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6">
				{#each data.testimonials as testimonial}
					{#if testimonial.is_published}
						<div class="min-w-[280px] sm:min-w-[350px] lg:min-w-[400px] border border-white/5 bg-industrial-black p-6 sm:p-8 lg:p-12 transition-all hover:bg-industrial-slate/20">
							<div class="flex items-center gap-6">
								<div class="h-16 w-16 overflow-hidden bg-industrial-slate">
									{#if testimonial.client_photo_url}
										<img src={testimonial.client_photo_url} alt={testimonial.client_name} class="h-full w-full object-cover" />
									{:else}
										<div class="flex h-full w-full items-center justify-center text-white/10">
											<svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
										</div>
									{/if}
								</div>
								<div>
									<h4 class="text-sm font-black uppercase text-white">{testimonial.client_name}</h4>
									<p class="text-[10px] font-bold uppercase tracking-widest text-industrial-yellow">{testimonial.client_company}</p>
								</div>
							</div>
							<p class="mt-8 text-lg italic text-white/60 leading-relaxed">
								"{testimonial.quote_text}"
							</p>
						</div>
					{/if}
				{:else}
					<p class="text-white/20 italic">{$lang === 'en' ? 'No testimonials yet.' : 'Belum ada testimoni.'}</p>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
