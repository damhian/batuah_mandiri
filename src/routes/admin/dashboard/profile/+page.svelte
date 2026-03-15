<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { ActionData, PageData } from './$types';
	
	let { data, form }: { data: PageData, form: ActionData } = $props();
	const profile = data.profile;
</script>

<h1 class="text-4xl font-black uppercase tracking-tighter mb-12">Manage <span class="text-industrial-yellow">Profile</span></h1>

<form method="POST" action="?/update" class="max-w-4xl space-y-12 mb-20">
	<input type="hidden" name="id" value={profile?.id} />
	
	<div class="grid gap-12 md:grid-cols-2">
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">Years of experience</label>
			<input type="number" name="years_of_experience" value={profile?.years_of_experience} class="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-black text-industrial-yellow outline-none focus:border-white transition-all" />
		</div>
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">Active Projects</label>
			<input type="number" name="active_projects_count" value={profile?.active_projects_count} class="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-black text-industrial-orange outline-none focus:border-white transition-all" />
		</div>
	</div>

	<div>
		<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">Hero Video URL (YouTube)</label>
		<input type="text" name="hero_video_youtube_url" value={profile?.hero_video_youtube_url} class="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-industrial-yellow transition-all" />
	</div>

	<div class="grid gap-8 md:grid-cols-2">
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">Vision Statement (English)</label>
			<textarea name="vision_statement" rows="3" class="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed">{profile?.vision_statement}</textarea>
		</div>
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">Visi (Bahasa Indonesia)</label>
			<textarea name="vision_statement_id" rows="3" class="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed">{profile?.vision_statement_id}</textarea>
		</div>
	</div>

	<div class="grid gap-8 md:grid-cols-2">
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-industrial-orange mb-4">Mission Statement (English)</label>
			<textarea name="mission_statement" rows="3" class="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-industrial-orange transition-all leading-relaxed">{profile?.mission_statement}</textarea>
		</div>
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-industrial-orange mb-4">Misi (Bahasa Indonesia)</label>
			<textarea name="mission_statement_id" rows="3" class="w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-industrial-orange transition-all leading-relaxed">{profile?.mission_statement_id}</textarea>
		</div>
	</div>

	<div class="grid gap-8 md:grid-cols-2">
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">About Us (English)</label>
			<textarea name="about_us_body" rows="6" class="w-full bg-transparent border border-white/10 p-6 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed">{profile?.about_us_body}</textarea>
		</div>
		<div>
			<label class="block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4">Tentang Kami (Bahasa Indonesia)</label>
			<textarea name="about_us_body_id" rows="6" class="w-full bg-transparent border border-white/10 p-6 text-white outline-none focus:border-industrial-yellow transition-all leading-relaxed">{profile?.about_us_body_id}</textarea>
		</div>
	</div>

	{#if form?.success}
		<p class="text-xs font-bold uppercase tracking-widest text-green-500">Profile updated successfully. Industrial sync complete.</p>
	{:else if form?.message}
		<p class="text-xs font-bold uppercase tracking-widest text-red-500">Error: {form.message}</p>
	{/if}

	<Button type="submit" class="bg-industrial-yellow px-12 h-20 text-sm font-black uppercase tracking-[0.2em] text-black hover:bg-white transition-all rounded-none">
		Save Profile
	</Button>
</form>
