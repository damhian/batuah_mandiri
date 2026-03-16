import { writable } from "svelte/store";
import { browser } from "$app/environment";

export type Language = "en" | "id";

const initialValue = browser
  ? ((window.localStorage.getItem("lang") as Language) ?? "id")
  : "id";

function createLang() {
  const { subscribe, set, update } = writable<Language>(initialValue); // Default to ID as requested by extracting Indonesian context

  return {
    subscribe,
    set,
    toggle: () =>
      update((l) => {
        const nextLang = l === "en" ? "id" : "en";
        if (browser) window.localStorage.setItem("lang", nextLang);
        return nextLang;
      }),
  };
}

export const lang = createLang();
