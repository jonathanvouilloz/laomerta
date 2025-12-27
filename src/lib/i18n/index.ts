import { writable, derived } from 'svelte/store';
import type { Locale, Translations } from './types';
import { fr } from './locales/fr';
import { en } from './locales/en';

const STORAGE_KEY = 'omerta-lang';

const locales: Record<Locale, Translations> = { fr, en };

function getInitialLocale(): Locale {
	if (typeof window === 'undefined') return 'fr';

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'en' || stored === 'fr') return stored;

	// Check browser language
	const browserLang = navigator.language.slice(0, 2);
	return browserLang === 'en' ? 'en' : 'fr';
}

function createI18nStore() {
	const { subscribe, set, update } = writable<Locale>('fr');

	// Initialize on client side
	if (typeof window !== 'undefined') {
		set(getInitialLocale());
	}

	return {
		subscribe,
		setLocale: (locale: Locale) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, locale);
			}
			set(locale);
		},
		toggle: () => {
			update((current) => {
				const newLocale = current === 'fr' ? 'en' : 'fr';
				if (typeof window !== 'undefined') {
					localStorage.setItem(STORAGE_KEY, newLocale);
				}
				return newLocale;
			});
		}
	};
}

export const locale = createI18nStore();

// Derived store for translations
export const t = derived(locale, ($locale) => locales[$locale]);

// Re-export types
export type { Locale, Translations, WinReasonKey } from './types';
