<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	let { children } = $props();
</script>

<div class="flex min-h-screen bg-industrial-black text-white">
	<!-- Sidebar -->
	<aside class="w-64 border-r border-white/5 bg-industrial-slate/5 p-8 flex flex-col">
		<div class="flex items-center gap-4 mb-20">
			<div class="h-8 w-8 bg-industrial-yellow"></div>
			<span class="font-black uppercase tracking-widest text-sm">BMP Ops Panel</span>
		</div>

		<nav class="space-y-6">
			<a href="/admin/dashboard" class="group block cursor-pointer">
				<span class="text-[10px] font-bold uppercase tracking-[.4em] text-white/40 group-hover:text-industrial-yellow">Overview</span>
			</a>
			<a href="/admin/dashboard/profile" class="group block cursor-pointer">
				<span class="text-[10px] font-bold uppercase tracking-[.4em] text-white/40 group-hover:text-industrial-yellow">Company Profile</span>
			</a>
			<a href="/admin/dashboard/team" class="group block cursor-pointer">
				<span class="text-[10px] font-bold uppercase tracking-[.4em] text-white/40 group-hover:text-industrial-yellow">Team Members</span>
			</a>
			<a href="/admin/dashboard/services" class="group block cursor-pointer">
				<span class="text-[10px] font-bold uppercase tracking-[.4em] text-white/40 group-hover:text-industrial-yellow">Layanan / Services</span>
			</a>
			<a href="/admin/dashboard/testimonials" class="group block cursor-pointer">
				<span class="text-[10px] font-bold uppercase tracking-[.4em] text-white/40 group-hover:text-industrial-yellow">Testimonials</span>
			</a>
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
	<main class="flex-1 p-12 overflow-y-auto">
		{@render children()}
	</main>
</div>
