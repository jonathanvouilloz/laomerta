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
		mafiaVsPolice: (mafia: number, police: number) => string;
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
		famiglia: string;
		flics: string;
		teamLeader: string;
		consecutiveRejections: (count: number) => string;
	};

	// Team Selection
	teamSelection: {
		mission: (n: number) => string;
		leaderChooses: (name: string, count: number) => string;
		requiredFailures: (count: number) => string;
		selected: (current: number, total: number) => string;
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
		policeAre: string;
		policeAllies: string;
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
		mafioso: RoleTranslation;
		taupe: RoleTranslation;
		policier: RoleTranslation;
		enqueteur: RoleTranslation;
	};

	// Teams
	teams: {
		famiglia: string;
		police: string;
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
		policeOpenEyes: string;
		policeIdentify: string;
		policeCloseEyes: string;
		policeThumbsUp: string;
		moleOpenEyes: string;
		moleSeePolice: string;
		moleCloseEyes: string;
		policeThumbsDown: string;
		everyoneOpenEyes: string;
		gameCanStart: string;
		next: string;
		startGame: string;
	};

	// Help
	help: {
		title: string;
		close: string;
		objective: {
			title: string;
			famiglia: string;
			police: string;
		};
		teams: {
			title: string;
			famigliaDesc: string;
			policeDesc: string;
		};
		rolesTitle: string;
		rolesDesc: {
			mafioso: string;
			taupe: string;
			policier: string;
			enqueteur: string;
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
