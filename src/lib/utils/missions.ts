import type { MissionConfig, Mission } from '$lib/types/game';

// Configuration par nombre de joueurs
const MISSION_CONFIGS: Record<number, MissionConfig> = {
	5: {
		teamSizes: [2, 3, 2, 3, 3],
		mafiaCount: 3,
		policeCount: 2,
		specialRolesAvailable: false,
		specialRolesRecommended: false
	},
	6: {
		teamSizes: [2, 3, 4, 3, 4],
		mafiaCount: 4,
		policeCount: 2,
		specialRolesAvailable: true,
		specialRolesRecommended: false
	},
	7: {
		teamSizes: [2, 3, 3, 4, 4],
		mafiaCount: 4,
		policeCount: 3,
		specialRolesAvailable: true,
		specialRolesRecommended: true
	},
	8: {
		teamSizes: [3, 4, 4, 5, 5],
		mafiaCount: 5,
		policeCount: 3,
		specialRolesAvailable: true,
		specialRolesRecommended: true
	},
	9: {
		teamSizes: [3, 4, 4, 5, 5],
		mafiaCount: 6,
		policeCount: 3,
		specialRolesAvailable: true,
		specialRolesRecommended: true
	},
	10: {
		teamSizes: [3, 4, 4, 5, 5],
		mafiaCount: 6,
		policeCount: 4,
		specialRolesAvailable: true,
		specialRolesRecommended: true
	}
};

export function getMissionConfig(playerCount: number): MissionConfig {
	const config = MISSION_CONFIGS[playerCount];
	if (!config) {
		throw new Error(`Configuration non disponible pour ${playerCount} joueurs`);
	}
	return config;
}

export function createMissions(playerCount: number): Mission[] {
	const config = getMissionConfig(playerCount);

	return config.teamSizes.map((teamSize, index) => ({
		number: index + 1,
		teamSize,
		// Mission 4 (index 3) à 7+ joueurs nécessite 2 sabotages
		requiredFailures: index === 3 && playerCount >= 7 ? 2 : 1,
		team: [],
		votes: {
			approved: null,
			rejectionCount: 0
		},
		result: {
			successes: 0,
			sabotages: 0,
			completed: false,
			success: null
		}
	}));
}

