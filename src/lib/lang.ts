import { writable } from 'svelte/store';

export type Language = 'en' | 'id';

function createLang() {
	const { subscribe, set, update } = writable<Language>('id'); // Default to ID as requested by extracting Indonesian context

	return {
		subscribe,
		set,
		toggle: () => update(l => l === 'en' ? 'id' : 'en')
	};
}

export const lang = createLang();
