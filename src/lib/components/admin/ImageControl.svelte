<script lang="ts">
	import { Eye, Upload, Trash2, X, Image as ImageIcon } from '@lucide/svelte';
	import { compressImage } from '$lib/utils';

	let { 
		previewUrl = $bindable(null), 
		existingUrl = null, 
		inputName = 'image', 
		deleteInputName = 'delete_image' 
	} = $props<{
		previewUrl: string | null;
		existingUrl?: string | null;
		inputName?: string;
		deleteInputName?: string;
	}>();

	let fileInput = $state<HTMLInputElement | null>(null);
	let isDeleted = $state(false);
	let isPreviewOpen = $state(false);

	// Derived visible image URL
	let visibleUrl = $derived(isDeleted ? null : (previewUrl || existingUrl));

	const handleUploadClick = () => {
		fileInput?.click();
	};

	const handleFileChange = async (e: Event) => {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		// Compress
		const compressed = await compressImage(file);
		
		// Assign back to input
		const dt = new DataTransfer();
		dt.items.add(compressed);
		input.files = dt.files;

		// Revoke old
		if (previewUrl && previewUrl.startsWith('blob:')) {
			URL.revokeObjectURL(previewUrl);
		}
		
		previewUrl = URL.createObjectURL(compressed);
		isDeleted = false; // Reset delete flag if they upload a new one
	};

	const handleDelete = () => {
		isDeleted = true;
		previewUrl = null;
		if (fileInput) fileInput.value = ''; // clear file input
	};
</script>

<div class="space-y-4">
	<label class="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Image Attachment</label>
	
	<!-- Hidden Inputs -->
	<input type="file" bind:this={fileInput} name={inputName} accept="image/*" onchange={handleFileChange} class="hidden" />
	{#if isDeleted}
		<input type="hidden" name={deleteInputName} value="true" />
	{/if}

	<!-- Thumbnail Area -->
	<div class="relative h-48 w-full sm:w-64 bg-[#0a0a0a] border border-white/10 group overflow-hidden">
		{#if visibleUrl}
			<!-- Image Display -->
			<img 
				src={visibleUrl.startsWith('http') || visibleUrl.startsWith('blob:') ? visibleUrl : `/api/storage/${visibleUrl}`} 
				alt="Thumbnail" 
				class="w-full h-full object-cover transition-all duration-300 lg:group-hover:scale-105 lg:group-hover:blur-md lg:group-hover:brightness-50"
			/>
			
			<!-- Desktop Hover Overlay (hidden on mobile) -->
			<div class="absolute inset-0 hidden lg:flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<button type="button" onclick={() => isPreviewOpen = true} class="h-10 w-10 bg-black/80 border border-white/20 text-white hover:border-industrial-yellow hover:text-industrial-yellow flex items-center justify-center transition-all">
					<Eye size={16} />
				</button>
				<button type="button" onclick={handleUploadClick} class="h-10 w-10 bg-black/80 border border-white/20 text-white hover:border-industrial-yellow hover:text-industrial-yellow flex items-center justify-center transition-all">
					<Upload size={16} />
				</button>
				<button type="button" onclick={handleDelete} class="h-10 w-10 bg-black/80 border border-white/20 text-white hover:border-red-500 hover:text-red-500 hover:bg-red-500/20 flex items-center justify-center transition-all">
					<Trash2 size={16} />
				</button>
			</div>
		{:else}
			<!-- Empty State -->
			<button type="button" onclick={handleUploadClick} class="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/20 hover:text-industrial-yellow hover:bg-white/5 transition-all cursor-pointer">
				<ImageIcon size={24} />
				<span class="text-[9px] uppercase tracking-widest font-bold">Upload Image</span>
			</button>
		{/if}
	</div>

	<!-- Mobile/Tablet Action Buttons (always visible below image, hidden on desktop) -->
	<div class="flex gap-2 lg:hidden">
		{#if visibleUrl}
			<button type="button" onclick={() => isPreviewOpen = true} class="flex-1 h-10 bg-white/5 border border-white/10 text-white/60 active:bg-white/10 flex items-center justify-center gap-2 transition-all text-[9px] uppercase tracking-widest font-bold">
				<Eye size={14} />
				Preview
			</button>
		{/if}
		<button type="button" onclick={handleUploadClick} class="flex-1 h-10 bg-white/5 border border-white/10 text-white/60 active:bg-white/10 flex items-center justify-center gap-2 transition-all text-[9px] uppercase tracking-widest font-bold">
			<Upload size={14} />
			Upload
		</button>
		{#if visibleUrl}
			<button type="button" onclick={handleDelete} class="h-10 px-4 bg-red-500/10 border border-red-500/20 text-red-500/60 active:bg-red-500/20 flex items-center justify-center gap-2 transition-all text-[9px] uppercase tracking-widest font-bold">
				<Trash2 size={14} />
			</button>
		{/if}
	</div>

	<!-- Image Fullscreen Overlay -->
	{#if isPreviewOpen && visibleUrl}
		<div class="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-8">
			<button type="button" onclick={() => isPreviewOpen = false} class="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
				<X size={32} />
			</button>
			<img 
				src={visibleUrl.startsWith('http') || visibleUrl.startsWith('blob:') ? visibleUrl : `/api/storage/${visibleUrl}`} 
				alt="Fullscreen Preview" 
				class="max-w-[90vw] max-h-[80vh] object-contain border border-white/10 shadow-2xl"
			/>
		</div>
	{/if}
</div>
