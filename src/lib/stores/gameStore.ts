import { writable, derived } from 'svelte/store';
import type { GameState, Player, Team } from '$lib/types/game';
import { createMissions, getMissionConfig } from '$lib/utils/missions';
import { assignRoles } from '$lib/utils/roles';
import { secureShuffle, generateId } from '$lib/utils/shuffle';
import { saveGameState, loadGameState, clearGameState } from './persistenceStore';

const initialState: GameState = {
	phase: 'home',
	players: [],
	useSpecialRoles: false,
	currentLeaderIndex: 0,
	currentPlayerIndex: 0,
	missions: [],
	currentMissionIndex: 0,
	mafiaScore: 0,
	policeScore: 0,
	consecutiveRejections: 0,
	accusedPlayerId: null,
	winner: null,
	winReasonKey: null
};

function createGameStore() {
	// Charger l'état persisté ou utiliser l'état initial
	const persistedState = loadGameState();
	const { subscribe, set, update } = writable<GameState>(persistedState ?? initialState);

	// Stockage temporaire des votes secrets (jamais exposé dans le store)
	let secretVotes: boolean[] = [];

	// Sauvegarder automatiquement à chaque changement
	subscribe((state) => {
		// Ne pas sauvegarder l'état initial home
		if (state.phase !== 'home') {
			saveGameState(state);
		}
	});

	return {
		subscribe,

		// Démarrer une nouvelle partie
		startNewGame: () => set(initialState),

		// Passer à la configuration
		goToSetup: () => update((state) => ({ ...state, phase: 'setup' })),

		// Définir le nombre de joueurs et leurs noms
		setPlayers: (names: string[]) =>
			update((state) => ({
				...state,
				players: names.map((name) => ({
					id: generateId(),
					name
				}))
			})),

		// Définir l'utilisation des rôles spéciaux
		setSpecialRoles: (useSpecial: boolean) =>
			update((state) => ({
				...state,
				useSpecialRoles: useSpecial
			})),

		// Lancer la distribution des rôles
		startDistribution: () =>
			update((state) => {
				// Mélanger l'ordre des joueurs pour la distribution
				const shuffledPlayers = secureShuffle(state.players);
				// Assigner les rôles
				const playersWithRoles = assignRoles(shuffledPlayers, state.useSpecialRoles);
				// Créer les missions
				const missions = createMissions(playersWithRoles.length);
				// Choisir un leader initial aléatoire
				const randomBuffer = new Uint32Array(1);
				crypto.getRandomValues(randomBuffer);
				const leaderIndex = randomBuffer[0] % playersWithRoles.length;

				return {
					...state,
					phase: 'distribution',
					players: playersWithRoles,
					missions,
					currentPlayerIndex: 0,
					currentLeaderIndex: leaderIndex
				};
			}),

		// Passer au joueur suivant pour la distribution
		confirmPlayerReady: () =>
			update((state) => ({
				...state,
				phase: 'distribution-reveal'
			})),

		// Le joueur a vu son rôle, passer au suivant
		roleViewed: () =>
			update((state) => {
				const nextIndex = state.currentPlayerIndex + 1;
				if (nextIndex >= state.players.length) {
					// Tous les joueurs ont vu leur rôle, passer à la phase de nuit
					return {
						...state,
						phase: 'night-phase',
						currentPlayerIndex: 0
					};
				}
				return {
					...state,
					phase: 'distribution',
					currentPlayerIndex: nextIndex
				};
			}),

		// Démarrer le jeu après la phase de nuit
		startGame: () =>
			update((state) => ({
				...state,
				phase: 'mission-team-selection'
			})),

		// Proposer une équipe pour la mission
		proposeTeam: (playerIds: string[]) =>
			update((state) => {
				const missions = [...state.missions];
				missions[state.currentMissionIndex] = {
					...missions[state.currentMissionIndex],
					team: playerIds
				};
				return {
					...state,
					missions,
					phase: 'mission-team-vote'
				};
			}),

		// Vote d'équipe (à main levée)
		voteTeam: (approved: boolean) =>
			update((state) => {
				const missions = [...state.missions];
				const currentMission = missions[state.currentMissionIndex];

				if (approved) {
					// Équipe acceptée, passer au vote secret
					missions[state.currentMissionIndex] = {
						...currentMission,
						votes: { ...currentMission.votes, approved: true }
					};
					secretVotes = []; // Réinitialiser les votes secrets
					return {
						...state,
						missions,
						phase: 'mission-secret-vote',
						currentPlayerIndex: 0,
						consecutiveRejections: 0
					};
				} else {
					// Équipe refusée
					const newRejectionCount = state.consecutiveRejections + 1;

					if (newRejectionCount >= 5) {
						// 5 refus consécutifs = victoire des Flics
						return {
							...state,
							winner: 'police',
							winReasonKey: 'paralyzed',
							phase: 'end'
						};
					}

					// Passer au leader suivant
					const nextLeaderIndex = (state.currentLeaderIndex + 1) % state.players.length;
					missions[state.currentMissionIndex] = {
						...currentMission,
						team: [],
						votes: { approved: null, rejectionCount: currentMission.votes.rejectionCount + 1 }
					};

					return {
						...state,
						missions,
						currentLeaderIndex: nextLeaderIndex,
						consecutiveRejections: newRejectionCount,
						phase: 'mission-team-selection'
					};
				}
			}),

		// Passer au joueur suivant pour le vote secret
		confirmVoterReady: () =>
			update((state) => state), // Le state ne change pas, juste une confirmation UI

		// Vote secret de mission
		submitSecretVote: (success: boolean) =>
			update((state) => {
				secretVotes.push(success);
				const nextIndex = state.currentPlayerIndex + 1;
				const currentMission = state.missions[state.currentMissionIndex];

				if (nextIndex >= currentMission.team.length) {
					// Tous les membres ont voté, calculer le résultat
					const successes = secretVotes.filter((v) => v).length;
					const sabotages = secretVotes.filter((v) => !v).length;
					const missionSuccess = sabotages < currentMission.requiredFailures;

					// Mélanger les votes pour ne pas révéler l'ordre
					secretVotes = secureShuffle(secretVotes);

					const missions = [...state.missions];
					missions[state.currentMissionIndex] = {
						...currentMission,
						result: {
							successes,
							sabotages,
							completed: true,
							success: missionSuccess
						}
					};

					const newMafiaScore = missionSuccess ? state.mafiaScore + 1 : state.mafiaScore;
					const newPoliceScore = !missionSuccess ? state.policeScore + 1 : state.policeScore;

					// Vider les votes secrets
					secretVotes = [];

					return {
						...state,
						missions,
						mafiaScore: newMafiaScore,
						policeScore: newPoliceScore,
						phase: 'mission-result-pending'
					};
				}

				return {
					...state,
					currentPlayerIndex: nextIndex
				};
			}),

		// Révéler le résultat de la mission
		revealMissionResult: () =>
			update((state) => ({
				...state,
				phase: 'mission-result'
			})),

		// Continuer après le résultat de mission
		continueAfterResult: () =>
			update((state) => {
				// Vérifier les conditions de victoire
				if (state.mafiaScore >= 3) {
					// Mafia a gagné 3 missions
					const config = getMissionConfig(state.players.length);
					if (state.useSpecialRoles && config.specialRolesAvailable) {
						// L'Enquêteur peut tenter d'identifier La Taupe
						return {
							...state,
							phase: 'accusation'
						};
					}
					return {
						...state,
						winner: 'famiglia',
						winReasonKey: 'operationsSuccess',
						phase: 'end'
					};
				}

				if (state.policeScore >= 3) {
					// Police a gagné
					return {
						...state,
						winner: 'police',
						winReasonKey: 'networkDismantled',
						phase: 'end'
					};
				}

				// Passer à la mission suivante
				const nextMissionIndex = state.currentMissionIndex + 1;
				const nextLeaderIndex = (state.currentLeaderIndex + 1) % state.players.length;

				return {
					...state,
					currentMissionIndex: nextMissionIndex,
					currentLeaderIndex: nextLeaderIndex,
					consecutiveRejections: 0,
					phase: 'mission-team-selection'
				};
			}),

		// Accusation de La Taupe
		accusePlayer: (playerId: string) =>
			update((state) => {
				const accusedPlayer = state.players.find((p) => p.id === playerId);
				const isTaupe = accusedPlayer?.role === 'taupe';

				if (isTaupe) {
					return {
						...state,
						accusedPlayerId: playerId,
						winner: 'police',
						winReasonKey: 'moleIdentified',
						phase: 'end'
					};
				}

				return {
					...state,
					accusedPlayerId: playerId,
					winner: 'famiglia',
					winReasonKey: 'moleHidden',
					phase: 'end'
				};
			}),

		// Retourner à l'accueil
		returnHome: () => set(initialState),

		// Recommencer la partie (efface la sauvegarde)
		restartGame: () => {
			clearGameState();
			set(initialState);
		}
	};
}

export const gameStore = createGameStore();

// Stores dérivés pour faciliter l'accès
export const currentPlayer = derived(gameStore, ($game) => $game.players[$game.currentPlayerIndex]);

export const currentLeader = derived(gameStore, ($game) => $game.players[$game.currentLeaderIndex]);

export const currentMission = derived(
	gameStore,
	($game) => $game.missions[$game.currentMissionIndex]
);

export const missionConfig = derived(gameStore, ($game) => {
	if ($game.players.length >= 5) {
		return getMissionConfig($game.players.length);
	}
	return null;
});
