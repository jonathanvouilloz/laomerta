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

	// Rôles de l'équipe Good
	const goodCount = config.goodCount;
	if (useSpecialRoles && config.specialRolesAvailable) {
		// 1 Merlin + reste en Loyalists
		roles.push({ role: 'merlin', team: 'good' });
		for (let i = 0; i < goodCount - 1; i++) {
			roles.push({ role: 'loyalist', team: 'good' });
		}
	} else {
		// Tous Loyalists
		for (let i = 0; i < goodCount; i++) {
			roles.push({ role: 'loyalist', team: 'good' });
		}
	}

	// Rôles de l'équipe Evil
	const evilCount = config.evilCount;
	if (useSpecialRoles && config.specialRolesAvailable) {
		// 1 Assassin + reste en Spies
		roles.push({ role: 'assassin', team: 'evil' });
		for (let i = 0; i < evilCount - 1; i++) {
			roles.push({ role: 'spy', team: 'evil' });
		}
	} else {
		// Tous Spies
		for (let i = 0; i < evilCount; i++) {
			roles.push({ role: 'spy', team: 'evil' });
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

	if (role === 'spy' || role === 'assassin') {
		// Les spies voient les autres spies
		knownPlayers = allPlayers.filter(
			(p) => p.id !== player.id && (p.role === 'spy' || p.role === 'assassin')
		);
	} else if (role === 'merlin') {
		// Merlin voit tous les spies
		knownPlayers = allPlayers.filter((p) => p.role === 'spy' || p.role === 'assassin');
	}
	// Les Loyalists standards ne voient personne

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
	return team === 'good' ? translations.teams.good : translations.teams.evil;
}

/**
 * Vérifie si un joueur peut voter Sabotage (tous peuvent, c'est un choix de design)
 */
export function canSabotage(): boolean {
	// Tous les joueurs peuvent voter Sabotage pour bluffer
	return true;
}
