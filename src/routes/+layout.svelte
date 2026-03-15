<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { lenis } from '$lib/lenis';
	import { lang } from '$lib/lang';
	import './layout.css';

	let { children } = $props();

	onMount(() => {
		const unsub = lenis.subscribe();
		return () => {
			unsub();
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<title>PT. Batuah Mandiri Persada | Persada Engineering</title>
</svelte:head>

<div class="flex min-h-screen flex-col font-sans bg-industrial-black text-white">
	<!-- Navbar: Changed to Light Background for better logo visibility -->
	<header class="fixed top-0 left-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur-md">
		<div class="container mx-auto flex h-20 items-center justify-between px-4">
			<a href="/" class="flex items-center gap-3">
				<img src="/images/logo.png" alt="PT. Batuah Mandiri Persada" class="h-10 w-auto" />
				<div class="hidden flex-col md:flex">
					<span class="text-[10px] font-black uppercase tracking-widest text-black leading-none">Batuah Mandiri</span>
					<span class="text-[7px] font-bold uppercase tracking-[0.3em] text-industrial-yellow mt-1">Persada</span>
				</div>
			</a>

			<nav class="hidden items-center gap-12 lg:flex">
				<a href="/" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'Home' : 'Beranda'}</a>
				<a href="/about" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'About' : 'Tentang'}</a>
				<a href="/services" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'Services' : 'Layanan'}</a>
				<a href="/contact" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'Contact' : 'Kontak'}</a>
			</nav>

			<div class="flex items-center gap-6">
				<!-- Language Toggle: Standardized with Shadcn -->
				<Button 
					variant="outline" 
					size="sm"
					onclick={() => lang.toggle()}
					class="rounded-none border-black/10 text-[10px] font-black uppercase tracking-widest text-black hover:bg-black/5"
				>
					<span class={$lang === 'en' ? 'text-industrial-orange' : 'opacity-40'}>EN</span>
					<span class="opacity-20">|</span>
					<span class={$lang === 'id' ? 'text-industrial-orange' : 'opacity-40'}>ID</span>
				</Button>

				<Button 
					href="/contact" 
					class="hidden rounded-none border-none bg-industrial-yellow px-8 h-12 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-industrial-yellow transition-all md:flex items-center justify-center"
				>
					{$lang === 'en' ? 'Inquiry' : 'Konsultasi'}
				</Button>
			</div>
		</div>
	</header>

	<main class="flex-1 pt-20">
		{@render children()}
	</main>

	<footer class="border-t border-white/5 bg-industrial-black py-20">
		<div class="container mx-auto px-4">
			<div class="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
				<div class="space-y-6">
					<!-- Footer Logo: Removed extreme filters to avoid 'blunt' appearance, used logo_bg for better visibility on dark -->
					<img src="/images/logo_bg.png" alt="Footer Logo" class="h-16 w-auto object-contain brightness-110" />
					<p class="text-[10px] font-medium leading-relaxed uppercase tracking-widest text-white/40">
						{$lang === 'en' ? 'Professional heavy equipment rental and engineering service provider.' : 'Penyedia layanan penyewaan alat berat dan teknik profesional.'}
					</p>
				</div>
				<div>
					<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">{$lang === 'en' ? 'Navigation' : 'Navigasi'}</h4>
					<nav class="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
						<a href="/" class="hover:text-industrial-yellow">Home</a>
						<a href="/about" class="hover:text-industrial-yellow">{ $lang === 'en' ? 'About' : 'Tentang' }</a>
						<a href="/services" class="hover:text-industrial-yellow">{ $lang === 'en' ? 'Services' : 'Layanan' }</a>
						<a href="/contact" class="hover:text-industrial-yellow">{ $lang === 'en' ? 'Contact' : 'Kontak' }</a>
					</nav>
				</div>
				<div>
					<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">{$lang === 'en' ? 'Headquarters' : 'Kantor Pusat'}</h4>
					<p class="text-[10px] font-bold uppercase tracking-widest leading-loose text-white/40">
						Jl. Yos Sudarso IV No. 97<br />
						Sangatta Utara, Kutai Timur<br />
						Kalimantan Timur, Indonesia
					</p>
				</div>
				<div>
					<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Contact</h4>
					<p class="text-[10px] font-bold uppercase tracking-widest leading-loose text-white/40">
						+62 858-4502-0384<br />
						batuahmandiripersada@gmail.com
					</p>
				</div>
			</div>
			<div class="mt-20 flex flex-col items-center justify-between border-t border-white/5 pt-10 md:flex-row">
				<p class="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">
					&copy; {new Date().getFullYear()} PT. Batuah Mandiri Persada. Industrial Sync System.
				</p>
				<p class="mt-4 text-[8px] font-bold uppercase tracking-[0.3em] text-white/20 md:mt-0">
					Director: Ivanto Saputra
				</p>
			</div>
		</div>
	</footer>
</div>
