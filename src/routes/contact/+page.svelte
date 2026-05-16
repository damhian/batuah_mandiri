<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { lang } from '$lib/lang';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);
	let formMessage = $state('');

	const contactInfo = {
		address: 'Jl. Sangga Buana II Selatan No. 01',	
		phone: '+62 858-4502-0384',
		email: 'batuahmandiripersada@gmail.com',
		director: 'Ivanto Saputra'
	};
</script>

<svelte:head>
	<title>{$lang === 'en' ? 'Contact Us' : 'Kontak Kami'} | PT. Batuah Mandiri Persada</title>
</svelte:head>

<section class="bg-industrial-black pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
	<div class="container mx-auto px-6">
		<div class="grid gap-12 lg:gap-20 lg:grid-cols-2">
			<!-- Contact Info -->
			<div>
				<h1 class="text-3xl font-black uppercase tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl text-white">
					{$lang === 'en' ? 'Let\'s' : 'Ayo'} <span class="text-industrial-yellow">{$lang === 'en' ? 'Connect' : 'Bicara'}</span>
				</h1>
				<p class="mt-4 text-sm text-white/60 leading-relaxed max-w-xl uppercase tracking-widest font-bold sm:mt-6 sm:text-base lg:mt-8 lg:text-lg">
					{$lang === 'en' ? 'Ready to mobilize your project with the industry\'s most reliable fleet.' : 'Siap memobilisasi proyek Anda dengan armada paling andal di industri.'}
				</p>

				<div class="mt-12 space-y-8 sm:mt-16 sm:space-y-12 lg:mt-20">
					<div class="flex items-start gap-8">
						<div class="mt-1 h-2 w-2 bg-industrial-yellow"></div>
						<div>
							<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">{$lang === 'en' ? 'Global HQ' : 'Kantor Pusat'}</h4>
							<p class="text-xs font-bold uppercase tracking-widest leading-loose text-white">
								{contactInfo.address}
							</p>
						</div>
					</div>

					<div class="flex items-start gap-8">
						<div class="mt-1 h-2 w-2 bg-industrial-orange"></div>
						<div>
							<h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4">{$lang === 'en' ? 'Direct Line' : 'Saluran Langsung'}</h4>
							<a 
								href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} 
								target="_blank" 
								rel="noopener noreferrer"
								class="flex items-center gap-3 text-xl font-black text-white hover:text-industrial-yellow transition-colors group"
							>
								<svg class="w-6 h-6 text-industrial-yellow group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M12.031 0C5.393 0 0 5.391 0 12.029c0 2.124.553 4.195 1.603 6.012L.266 23.32l5.421-1.423a11.986 11.986 0 0 0 6.344 1.802c6.638 0 12.03-5.39 12.03-12.028C24.061 5.391 18.67 0 12.031 0zm0 21.696a9.982 9.982 0 0 1-5.097-1.393l-.365-.217-3.791.995.998-3.696-.238-.378A9.974 9.974 0 0 1 2.003 12.03C2.003 6.495 6.498 2 12.031 2s10.028 4.495 10.028 10.028c0 5.534-4.495 10.028-10.028 10.028zm5.498-7.514c-.302-.15-1.782-.879-2.06-.98-.277-.1-.479-.15-.68.151-.202.301-.78 1.002-.956 1.203-.176.202-.353.226-.655.076-1.503-.75-2.585-1.436-3.565-3.136-.205-.355.203-.332.645-.98.151-.225.076-.427 0-.577-.076-.151-.68-1.631-.933-2.233-.245-.584-.492-.505-.68-.515-.176-.01-.378-.01-.58-.01-.202 0-.53.076-.806.377-.277.301-1.058 1.03-1.058 2.511 0 1.48 1.082 2.912 1.233 3.112.151.201 2.122 3.238 5.138 4.54 1.942.836 2.686.906 3.666.756.685-.106 2.06-.843 2.336-1.656.277-.814.277-1.511.202-1.656-.076-.146-.277-.221-.58-.372z"/>
								</svg>
								{contactInfo.phone}
							</a>
							<div class="mt-2 space-y-2">
								<p class="text-[10px] font-bold uppercase tracking-widest text-industrial-yellow">batuah@batuahmandiri.id <span class="text-white/40">(OFFICIAL)</span></p>
								<p class="text-[10px] font-bold uppercase tracking-widest text-white/40">{contactInfo.email}</p>
							</div>
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

				<div class="mt-12 sm:mt-16 lg:mt-20">
					<div class="group relative w-full overflow-hidden border border-white/5 bg-industrial-slate/10" style="aspect-ratio: 16/10; min-height: 220px;">
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

					<div class="mt-4 sm:mt-8">
						<Button 
							variant="outline"
							onclick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`, '_blank')}
							class="w-full h-12 sm:h-14 lg:h-16 border-industrial-yellow/20 text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-industrial-yellow hover:bg-industrial-yellow hover:text-black transition-all rounded-none"
						>
							{$lang === 'en' ? 'Navigate to Site' : 'Navigasi ke Lokasi'}
						</Button>
					</div>
				</div>
			</div>

			<!-- Lead Form -->
			<div class="border border-white/5 bg-industrial-slate/5 p-6 sm:p-8 lg:p-12">
				<h3 class="text-xs font-black uppercase tracking-[0.3em] text-industrial-yellow mb-8 sm:text-sm sm:tracking-[0.4em] sm:mb-12">{$lang === 'en' ? 'Project Transmission' : 'Transmisi Proyek'}</h3>
				
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
							class="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-bold text-white outline-none focus:border-industrial-yellow transition-all placeholder:uppercase" 
						/>
					</div>

					<div>
						<label for="email" class="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">{$lang === 'en' ? 'Your Email' : 'Email Anda'}</label>
						<input 
							id="email" 
							name="email"
							type="email" 
							required
							placeholder="EMAIL ADDRESS" 
							class="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-bold text-white outline-none focus:border-industrial-yellow transition-all placeholder:uppercase" 
						/>
					</div>

					<div>
						<label for="subject" class="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">{$lang === 'en' ? 'Subject / Request Type' : 'Subjek / Jenis Permintaan'}</label>
						<div class="relative">
							<select 
								id="subject" 
								name="subject"
								required
								class="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-bold text-white outline-none focus:border-industrial-yellow transition-all appearance-none cursor-pointer"
							>
								<option value="" disabled selected class="bg-industrial-black text-white/40">{$lang === 'en' ? '-- SELECT REQUEST TYPE --' : '-- PILIH JENIS PERMINTAAN --'}</option>
								<option value="Heavy Equipment Rental" class="bg-industrial-black text-white">{$lang === 'en' ? 'Heavy Equipment Rental' : 'Sewa Alat Berat'}</option>
								<option value="Project Contracting" class="bg-industrial-black text-white">{$lang === 'en' ? 'Mining / Project Contracting' : 'Kontrak Proyek Pertambangan'}</option>
								<option value="Equipment Maintenance" class="bg-industrial-black text-white">{$lang === 'en' ? 'Equipment Maintenance' : 'Pemeliharaan Alat Berat'}</option>
								<option value="General Inquiry" class="bg-industrial-black text-white">{$lang === 'en' ? 'General Inquiry' : 'Pertanyaan Umum'}</option>
							</select>
							<!-- Custom Chevron -->
							<div class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-industrial-yellow text-xs">
								▼
							</div>
						</div>
					</div>

					<div>
						<label for="requirements" class="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">{$lang === 'en' ? 'Specifications' : 'Spesifikasi'}</label>
						<textarea 
							id="requirements" 
							name="requirements"
							rows="4" 
							required
							placeholder={$lang === 'en' ? 'PROJECT REQUIREMENTS' : 'KEBUTUHAN PROYEK'} 
							class="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-bold text-white outline-none focus:border-industrial-yellow transition-all placeholder:uppercase"
						></textarea>
					</div>

					<Button 
						type="submit" 
						disabled={submitting}
						class="w-full bg-industrial-yellow h-14 sm:h-16 lg:h-20 text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black hover:bg-white transition-all rounded-none disabled:opacity-50"
					>
						{submitting ? ($lang === 'en' ? 'SENDING...' : 'MENGIRIM...') : ($lang === 'en' ? 'Send Email' : 'Kirim Email')}
					</Button>
				</form>
			</div>
		</div>
	</div>
</section>

