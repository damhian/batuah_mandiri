<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { lenis } from '$lib/lenis';
	import { lang } from '$lib/lang';
	import { page } from '$app/stores';
	import './layout.css';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	// Close mobile menu on navigation
	$effect(() => {
		// Subscribe to page changes
		$page.url.pathname;
		mobileMenuOpen = false;
	});

	// Lock body scroll when menu is open
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
		}
	});

	onMount(() => {
		let cleanup: (() => void) | undefined;
		
		lenis.subscribe().then((unsub) => {
			cleanup = unsub;
		});

		return () => {
			cleanup?.();
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<title>PT. Batuah Mandiri Persada | Persada Engineering</title>
</svelte:head>

<div class="flex min-h-screen flex-col font-sans bg-industrial-black text-white">
	<!-- Navbar -->
	<header class="fixed top-0 left-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur-md">
		<div class="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
			<a href="/" class="flex items-center gap-3">
				<img src="/images/logo.png" alt="PT. Batuah Mandiri Persada" class="h-8 w-auto lg:h-10" />
				<div class="hidden flex-col sm:flex">
					<span class="text-[10px] font-black uppercase tracking-widest text-black leading-none">Batuah Mandiri</span>
					<span class="text-[7px] font-bold uppercase tracking-[0.3em] text-industrial-yellow mt-1">Persada</span>
				</div>
			</a>

			<!-- Desktop Nav -->
			<nav class="hidden items-center gap-12 lg:flex">
				<a href="/" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'Home' : 'Beranda'}</a>
				<a href="/about" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'About' : 'Tentang'}</a>
				<a href="/services" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'Services' : 'Layanan'}</a>
				<a href="/contact" class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 hover:text-industrial-yellow transition-colors">{$lang === 'en' ? 'Contact' : 'Kontak'}</a>
			</nav>

			<div class="flex items-center gap-4">
				<!-- Language Toggle -->
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

				<!-- Desktop CTA -->
				<Button 
					href="/contact" 
					class="hidden rounded-none border-none bg-industrial-yellow px-8 h-12 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-industrial-yellow transition-all lg:flex items-center justify-center"
				>
					{$lang === 'en' ? 'Inquiry' : 'Konsultasi'}
				</Button>

				<!-- Hamburger Button -->
				<button
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					class="flex flex-col items-center justify-center w-10 h-10 gap-1.5 lg:hidden"
					aria-label="Toggle menu"
					aria-expanded={mobileMenuOpen}
				>
					<span class="block w-6 h-0.5 bg-black transition-all duration-300 origin-center {mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}"></span>
					<span class="block w-6 h-0.5 bg-black transition-all duration-300 {mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}"></span>
					<span class="block w-6 h-0.5 bg-black transition-all duration-300 origin-center {mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
				</button>
			</div>
		</div>
	</header>

	<!-- Mobile Menu Overlay -->
	{#if mobileMenuOpen}
		<div class="fixed inset-0 z-40 lg:hidden">
			<!-- Backdrop -->
			<button 
				class="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onclick={() => mobileMenuOpen = false}
				aria-label="Close menu"
			></button>

			<!-- Panel -->
			<nav class="absolute top-16 right-0 w-full max-w-sm h-[calc(100dvh-4rem)] bg-industrial-black border-l border-white/10 flex flex-col p-8 overflow-y-auto animate-slide-in">
				<div class="flex flex-col gap-1">
					<a href="/" class="block py-4 text-sm font-black uppercase tracking-[0.3em] text-white/80 hover:text-industrial-yellow border-b border-white/5 transition-colors">
						{$lang === 'en' ? 'Home' : 'Beranda'}
					</a>
					<a href="/about" class="block py-4 text-sm font-black uppercase tracking-[0.3em] text-white/80 hover:text-industrial-yellow border-b border-white/5 transition-colors">
						{$lang === 'en' ? 'About' : 'Tentang'}
					</a>
					<a href="/services" class="block py-4 text-sm font-black uppercase tracking-[0.3em] text-white/80 hover:text-industrial-yellow border-b border-white/5 transition-colors">
						{$lang === 'en' ? 'Services' : 'Layanan'}
					</a>
					<a href="/contact" class="block py-4 text-sm font-black uppercase tracking-[0.3em] text-white/80 hover:text-industrial-yellow border-b border-white/5 transition-colors">
						{$lang === 'en' ? 'Contact' : 'Kontak'}
					</a>
				</div>

				<div class="mt-auto pt-8">
					<Button 
						href="/contact"
						class="w-full rounded-none bg-industrial-yellow h-14 text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-white transition-all"
					>
						{$lang === 'en' ? 'Start Inquiry' : 'Konsultasi Proyek'}
					</Button>
				</div>
			</nav>
		</div>
	{/if}

	<main class="flex-1 pt-16 lg:pt-20">
		{@render children()}
	</main>

	<footer class="border-t border-white/5 bg-industrial-black py-12 lg:py-20">
		<div class="container mx-auto px-6">
			<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
				<div class="space-y-6">
					<img src="/images/logo_bg.png" alt="Footer Logo" class="h-12 lg:h-16 w-auto object-contain brightness-110" />
					<p class="text-[10px] font-medium leading-relaxed uppercase tracking-widest text-white/40">
						{$lang === 'en' ? 'Professional heavy equipment rental and engineering service provider.' : 'Penyedia layanan penyewaan alat berat dan teknik profesional.'}
					</p>
				</div>
				<div>
					<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6 lg:mb-8">{$lang === 'en' ? 'Navigation' : 'Navigasi'}</h4>
					<nav class="flex flex-col gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
						<a href="/" class="hover:text-industrial-yellow">Home</a>
						<a href="/about" class="hover:text-industrial-yellow">{ $lang === 'en' ? 'About' : 'Tentang' }</a>
						<a href="/services" class="hover:text-industrial-yellow">{ $lang === 'en' ? 'Services' : 'Layanan' }</a>
						<a href="/contact" class="hover:text-industrial-yellow">{ $lang === 'en' ? 'Contact' : 'Kontak' }</a>
					</nav>
				</div>
				<div>
					<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6 lg:mb-8">{$lang === 'en' ? 'Headquarters' : 'Kantor Pusat'}</h4>
					<p class="text-[10px] font-bold uppercase tracking-widest leading-loose text-white/40">
						Jl. Sangga Buana II Selatan No. 01<br />
						Jekan Raya, Palangka Raya<br />
						Kalimantan Tengah, Indonesia 74874
					</p>
				</div>
				<div>
					<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-6 lg:mb-8">Contact</h4>
					<p class="text-[10px] font-bold uppercase tracking-widest leading-loose text-white/40 break-all sm:break-normal">
						+62 858-4502-0384<br />
						batuahmandiripersada@gmail.com
					</p>
				</div>
			</div>
			<div class="mt-12 lg:mt-20 flex flex-col items-center justify-between border-t border-white/5 pt-8 lg:pt-10 md:flex-row gap-4">
				<p class="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">
					&copy; {new Date().getFullYear()} PT. Batuah Mandiri Persada. Industrial Sync System.
				</p>
				<p class="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">
					Director: Ivanto Saputra
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	@keyframes slide-in {
		from { transform: translateX(100%); opacity: 0; }
		to { transform: translateX(0); opacity: 1; }
	}
	.animate-slide-in {
		animation: slide-in 0.3s ease-out forwards;
	}
</style>
