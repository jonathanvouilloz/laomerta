export type Locale = 'fr' | 'en';

export interface RoleTranslation {
	name: string;
	description: string;
}

export interface Translations {
	// Home
	home: {
		subtitle: string;
		playerCount: string;
		singlePhone: string;
		newGame: string;
		credits: string;
	};

	// Setup
	setup: {
		title: string;
		playerCountLabel: string;
		goodVsEvil: (good: number, evil: number) => string;
		playerNames: string;
		playerPlaceholder: (n: number) => string;
		specialRoles: string;
		notAvailable: (count: number) => string;
		recommended: string;
		optional: string;
		showRoles: string;
		hideRoles: string;
		startGame: string;
		back: string;
	};

	// Mission Board
	missionBoard: {
		good: string;
		evil: string;
		teamLeader: string;
		consecutiveRejections: (count: number) => string;
	};

	// Team Selection
	teamSelection: {
		mission: (n: number) => string;
		leaderChooses: (name: string, count: number) => string;
		requiredFailures: (count: number) => string;
		recruited: string;
		proposeTeam: string;
	};

	// Team Vote
	teamVote: {
		title: string;
		proposedTeam: string;
		voteInstruction: string;
		rejectionWarning: (count: number) => string;
		approve: string;
		reject: string;
	};

	// Secret Vote
	secretVote: {
		instruction: string;
		success: string;
		sabotage: string;
		tip: string;
	};

	// Role Reveal
	roleReveal: {
		evilAre: string;
		evilAllies: string;
		understood: string;
		wait: (seconds: number) => string;
	};

	// Mission Result
	missionResult: {
		success: string;
		failure: string;
		successes: string;
		sabotages: string;
		requiredTwo: string;
		continue: string;
	};

	// Accusation
	accusation: {
		title: string;
		mafiaWon: string;
		instruction: string;
		whoIsMole: string;
		accuse: string;
	};

	// Game End
	gameEnd: {
		victory: string;
		winners: string;
		losers: string;
		accusedPlayer: string;
		roleReveal: string;
		recap: string;
		missionSuccess: string;
		missionFailed: string;
		newGame: string;
		returnHome: string;
	};

	// Transitions
	transitions: {
		passPhone: string;
		iAm: (name: string) => string;
		secretVotePass: string;
		nextPlayer: string;
		allVotesRecorded: string;
		seeResult: string;
	};

	// Roles
	roles: {
		loyalist: RoleTranslation;
		merlin: RoleTranslation;
		spy: RoleTranslation;
		assassin: RoleTranslation;
	};

	// Teams
	teams: {
		good: string;
		evil: string;
	};

	// Win Reasons (keys used by gameStore)
	winReasons: {
		paralyzed: string;
		operationsSuccess: string;
		networkDismantled: string;
		moleIdentified: string;
		moleHidden: string;
	};

	// Meta
	meta: {
		description: string;
	};

	// Settings
	settings: {
		title: string;
		language: string;
		help: string;
		viewRules: string;
		restart: string;
		newGame: string;
		confirmRestart: string;
		confirm: string;
		cancel: string;
		chooseRestartType: string;
		freshStart: string;
		samePlayers: string;
	};

	// Credits
	credits: {
		title: string;
		createdBy: string;
		inspiredBy: string;
		originalGame: string;
		originalAuthor: string;
		technologies: string;
		website: string;
		version: string;
		back: string;
	};

	// Night Phase
	nightPhase: {
		title: string;
		everyoneCloseEyes: string;
		evilOpenEyes: string;
		evilIdentify: string;
		evilCloseEyes: string;
		evilThumbsUp: string;
		merlinOpenEyes: string;
		merlinSeeEvil: string;
		merlinCloseEyes: string;
		evilThumbsDown: string;
		everyoneOpenEyes: string;
		gameCanStart: string;
		next: string;
		startGame: string;
	};

	// PWA
	pwa: {
		install: string;
		installTitle: string;
		step1: string;
		step2: string;
		understood: string;
	};

	// Help
	help: {
		title: string;
		close: string;
		objective: {
			title: string;
			good: string;
			evil: string;
		};
		teams: {
			title: string;
			goodDesc: string;
			evilDesc: string;
		};
		rolesTitle: string;
		rolesDesc: {
			loyalist: string;
			merlin: string;
			spy: string;
			assassin: string;
		};
		gameplay: {
			title: string;
			step1: string;
			step2: string;
			step3: string;
			step4: string;
		};
		specialRules: {
			title: string;
			rule1: string;
			rule2: string;
			rule3: string;
		};
	};
}

export type WinReasonKey = keyof Translations['winReasons'];
