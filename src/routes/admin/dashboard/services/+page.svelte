<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import AdminDialog from '$lib/components/admin/AdminDialog.svelte';
	import ImageControl from '$lib/components/admin/ImageControl.svelte';
	import type { ActionData, PageData } from './$types';
	
	let { data, form }: { data: PageData, form: ActionData } = $props();
	
	let currentService = $state<any>(null);
	let previewUrl = $state<string | null>(null);
	let isDialogOpen = $state(false);

	$effect(() => {
		if (!isDialogOpen) {
			currentService = null;
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			previewUrl = null;
		}
	});

	const openEditor = (service: any = null) => {
		currentService = service || { title_id: '', title_en: '', description_id: '', description_en: '', image_url: '' };
		isDialogOpen = true;
	};
</script>

<h1 class="text-4xl font-black uppercase tracking-tighter mb-12">Fleet <span class="text-industrial-yellow">Management</span></h1>

<div class="space-y-4 max-w-4xl">
		{#if data.services.length === 0}
			<div class="border border-dashed border-white/5 bg-industrial-slate/5 p-12 text-center">
				<p class="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">No items in the fleet catalog.</p>
				<form method="POST" action="?/seed" use:enhance class="mt-8">
					<Button type="submit" variant="outline" class="border-industrial-yellow/20 text-industrial-yellow hover:bg-industrial-yellow/10">
						Seed Template from PDF
					</Button>
				</form>
			</div>
		{/if}

		{#each data.services as service}
			<div class="flex items-start gap-6 border border-white/5 bg-industrial-slate/5 p-6 transition-all hover:bg-white/5">
				<div class="h-24 w-40 bg-industrial-slate overflow-hidden border border-white/5 shrink-0">
					{#if service.image_url}
						<img 
							src={service.image_url.startsWith('http') ? service.image_url : `/api/storage/${service.image_url}`} 
							alt={service.title_id} 
							class="h-full w-full object-cover grayscale brightness-75 transition-all hover:grayscale-0" 
						/>
					{/if}
				</div>
				<div class="flex-1">
					<h3 class="font-bold text-white uppercase text-sm">{service.title_id}</h3>
					<p class="text-[9px] font-bold uppercase tracking-widest text-industrial-yellow mt-1">{service.title_en}</p>
					<p class="text-[10px] text-white/40 mt-4 line-clamp-2 leading-relaxed">{service.description_id || 'No description provided.'}</p>
				</div>
				<div class="flex gap-4">
					<Button 
						variant="ghost" 
						size="sm" 
						onclick={() => openEditor({ ...service })} 
						class="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white"
					>
						Edit
					</Button>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={service.id} />
						<Button 
							type="submit" 
							variant="ghost" 
							size="sm" 
							class="text-[10px] font-bold uppercase tracking-widest text-red-500/40 hover:text-red-500"
						>
							Delete
						</Button>
					</form>
				</div>
			</div>
		{/each}
		
		<Button 
			variant="industrial-outline"
			onclick={() => openEditor()} 
			class="w-full border-dashed py-10 text-[10px] font-bold uppercase tracking-[0.4em] transition-all h-auto rounded-none mt-8"
		>
			Add New Equipment
		</Button>
</div>

<!-- Editor Dialog -->
<AdminDialog bind:open={isDialogOpen} title={currentService?.id ? "Edit Equipment" : "New Equipment"}>
	{#if currentService}
		<form method="POST" action="?/upsert" enctype="multipart/form-data" use:enhance={() => {
			return async ({ result, update }) => {
				await update();
				if (result.type === 'success' || result.type === 'redirect') {
					isDialogOpen = false;
				}
			};
		}} class="space-y-8">
			<input type="hidden" name="id" value={currentService.id || ''} />
				<input type="hidden" name="existing_image_url" value={currentService.image_url || ''} />
				
				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<label for="title_id" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Name (Indonesian)</label>
						<input type="text" id="title_id" name="title_id" bind:value={currentService.title_id} required class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all" />
					</div>
					<div>
						<label for="title_en" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Name (English)</label>
						<input type="text" id="title_en" name="title_en" bind:value={currentService.title_en} required class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all" />
					</div>
				</div>

				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<label for="description_id" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Description (Indonesian)</label>
						<textarea id="description_id" name="description_id" bind:value={currentService.description_id} rows="3" class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed"></textarea>
					</div>
					<div>
						<label for="description_en" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Description (English)</label>
						<textarea id="description_en" name="description_en" bind:value={currentService.description_en} rows="3" class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed"></textarea>
					</div>
				</div>

			<div class="pt-4 border-t border-white/10 mt-8">
				<ImageControl 
					bind:previewUrl 
					existingUrl={currentService.image_url} 
					inputName="service_image" 
				/>
			</div>

			<div class="flex gap-4 pt-8">
				<Button type="submit" class="flex-1 bg-industrial-yellow py-6 text-[10px] font-black uppercase tracking-[.2em] text-black h-auto rounded-none">Save Equipment</Button>
				<Button type="button" variant="secondary" onclick={() => isDialogOpen = false} class="px-8 text-[10px] uppercase tracking-widest h-auto py-6 rounded-none font-black">Cancel</Button>
			</div>
		</form>
	{/if}
</AdminDialog>

