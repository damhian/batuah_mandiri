<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { X } from '@lucide/svelte';

	let { open = $bindable(false), title, children } = $props<{
		open: boolean;
		title: string;
		children: any;
	}>();

	const close = () => { open = false; };

	const handleKeydown = (e: KeyboardEvent) => {
		if (open && e.key === 'Escape') {
			close();
		}
	};

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div 
		class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm cursor-pointer"
		transition:fade={{ duration: 150 }}
		onclick={close}
	></div>
	
	<!-- Dialog -->
	<div 
		class="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col max-h-[90vh]"
		transition:scale={{ duration: 150, start: 0.95 }}
	>
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-white/5 p-6 shrink-0">
			<h2 class="text-sm font-bold uppercase tracking-[0.4em] text-industrial-yellow">{title}</h2>
			<button onclick={close} class="text-white/40 hover:text-white transition-colors" type="button">
				<X size={24} />
			</button>
		</div>
		
		<!-- Body -->
		<div class="p-8 overflow-y-auto" data-lenis-prevent>
			{@render children()}
		</div>
	</div>
{/if}
