<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { lang } from '$lib/lang';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	
	let contentSection: HTMLElement;
	let teamSection: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Use gsap.context for clean scoping and automatic cleanup
		let ctx = gsap.context(() => {
			// Industrial staggered reveal for Vision/Mission
			gsap.from('.reveal-item', {
				scrollTrigger: {
					trigger: contentSection,
					start: 'top 85%',
					toggleActions: 'play none none none'
				},
				y: 60,
				opacity: 0,
				duration: 1.5,
				stagger: 0.4,
				ease: 'power4.out'
			});

			// Robust reveal for Team Cards
			// We target the .team-card explicitly. If cards were "lost", 
			// it's likely due to ScrollTrigger timing or displacement.
			gsap.from('.team-card', {
				scrollTrigger: {
					trigger: teamSection,
					start: 'top 80%',
					toggleActions: 'play none none none'
				},
				y: 80,
				opacity: 0,
				duration: 1.5,
				stagger: 0.1,
				ease: 'power3.out',
				onComplete: () => {
					// Ensure they stay visible after animation
					gsap.set('.team-card', { opacity: 1, visibility: 'visible' });
				}
			});
		});

		// Refresh ScrollTrigger to ensure all triggers are correctly mapped after Svelte mount
		ScrollTrigger.refresh();

		return () => ctx.revert();
	});
</script>

<svelte:head>
	<title>{$lang === 'en' ? 'About Us' : 'Tentang Kami'} | PT. Batuah Mandiri Persada</title>
</svelte:head>

<section class="bg-industrial-black pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
	<div class="container mx-auto px-6">
		<div class="max-w-4xl">
			<h1 class="text-3xl font-black uppercase tracking-tighter sm:text-4xl md:text-7xl lg:text-8xl text-white">
				{#if $lang === 'en'}
					Built On <span class="text-industrial-yellow">Steel</span>,<br />
					Driven By <span class="text-industrial-orange">Precision</span>.
				{:else}
					Dibangun Di Atas <span class="text-industrial-yellow">Baja</span>,<br />
					Digerakkan Oleh <span class="text-industrial-orange">Presisi</span>.
				{/if}
			</h1>
			<p class="mt-8 text-base text-white/60 leading-relaxed sm:text-lg md:text-xl lg:text-2xl font-medium whitespace-pre-line">
				{$lang === 'en' ? data.profile?.about_us_body : data.profile?.about_us_body_id}
			</p>
		</div>
	</div>
</section>

<section bind:this={contentSection} class="border-y border-white/5 bg-industrial-slate/5 py-16 sm:py-24 lg:py-32">
	<div class="container mx-auto px-6">
		<div class="grid gap-20 lg:grid-cols-2">
			<div class="reveal-item">
				<h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-industrial-yellow mb-8">{$lang === 'en' ? 'Our Vision' : 'Visi Kami'}</h2>
				<p class="text-xl font-bold text-white leading-relaxed sm:text-2xl md:text-3xl uppercase tracking-tight whitespace-pre-line">
					{$lang === 'en' ? data.profile?.vision_statement : data.profile?.vision_statement_id}
				</p>
			</div>
			<div class="reveal-item">
				<h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-industrial-orange mb-8">{$lang === 'en' ? 'Our Mission' : 'Misi Kami'}</h2>
				<p class="text-xl font-bold text-white leading-relaxed sm:text-2xl md:text-3xl uppercase tracking-tight whitespace-pre-line">
					{$lang === 'en' ? data.profile?.mission_statement : data.profile?.mission_statement_id}
				</p>
			</div>
		</div>
	</div>
</section>

<section bind:this={teamSection} class="py-16 sm:py-24 lg:py-32">
	<div class="container mx-auto px-6">
		<div class="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
			<div>
				<h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-industrial-yellow mb-4">{$lang === 'en' ? 'Leadership' : 'Kepemimpinan'}</h2>
				<h3 class="text-2xl font-black uppercase text-white sm:text-3xl md:text-5xl">{ $lang === 'en' ? 'The Engineering Mindset' : 'Berpikir Teknis'}</h3>
			</div>
			<div class="text-left md:text-right">
				<span class="text-[10px] font-bold uppercase tracking-widest text-white/20">{$lang === 'en' ? 'Scroll to explore the team' : 'Gulir untuk melihat anggota tim'}</span>
			</div>
		</div>

		<!-- Team Grid: Responsive grid for all members -->
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each data.team as member}
				<div class="team-card group relative bg-industrial-slate/5 border border-white/5 p-8 transition-all hover:bg-white/5 hover:border-industrial-yellow">
					<div class="aspect-square w-full overflow-hidden bg-industrial-slate/20 grayscale group-hover:grayscale-0 transition-all duration-700">
						{#if member.profile_image_url}
							<img src={member.profile_image_url} alt={member.name} class="h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
						{:else}
							<div class="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-industrial-slate/10">
								<svg class="h-16 w-16 mb-4 text-white/10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
								<span class="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{member.name}</span>
							</div>
						{/if}
					</div>
					<div class="mt-8">
						<h4 class="text-xl font-black text-white uppercase tracking-tighter">{member.name}</h4>
						<p class="mt-2 text-[10px] font-black uppercase tracking-widest text-industrial-yellow">
							{member.role_title}
						</p>
						<div class="mt-6 border-t border-white/5 pt-6">
							<p class="text-[11px] font-bold uppercase tracking-widest text-white/40 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all whitespace-pre-line">
								{$lang === 'en' ? member.bio : (member.bio_id || member.bio)}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
