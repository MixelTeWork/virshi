import type { LText } from "$lib";
import { writable, derived } from "svelte/store"

type Locale = "ru" | "zh";
let current = "ru" as Locale;
const lang = writable(current);

export const lt = derived([lang], () =>
	(ru: string, zh: string) => current == "zh" ? zh : ru
);
export const lto = derived([lang], () =>
	(o: LText | null | undefined) => (current == "zh" ? o?.zh : o?.ru) || ""
);
export const curLang = derived([lang], () => current);

export function setLocale(loc: Locale)
{
	if (loc != "zh") loc = "ru";
	if (loc == current) return;
	current = loc;
	lang.set(loc);
	localStorage.setItem("lang", loc);
}

export function locale(node: HTMLElement)
{
	const lang = localStorage.getItem("lang") || "ru";
	setLocale(lang as any);
}