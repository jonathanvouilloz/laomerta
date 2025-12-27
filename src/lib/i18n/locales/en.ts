import type { Translations } from '../types';

export const en: Translations = {
	home: {
		subtitle: 'The law of silence',
		playerCount: '5-10 players',
		singlePhone: 'One phone for everyone',
		newGame: 'New game',
		credits: 'Inspired by The Resistance: Avalon'
	},

	setup: {
		title: 'Setup',
		playerCountLabel: 'Number of players',
		mafiaVsPolice: (mafia, police) => `${mafia} Mafiosi vs ${police} Cops`,
		playerNames: 'Player names',
		playerPlaceholder: (n) => `Player ${n}`,
		specialRoles: 'Special roles',
		notAvailable: (count) => `Not available with ${count} players`,
		recommended: 'Recommended',
		optional: 'Optional',
		showRoles: 'View roles',
		hideRoles: 'Hide roles',
		startGame: 'Start game',
		back: 'Back'
	},

	missionBoard: {
		famiglia: 'Famiglia',
		flics: 'Cops',
		teamLeader: 'Team leader:',
		consecutiveRejections: (count) => `${count}/5 consecutive rejections`
	},

	teamSelection: {
		mission: (n) => `Mission ${n}`,
		leaderChooses: (name, count) => `${name} selects ${count} members`,
		requiredFailures: (count) =>
			count === 2 ? '2 sabotages required to fail' : '1 sabotage is enough to fail',
		selected: (current, total) => `${current} / ${total} selected`,
		proposeTeam: 'Propose this team'
	},

	teamVote: {
		title: 'Team vote',
		proposedTeam: 'Proposed team:',
		voteInstruction: 'Vote by show of hands. Majority wins.',
		rejectionWarning: (count) =>
			`Warning: ${count}/5 rejections. On the 5th rejection, Cops win!`,
		approve: 'Approve team',
		reject: 'Reject team'
	},

	secretVote: {
		instruction: 'Your vote is secret. What do you decide?',
		success: 'Success',
		sabotage: 'Sabotage',
		tip: "Tip: Mafiosi can sabotage to bluff, but it's risky!"
	},

	roleReveal: {
		policeAre: 'The Cops are:',
		policeAllies: 'Your Cop allies:',
		understood: 'Got it',
		wait: (seconds) => `Wait (${seconds}s)`
	},

	missionResult: {
		success: 'Mission successful!',
		failure: 'Mission failed',
		successes: 'Successes',
		sabotages: 'Sabotages',
		requiredTwo: 'This mission required 2 sabotages to fail',
		continue: 'Continue'
	},

	accusation: {
		title: 'Accusation phase',
		mafiaWon:
			'The Mafia has won 3 missions, but The Investigator can still turn things around!',
		instruction: 'The Cops discuss and point out who they think is',
		whoIsMole: 'Who is The Mole?',
		accuse: 'Accuse this player'
	},

	gameEnd: {
		victory: 'Victory',
		accusedPlayer: 'Accused player:',
		roleReveal: 'Role reveal',
		recap: 'Summary',
		missionSuccess: 'Success',
		missionFailed: 'Failed',
		newGame: 'New game',
		returnHome: 'Return to home'
	},

	transitions: {
		passPhone: 'Pass the phone to',
		iAm: (name) => `I am ${name}`,
		secretVotePass: 'Secret vote - Pass the phone to',
		nextPlayer: 'Switching to next player...',
		allVotesRecorded: 'All votes are recorded',
		seeResult: 'See result'
	},

	roles: {
		mafioso: {
			name: 'Mafioso',
			description:
				"Loyal member of La Famiglia. Make missions succeed to win. You can vote Sabotage to bluff, but it's risky!"
		},
		taupe: {
			name: 'The Mole',
			description:
				'Mafioso infiltrated in the police. You know the identity of all Cops. Stay hidden until the end!'
		},
		policier: {
			name: 'Cop',
			description:
				'Agent infiltrated in the Mafia. Sabotage missions to dismantle the network. You know the other Cops.'
		},
		enqueteur: {
			name: 'The Investigator',
			description:
				'Special cop. If the Mafia wins 3 missions, you will have a chance to turn the tables by identifying The Mole!'
		}
	},

	teams: {
		famiglia: 'La Famiglia',
		police: 'The Cops'
	},

	winReasons: {
		paralyzed: 'La Famiglia is paralyzed by distrust (5 teams rejected)',
		operationsSuccess: 'The operations were a success!',
		networkDismantled: 'The network has been dismantled!',
		moleIdentified: 'The Investigator identified The Mole!',
		moleHidden: 'The Investigator was wrong! The Mole remains hidden.'
	},

	meta: {
		description: 'Social deduction game for 5-10 players'
	},

	settings: {
		title: 'Settings',
		language: 'Language',
		help: 'Help & Rules',
		viewRules: 'View rules',
		restart: 'Restart',
		newGame: 'New game',
		confirmRestart: 'Abandon current game?',
		confirm: 'Confirm',
		cancel: 'Cancel'
	},

	credits: {
		title: 'Credits',
		createdBy: 'Created by',
		inspiredBy: 'Inspired by',
		originalGame: 'The Resistance: Avalon',
		originalAuthor: 'Don Eskridge',
		technologies: 'Technologies',
		website: 'Website',
		version: 'Version',
		back: 'Back'
	},

	nightPhase: {
		title: 'Night phase',
		everyoneCloseEyes: 'Everyone close your eyes',
		policeOpenEyes: 'Cops open your eyes',
		policeIdentify: 'Identify each other',
		policeCloseEyes: 'Cops close your eyes',
		policeThumbsUp: 'Cops raise your thumbs',
		moleOpenEyes: 'The Mole opens your eyes',
		moleSeePolice: 'Spot the raised thumbs - those are the Cops',
		moleCloseEyes: 'The Mole closes your eyes',
		policeThumbsDown: 'Cops lower your thumbs',
		everyoneOpenEyes: 'Everyone open your eyes',
		gameCanStart: 'The game can begin!',
		next: 'Next',
		startGame: 'Start the game'
	},

	help: {
		title: 'Game Rules',
		close: 'Close',
		objective: {
			title: 'Objective',
			famiglia: 'La Famiglia (Mafia) must succeed in 3 out of 5 missions',
			police: 'The infiltrated Cops must sabotage 3 missions'
		},
		teams: {
			title: 'The teams',
			famigliaDesc: 'La Famiglia (good guys): Mafiosi + The Mole',
			policeDesc: 'The Cops (bad guys): Cops + Investigator'
		},
		rolesTitle: 'The roles',
		rolesDesc: {
			mafioso: "Mafioso: Loyal to the family, doesn't know anyone",
			taupe: 'The Mole: Infiltrated Mafioso, knows all Cops',
			policier: 'Cop: Infiltrated agent, knows other Cops',
			enqueteur: 'The Investigator: Can identify The Mole if Mafia wins'
		},
		gameplay: {
			title: 'Mission flow',
			step1: 'The leader proposes a team',
			step2: 'Show of hands vote (approve/reject)',
			step3: 'If approved: secret mission vote',
			step4: '1 sabotage = mission failed (except Mission 4 with 7+ players: 2 required)'
		},
		specialRules: {
			title: 'Special rules',
			rule1: '5 consecutive rejections = Cops win',
			rule2: 'Mafiosi CAN vote sabotage to bluff (risky!)',
			rule3: 'If Mafia wins with special roles, the Investigator can turn the tables by identifying The Mole'
		}
	}
};
