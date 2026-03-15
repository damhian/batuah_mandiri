<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { ActionData } from './$types';
	
	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Admin Login | PT. Batuah Mandiri Persada</title>
</svelte:head>

<section class="flex min-h-screen items-center justify-center bg-industrial-black px-4">
	<div class="w-full max-w-md border border-white/5 bg-industrial-slate/5 p-12">
		<div class="mb-12 text-center">
			<div class="mx-auto h-12 w-12 bg-industrial-yellow"></div>
			<h1 class="mt-8 text-2xl font-black uppercase tracking-widest text-white">Engineering Access</h1>
			<p class="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">Secure Console Login</p>
		</div>

		<form method="POST" action="?/login" class="space-y-8">
			<div>
				<label for="email" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Email</label>
				<input 
					type="email" 
					id="email" 
					name="email" 
					required 
					class="mt-2 w-full border-b border-white/10 bg-transparent py-4 text-white outline-none focus:border-industrial-yellow transition-all" 
				/>
			</div>
			<div>
				<label for="password" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Password</label>
				<input 
					type="password" 
					id="password" 
					name="password" 
					required 
					class="mt-2 w-full border-b border-white/10 bg-transparent py-4 text-white outline-none focus:border-industrial-yellow transition-all" 
				/>
			</div>

			{#if form?.message}
				<p class="text-xs font-bold uppercase tracking-widest text-red-500">{form.message}</p>
			{/if}

			<Button 
				type="submit" 
				class="w-full bg-industrial-yellow h-20 text-sm font-black uppercase tracking-[0.2em] text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] rounded-none"
			>
				Login
			</Button>
		</form>
		
		<div class="mt-12 text-center">
			<a href="/" class="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Return to Surface Site</a>
		</div>
	</div>
</section>
