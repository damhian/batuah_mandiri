<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { Menu, X } from '@lucide/svelte';
	let { children } = $props();
	let sidebarOpen = $state(false);

	// Close sidebar on navigation
	$effect(() => {
		if ($page.url.pathname) {
			sidebarOpen = false;
		}
	});

	const navItems = [
		{ href: '/admin/dashboard', label: 'Overview' },
		{ href: '/admin/dashboard/profile', label: 'Company Profile' },
		{ href: '/admin/dashboard/team', label: 'Team Members' },
		{ href: '/admin/dashboard/services', label: 'Layanan / Services' },
		{ href: '/admin/dashboard/testimonials', label: 'Testimonials' },
	];
</script>

<div class="flex min-h-screen bg-industrial-black text-white">
	<!-- Mobile Top Bar -->
	<div class="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-industrial-black border-b border-white/5 lg:hidden">
		<div class="flex items-center gap-3">
			<div class="h-6 w-6 bg-industrial-yellow"></div>
			<span class="font-black uppercase tracking-widest text-xs">BMP Ops</span>
		</div>
		<button onclick={() => sidebarOpen = !sidebarOpen} class="text-white/60 active:text-white p-2" aria-label="Toggle sidebar">
			{#if sidebarOpen}
				<X size={22} />
			{:else}
				<Menu size={22} />
			{/if}
		</button>
	</div>

	<!-- Mobile Sidebar Overlay -->
	{#if sidebarOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onclick={() => sidebarOpen = false}></div>
	{/if}

	<!-- Sidebar -->
	<aside class="
		fixed top-14 left-0 z-30 h-[calc(100dvh-3.5rem)] w-64 border-r border-white/5 bg-[#0a0a0a] p-8 flex flex-col overflow-y-auto
		transition-transform duration-300 ease-out
		{sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
		lg:static lg:translate-x-0 lg:top-0 lg:h-auto lg:min-h-screen lg:z-auto
	">
		<div class="hidden lg:flex items-center gap-4 mb-20">
			<div class="h-8 w-8 bg-industrial-yellow"></div>
			<span class="font-black uppercase tracking-widest text-sm">BMP Ops Panel</span>
		</div>

		<nav class="space-y-6">
			{#each navItems as item}
				<a href={item.href} class="group block cursor-pointer">
					<span class="text-[10px] font-bold uppercase tracking-[.4em] transition-colors {$page.url.pathname === item.href ? 'text-industrial-yellow' : 'text-white/40 group-hover:text-industrial-yellow'}">{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="mt-auto pt-20">
			<form method="POST" action="/admin/dashboard?/logout">
				<Button type="submit" variant="ghost" class="text-[10px] font-bold uppercase tracking-[.4em] text-red-500 hover:text-white transition-all p-0 h-auto">
					Logout System
				</Button>
			</form>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 p-6 pt-20 lg:p-12 lg:pt-12 overflow-y-auto min-w-0">
		{@render children()}
	</main>
</div>
