import type { WinReasonKey } from '$lib/i18n/types';

// Camps
export type Team = 'famiglia' | 'police';

// Rôles disponibles
export type Role = 'mafioso' | 'taupe' | 'policier' | 'enqueteur';

// Phases du jeu
export type GamePhase =
	| 'home'
	| 'setup'
	| 'distribution'
	| 'distribution-reveal'
	| 'night-phase'
	| 'mission-team-selection'
	| 'mission-team-vote'
	| 'mission-secret-vote'
	| 'mission-result-pending'
	| 'mission-result'
	| 'accusation'
	| 'end';

// Joueur
export interface Player {
	id: string;
	name: string;
	role?: Role;
	team?: Team;
}

// Mission
export interface Mission {
	number: number;
	teamSize: number;
	requiredFailures: number; // 1 normalement, 2 pour mission 4 à 7+ joueurs
	team: string[]; // IDs des joueurs sélectionnés
	votes: {
		approved: boolean | null; // null = pas encore voté
		rejectionCount: number;
	};
	result: {
		successes: number;
		sabotages: number;
		completed: boolean;
		success: boolean | null;
	};
}

// État global du jeu
export interface GameState {
	phase: GamePhase;
	players: Player[];
	useSpecialRoles: boolean;
	currentLeaderIndex: number;
	currentPlayerIndex: number; // Pour la distribution et votes secrets
	missions: Mission[];
	currentMissionIndex: number;
	mafiaScore: number;
	policeScore: number;
	consecutiveRejections: number;
	accusedPlayerId: string | null;
	winner: Team | null;
	winReasonKey: WinReasonKey | null;
}

// Configuration des missions par nombre de joueurs
export interface MissionConfig {
	teamSizes: number[];
	mafiaCount: number;
	policeCount: number;
	specialRolesAvailable: boolean;
	specialRolesRecommended: boolean;
}

// Informations de rôle pour l'affichage
export interface RoleInfo {
	role: Role;
	team: Team;
	name: string;
	description: string;
	knownPlayers: Player[]; // Joueurs que ce joueur connaît
}
