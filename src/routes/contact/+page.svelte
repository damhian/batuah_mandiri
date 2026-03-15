<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { lang } from '$lib/lang';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);
	let formMessage = $state('');

	const contactInfo = {
		address: 'JL. YOS SUDARSO IV NO. 97, Sangatta Utara, Kutai Timur, Kalimantan Timur',
		phone: '+62 858-4502-0384',
		email: 'batuahmandiripersada@gmail.com',
		director: 'Ivanto Saputra'
	};
</script>

<svelte:head>
	<title>{$lang === 'en' ? 'Contact Us' : 'Kontak Kami'} | PT. Batuah Mandiri Persada</title>
</svelte:head>

<section class="bg-industrial-black pt-40 pb-32">
	<div class="container mx-auto px-4">
		<div class="grid gap-20 lg:grid-cols-2">
			<!-- Contact Info -->
			<div>
				<h1 class="text-4xl font-black uppercase tracking-tighter md:text-7xl text-white">
					{$lang === 'en' ? 'Let\'s' : 'Ayo'} <span class="text-industrial-yellow">{$lang === 'en' ? 'Connect' : 'Bicara'}</span>
				</h1>
				<p class="mt-8 text-lg text-white/60 leading-relaxed max-w-xl uppercase tracking-widest font-bold">
					{$lang === 'en' ? 'Ready to mobilize your project with the industry\'s most reliable fleet.' : 'Siap memobilisasi proyek Anda dengan armada paling andal di industri.'}
				</p>

				<div class="mt-20 space-y-12">
					<div class="flex items-start gap-8">
						<div class="mt-1 h-2 w-2 bg-industrial-yellow"></div>
						<div>
							<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">{$lang === 'en' ? 'Global HQ' : 'Markas Besar'}</h4>
							<p class="text-xs font-bold uppercase tracking-widest leading-loose text-white">
								{contactInfo.address}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-8">
						<div class="mt-1 h-2 w-2 bg-industrial-orange"></div>
						<div>
							<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">{$lang === 'en' ? 'Direct Line' : 'Saluran Langsung'}</h4>
							<p class="text-xl font-black text-white">{contactInfo.phone}</p>
							<p class="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">{contactInfo.email}</p>
						</div>
					</div>

					<div class="flex items-start gap-8 border-t border-white/5 pt-12">
						<div class="mt-1 h-2 w-2 bg-industrial-yellow"></div>
						<div>
							<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">{$lang === 'en' ? 'Director' : 'Direktur'}</h4>
							<p class="text-xl font-black text-white">{contactInfo.director}</p>
						</div>
					</div>
				</div>

				<div class="mt-20">
					<div class="group relative aspect-video w-full overflow-hidden border border-white/5 bg-industrial-slate/10">
						<!-- Industrial Filtered Map -->
						<iframe
							title="PT. Batuah Mandiri Persada Location"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15956.123456789!2d117.5100!3d-0.5050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzAnMTguMCJTIDExN8KwMzAnMzYuMCJF!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
							width="100%"
							height="100%"
							style="border:0; filter: grayscale(1) contrast(1.2) invert(0.9);"
							allowfullscreen={true}
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							class="transition-all duration-700 group-hover:filter-none group-hover:scale-105"
						></iframe>
						
						<!-- Overlay for that industrial "edge" -->
						<div class="pointer-events-none absolute inset-0 border-8 border-industrial-black/50 mix-blend-multiply"></div>
					</div>

					<div class="mt-8">
						<Button 
							variant="outline"
							onclick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`, '_blank')}
							class="w-full h-16 border-industrial-yellow/20 text-[10px] font-black uppercase tracking-[0.3em] text-industrial-yellow hover:bg-industrial-yellow hover:text-black transition-all rounded-none"
						>
							{$lang === 'en' ? 'Navigate to Site' : 'Navigasi ke Lokasi'}
							<span class="ml-4">→</span>
						</Button>
					</div>
				</div>
			</div>

			<!-- Lead Form -->
			<div class="border border-white/5 bg-industrial-slate/5 p-12">
				<h3 class="text-sm font-black uppercase tracking-[0.4em] text-industrial-yellow mb-12">{$lang === 'en' ? 'Project Transmission' : 'Transmisi Proyek'}</h3>
				
				<form 
					method="POST" 
					use:enhance={() => {
						submitting = true;
						return async ({ update, result }) => {
							await update();
							submitting = false;
							if (result.type === 'success') {
								formMessage = (result.data?.message as string) || '';
							} else if (result.type === 'failure') {
								formMessage = (result.data?.message as string) || '';
							}
						};
					}}
					class="space-y-10"
				>
					{#if formMessage}
						<div class="p-4 border {form?.success ? 'border-industrial-yellow bg-industrial-yellow/10 text-industrial-yellow' : 'border-industrial-orange bg-industrial-orange/10 text-industrial-orange'} text-[10px] font-black uppercase tracking-widest">
							{formMessage}
						</div>
					{/if}

					<div>
						<label for="identity" class="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">{$lang === 'en' ? 'Identity' : 'Identitas'}</label>
						<input 
							id="identity" 
							name="identity"
							type="text" 
							required
							placeholder={$lang === 'en' ? 'NAME / COMPANY' : 'NAMA / PERUSAHAAN'} 
							class="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold text-white outline-none focus:border-industrial-yellow transition-all placeholder:uppercase" 
						/>
					</div>

					<div>
						<label for="email" class="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">{$lang === 'en' ? 'Communication Port' : 'Port Komunikasi'}</label>
						<input 
							id="email" 
							name="email"
							type="email" 
							required
							placeholder="EMAIL ADDRESS" 
							class="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold text-white outline-none focus:border-industrial-yellow transition-all placeholder:uppercase" 
						/>
					</div>

					<div>
						<label for="requirements" class="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">{$lang === 'en' ? 'Specifications' : 'Spesifikasi'}</label>
						<textarea 
							id="requirements" 
							name="requirements"
							rows="4" 
							required
							placeholder={$lang === 'en' ? 'PROJECT REQUIREMENTS' : 'KEBUTUHAN PROYEK'} 
							class="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold text-white outline-none focus:border-industrial-yellow transition-all placeholder:uppercase"
						></textarea>
					</div>

					<Button 
						type="submit" 
						disabled={submitting}
						class="w-full bg-industrial-yellow h-20 text-[10px] font-black uppercase tracking-[0.4em] text-black hover:bg-white transition-all rounded-none disabled:opacity-50"
					>
						{submitting ? ($lang === 'en' ? 'TRANSMITTING...' : 'MENGIRIM...') : ($lang === 'en' ? 'Send Transmission' : 'Kirim Transmisi')}
					</Button>
				</form>
			</div>
		</div>
	</div>
</section>
