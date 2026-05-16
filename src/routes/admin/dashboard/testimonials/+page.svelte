<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import AdminDialog from '$lib/components/admin/AdminDialog.svelte';
	import ImageControl from '$lib/components/admin/ImageControl.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
	
	let currentTestimonial = $state<any>(null);
	let previewUrl = $state<string | null>(null);
	let isDialogOpen = $state(false);

	$effect(() => {
		if (!isDialogOpen) {
			currentTestimonial = null;
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			previewUrl = null;
		}
	});

	const openEditor = (testimonial: any = null) => {
		currentTestimonial = testimonial || { client_name: '', client_company: '', quote_text: '', quote_text_id: '', is_published: true };
		isDialogOpen = true;
	};
</script>

<h1 class="text-4xl font-black uppercase tracking-tighter mb-12">Client <span class="text-industrial-yellow">Testimonials</span></h1>

<div class="space-y-4 max-w-4xl">
		{#each data.testimonials as testimonial}
			<div class="border border-white/5 bg-industrial-slate/5 p-8 transition-all hover:bg-white/5">
				<div class="flex items-center gap-6 mb-8">
					<div class="h-12 w-12 bg-industrial-slate overflow-hidden">
						{#if testimonial.client_photo_url}
							<img src={testimonial.client_photo_url} alt={testimonial.client_name} class="h-full w-full object-cover" />
						{/if}
					</div>
					<div class="flex-1">
						<h3 class="font-bold text-white uppercase">{testimonial.client_name}</h3>
						<p class="text-[10px] font-bold uppercase tracking-widest text-industrial-yellow">{testimonial.client_company}</p>
					</div>
					<div class="flex gap-4">
						<Button 
							variant="ghost" 
							size="sm" 
							onclick={() => openEditor({ ...testimonial })} 
							class="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white"
						>
							Edit
						</Button>
						<form method="POST" action="?/delete">
							<input type="hidden" name="id" value={testimonial.id} />
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
				<p class="text-sm italic text-white/40 leading-relaxed">"{testimonial.quote_text}"</p>
				<div class="mt-4 flex items-center gap-2">
					<div class="h-1 w-1 rounded-full {testimonial.is_published ? 'bg-green-500' : 'bg-red-500'}"></div>
					<span class="text-[8px] font-bold uppercase tracking-widest text-white/20">{testimonial.is_published ? 'Published' : 'Draft'}</span>
				</div>
			</div>
		{/each}
		
		<Button 
			variant="industrial-outline"
			onclick={() => openEditor()} 
			class="w-full border-dashed py-10 text-[10px] font-bold uppercase tracking-[0.4em] transition-all h-auto rounded-none mt-8"
		>
			Add New Testimonial
		</Button>
</div>

<!-- Editor Dialog -->
<AdminDialog bind:open={isDialogOpen} title={currentTestimonial?.id ? "Edit Testimonial" : "New Testimonial"}>
	{#if currentTestimonial}
		<form method="POST" action="?/upsert" enctype="multipart/form-data" use:enhance={() => {
			return async ({ result, update }) => {
				await update();
				if (result.type === 'success' || result.type === 'redirect') {
					isDialogOpen = false;
				}
			};
		}} class="space-y-8">
			<input type="hidden" name="id" value={currentTestimonial.id || ''} />
				<input type="hidden" name="existing_photo_url" value={currentTestimonial.client_photo_url || ''} />
				
				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<label for="client_name" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Client Name</label>
						<input type="text" id="client_name" name="client_name" bind:value={currentTestimonial.client_name} required class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all" />
					</div>
					<div>
						<label for="client_company" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Company</label>
						<input type="text" id="client_company" name="client_company" bind:value={currentTestimonial.client_company} required class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all" />
					</div>
				</div>

				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<label for="quote_text" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Quote Text (English)</label>
						<textarea id="quote_text" name="quote_text" bind:value={currentTestimonial.quote_text} rows="6" required class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed"></textarea>
					</div>
					<div>
						<label for="quote_text_id" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Testimoni (Bahasa Indonesia)</label>
						<textarea id="quote_text_id" name="quote_text_id" bind:value={currentTestimonial.quote_text_id} rows="6" class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed"></textarea>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<input type="checkbox" name="is_published" id="is_published" bind:checked={currentTestimonial.is_published} class="h-4 w-4 rounded-none accent-industrial-yellow" />
					<label for="is_published" class="text-[10px] font-bold uppercase tracking-widest text-white">Publish to Landing Page</label>
				</div>

			<div class="pt-4 border-t border-white/10 mt-8">
				<ImageControl 
					bind:previewUrl 
					existingUrl={currentTestimonial.client_photo_url} 
					inputName="client_photo" 
				/>
			</div>

			<div class="flex gap-4 pt-8">
				<Button type="submit" class="flex-1 bg-industrial-yellow py-6 text-[10px] font-black uppercase tracking-[.2em] text-black h-auto rounded-none">Save Testimonial</Button>
				<Button type="button" variant="secondary" onclick={() => isDialogOpen = false} class="px-8 text-[10px] uppercase tracking-widest h-auto py-6 rounded-none font-black">Cancel</Button>
			</div>
		</form>
	{/if}
</AdminDialog>

