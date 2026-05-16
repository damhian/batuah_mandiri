<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import AdminDialog from '$lib/components/admin/AdminDialog.svelte';
	import ImageControl from '$lib/components/admin/ImageControl.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
	
	let currentMember = $state<any>(null);
	let previewUrl = $state<string | null>(null);
	let isDialogOpen = $state(false);

	$effect(() => {
		if (!isDialogOpen) {
			currentMember = null;
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			previewUrl = null;
		}
	});

	const openEditor = (member: any = null) => {
		currentMember = member || { name: '', role_title: '', bio: '', bio_id: '', display_order: 1 };
		isDialogOpen = true;
	};
</script>

<h1 class="text-4xl font-black uppercase tracking-tighter mb-12">Team <span class="text-industrial-yellow">Directory</span></h1>

<div class="space-y-4 max-w-4xl">
		{#each data.team as member}
			<div class="flex items-center gap-6 border border-white/5 bg-industrial-slate/5 p-6 transition-all hover:bg-white/5">
				<div class="h-16 w-16 bg-industrial-slate overflow-hidden">
					{#if member.profile_image_url}
						<img src={member.profile_image_url} alt={member.name} class="h-full w-full object-cover" />
					{/if}
				</div>
				<div class="flex-1">
					<h3 class="font-bold text-white uppercase">{member.name}</h3>
					<p class="text-[10px] font-bold uppercase tracking-widest text-industrial-yellow">{member.role_title}</p>
				</div>
				<div class="flex gap-4">
					<Button 
						variant="ghost" 
						size="sm" 
						onclick={() => openEditor({ ...member })} 
						class="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white"
					>
						Edit
					</Button>
					<form method="POST" action="?/delete">
						<input type="hidden" name="id" value={member.id} />
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
			class="w-full border-dashed py-10 text-[10px] font-bold uppercase tracking-[0.4em] transition-all h-auto rounded-none"
		>
			Add New Member
		</Button>
</div>

<!-- Editor Dialog -->
<AdminDialog bind:open={isDialogOpen} title={currentMember?.id ? "Edit Member" : "New Member"}>
	{#if currentMember}
		<form method="POST" action="?/upsert" enctype="multipart/form-data" use:enhance={() => {
			return async ({ result, update }) => {
				await update();
				if (result.type === 'success' || result.type === 'redirect') {
					isDialogOpen = false;
				}
			};
		}} class="space-y-8">
			<input type="hidden" name="id" value={currentMember.id || ''} />
				<input type="hidden" name="existing_image_url" value={currentMember.profile_image_url || ''} />
				
				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<label for="name" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Full Name</label>
						<input type="text" id="name" name="name" bind:value={currentMember.name} required class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all" />
					</div>
					<div>
						<label for="display_order" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Display Order</label>
						<input type="number" id="display_order" name="display_order" bind:value={currentMember.display_order} class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all" />
					</div>
				</div>

				<div>
					<label for="role_title" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Role Title</label>
					<input type="text" id="role_title" name="role_title" bind:value={currentMember.role_title} required class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all" />
				</div>

				<div class="grid gap-8 md:grid-cols-2">
					<div>
						<label for="bio" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Bio (English)</label>
						<textarea id="bio" name="bio" bind:value={currentMember.bio} rows="4" class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed"></textarea>
					</div>
					<div>
						<label for="bio_id" class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Bio (Bahasa Indonesia)</label>
						<textarea id="bio_id" name="bio_id" bind:value={currentMember.bio_id} rows="4" class="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed"></textarea>
					</div>
				</div>

			<div class="pt-4 border-t border-white/10 mt-8">
				<ImageControl 
					bind:previewUrl 
					existingUrl={currentMember.profile_image_url} 
					inputName="profile_image" 
				/>
			</div>

			<div class="flex gap-4 pt-8">
				<Button type="submit" class="flex-1 bg-industrial-yellow py-6 text-[10px] font-black uppercase tracking-[.2em] text-black h-auto rounded-none">Save Member</Button>
				<Button type="button" variant="secondary" onclick={() => isDialogOpen = false} class="px-8 text-[10px] uppercase tracking-widest h-auto py-6 rounded-none font-black">Cancel</Button>
			</div>
		</form>
	{/if}
</AdminDialog>

