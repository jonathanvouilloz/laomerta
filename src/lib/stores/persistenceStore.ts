import type { GameState } from '$lib/types/game';

const STORAGE_KEY = 'isla-plomo-game-state';

export interface PersistedGameState extends GameState {
	version: number; // Pour gérer les migrations futures
}

const CURRENT_VERSION = 1;

/**
 * Sauvegarde l'état du jeu dans localStorage
 */
export function saveGameState(state: GameState): void {
	try {
		const persistedState: PersistedGameState = {
			...state,
			version: CURRENT_VERSION
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
	} catch {
		// Silently fail if localStorage is not available
	}
}

/**
 * Charge l'état du jeu depuis localStorage
 */
export function loadGameState(): GameState | null {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return null;

		const parsed = JSON.parse(stored) as PersistedGameState;

		// Vérifier la version
		if (parsed.version !== CURRENT_VERSION) {
			// Version incompatible, effacer
			clearGameState();
			return null;
		}

		// Ne pas restaurer si on est à l'accueil ou en fin de partie
		if (parsed.phase === 'home' || parsed.phase === 'end') {
			return null;
		}

		return parsed;
	} catch {
		// En cas d'erreur de parsing, effacer
		clearGameState();
		return null;
	}
}

/**
 * Efface l'état du jeu de localStorage
 */
export function clearGameState(): void {
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// Silently fail if localStorage is not available
	}
}

/**
 * Vérifie si une partie existe dans localStorage
 */
export function hasExistingGame(): boolean {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return false;

		const parsed = JSON.parse(stored) as PersistedGameState;
		// Une partie existe si on n'est pas à l'accueil ou en fin de partie
		return parsed.phase !== 'home' && parsed.phase !== 'end';
	} catch {
		return false;
	}
}
