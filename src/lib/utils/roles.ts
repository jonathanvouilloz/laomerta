import type { Player, Role, Team, RoleInfo } from '$lib/types/game';
import type { Translations } from '$lib/i18n/types';
import { getMissionConfig } from './missions';
import { secureShuffle } from './shuffle';

interface RoleAssignment {
	role: Role;
	team: Team;
}

/**
 * Distribue les rôles aux joueurs
 */
export function assignRoles(players: Player[], useSpecialRoles: boolean): Player[] {
	const playerCount = players.length;
	const config = getMissionConfig(playerCount);

	// Créer la liste des rôles à distribuer
	const roles: RoleAssignment[] = [];

	// Rôles de La Famiglia
	const mafiaCount = config.mafiaCount;
	if (useSpecialRoles && config.specialRolesAvailable) {
		// 1 Taupe + reste en Mafiosi
		roles.push({ role: 'taupe', team: 'famiglia' });
		for (let i = 0; i < mafiaCount - 1; i++) {
			roles.push({ role: 'mafioso', team: 'famiglia' });
		}
	} else {
		// Tous Mafiosi
		for (let i = 0; i < mafiaCount; i++) {
			roles.push({ role: 'mafioso', team: 'famiglia' });
		}
	}

	// Rôles des Flics
	const policeCount = config.policeCount;
	if (useSpecialRoles && config.specialRolesAvailable) {
		// 1 Enquêteur + reste en Policiers
		roles.push({ role: 'enqueteur', team: 'police' });
		for (let i = 0; i < policeCount - 1; i++) {
			roles.push({ role: 'policier', team: 'police' });
		}
	} else {
		// Tous Policiers
		for (let i = 0; i < policeCount; i++) {
			roles.push({ role: 'policier', team: 'police' });
		}
	}

	// Mélanger les rôles
	const shuffledRoles = secureShuffle(roles);

	// Assigner les rôles aux joueurs
	return players.map((player, index) => ({
		...player,
		role: shuffledRoles[index].role,
		team: shuffledRoles[index].team
	}));
}

/**
 * Obtient les informations de rôle pour l'affichage
 */
export function getRoleInfo(player: Player, allPlayers: Player[], translations: Translations): RoleInfo {
	const role = player.role!;
	const team = player.team!;

	// Déterminer les joueurs connus
	let knownPlayers: Player[] = [];

	if (role === 'policier' || role === 'enqueteur') {
		// Les policiers voient les autres policiers
		knownPlayers = allPlayers.filter(
			(p) => p.id !== player.id && (p.role === 'policier' || p.role === 'enqueteur')
		);
	} else if (role === 'taupe') {
		// La Taupe voit tous les policiers
		knownPlayers = allPlayers.filter((p) => p.role === 'policier' || p.role === 'enqueteur');
	}
	// Les Mafiosi standards ne voient personne

	const roleTranslation = translations.roles[role];

	return {
		role,
		team,
		name: roleTranslation.name,
		description: roleTranslation.description,
		knownPlayers
	};
}

/**
 * Obtient le nom d'équipe
 */
export function getTeamName(team: Team, translations: Translations): string {
	return team === 'famiglia' ? translations.teams.famiglia : translations.teams.police;
}

/**
 * Vérifie si un joueur peut voter Sabotage (tous peuvent, c'est un choix de design)
 */
export function canSabotage(): boolean {
	// Tous les joueurs peuvent voter Sabotage pour bluffer
	return true;
}
