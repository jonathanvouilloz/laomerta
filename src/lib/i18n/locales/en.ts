import type { Translations } from '../types';

export const en: Translations = {
	home: {
		subtitle: 'Plata o Plomo',
		playerCount: '5-10 gangsters',
		singlePhone: 'One phone only',
		newGame: 'Enter the island',
		credits: 'Inspired by The Resistance: Avalon',
		inspired: 'A reimagining of The Resistance'
	},

	setup: {
		title: 'Briefing',
		playerCountLabel: 'Traffickers present',
		goodVsEvil: (good, evil) => `${good} Locals vs ${evil} Undercovers`,
		playerNames: 'Player names',
		playerPlaceholder: (n) => `Player ${n}`,
		specialRoles: 'Specialists',
		notAvailable: (count) => `Not available with ${count} players`,
		recommended: 'Recommended',
		optional: 'Optional',
		showRoles: 'View roles',
		hideRoles: 'Hide roles',
		startGame: 'Start the business',
		back: 'Back'
	},

	missionBoard: {
		good: 'Cartel',
		evil: 'Policía',
		teamLeader: 'El Jefe:',
		consecutiveRejections: (count) => `${count}/5 consecutive rejections`
	},

	teamSelection: {
		mission: (n) => `Operation ${n}`,
		leaderChooses: (name, count) => `El Jefe ${name} picks ${count} men`,
		requiredFailures: (count) =>
			count === 2 ? '2 cops required to seize' : '1 cop is enough to seize the drugs',
		recruited: 'recruited',
		proposeTeam: 'Propose this Crew'
	},

	teamVote: {
		title: 'Cartel Council',
		proposedTeam: 'Proposed Crew:',
		voteInstruction: 'Do we trust this plan? Show of hands.',
		rejectionWarning: (count) =>
			`Warning: ${count}/5 rejections. On the 5th, gang war!`,
		approve: 'Approved (Sí)',
		reject: 'Rejected (No)'
	},

	secretVote: {
		instruction: 'Deliver or rat to the cops?',
		success: 'Deliver (Plata)',
		sabotage: 'Seize (Plomo)',
		tip: 'Locals can sabotage to bluff (risky).'
	},

	roleReveal: {
		evilAre: 'The Undercover Cops are:',
		evilAllies: 'Your corrupt colleagues:',
		understood: 'Got it',
		wait: (seconds) => `Wait (${seconds}s)`
	},

	missionResult: {
		success: 'Operation Successful!',
		failure: 'Operation Seized!',
		successes: 'Deliveries',
		sabotages: 'Seizures',
		requiredTwo: 'This operation required 2 seizures to fail',
		continue: 'Continue'
	},

	accusation: {
		title: 'The Interrogation',
		mafiaWon:
			'The Cartel won, but the Sniper is in position!',
		instruction: 'Cops discuss: Who is the rat?',
		whoIsMole: 'Who is The Watcher?',
		accuse: 'Shoot this player'
	},

	gameEnd: {
		victory: 'Victory',
		winners: 'Winners',
		losers: 'Losers',
		accusedPlayer: 'Target eliminated:',
		roleReveal: 'Role reveal',
		recap: 'Summary',
		missionSuccess: 'Delivered',
		missionFailed: 'Seized',
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
		loyalist: {
			name: 'El Soldado',
			description:
				'Laid-back local trafficker. Ensure the contraband gets through to win.'
		},
		merlin: {
			name: 'The Watcher',
			description:
				'The Informant. You know the undercover cops, but watch out for the Sniper.'
		},
		spy: {
			name: 'Undercover',
			description:
				'Undercover cop. Sabotage the shipments and take down the network.'
		},
		assassin: {
			name: 'The Sniper',
			description:
				'If the Cartel wins 3 shipments, shoot The Watcher to steal the victory.'
		}
	},

	teams: {
		good: 'El Cartel',
		evil: 'The Police'
	},

	winReasons: {
		paralyzed: 'Gang war: The Cartel destroyed itself (5 crews rejected)',
		operationsSuccess: 'The shipment is delivered. The Cartel is rich!',
		networkDismantled: 'Police raid! The network has been dismantled.',
		moleIdentified: 'Bang! The Sniper took out The Watcher.',
		moleHidden: 'Missed shot! The Watcher vanished into the crowd.'
	},

	meta: {
		description: 'Tropical social deduction game of heist and corruption'
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
		cancel: 'Cancel',
		chooseRestartType: 'How to restart?',
		freshStart: 'New game',
		samePlayers: 'Same players'
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

	pwa: {
		install: 'Install game',
		installTitle: 'Install Isla Plomo',
		step1: 'Tap the Share button',
		step2: "Select 'Add to Home Screen'",
		understood: 'Got it'
	},

	desktopBlocker: {
		title: 'Mobile only',
		subtitle: 'Open this page on your phone to play.'
	},

	nightNarration: {
		chooseMode: 'How to announce the night?',
		audioMode: 'Audio Narration',
		manualMode: 'Manual Narrator',
		listening: 'Listen carefully...'
	},

	nightPhase: {
		title: 'Curfew',
		everyoneCloseEyes: 'Close your eyes. Night falls on Isla Plomo.',
		evilOpenEyes: 'Undercover Cops open your eyes.',
		evilIdentify: 'Look at your corrupt colleagues.',
		evilCloseEyes: 'Cops close your eyes.',
		evilThumbsUp: 'Cops raise your thumbs.',
		merlinOpenEyes: 'The Watcher (El Vigía) opens your eyes.',
		merlinSeeEvil: "Memorize the cops' faces.",
		merlinCloseEyes: 'The Watcher closes your eyes.',
		evilThumbsDown: 'Cops lower your thumbs.',
		everyoneOpenEyes: 'Everyone open your eyes.',
		gameCanStart: 'Business starts now.',
		next: 'Next',
		startGame: 'Start'
	},

	help: {
		title: 'Game Rules',
		close: 'Close',
		objective: {
			title: 'Objective',
			good: 'El Cartel must succeed in 3 out of 5 operations',
			evil: 'The Police must seize 3 operations'
		},
		teams: {
			title: 'The teams',
			goodDesc: 'El Cartel (locals): Soldados + The Watcher',
			evilDesc: 'The Police (undercovers): Undercovers + Sniper'
		},
		rolesTitle: 'The roles',
		rolesDesc: {
			loyalist: "El Soldado: Loyal trafficker, doesn't know anyone",
			merlin: 'The Watcher: Informant, knows all cops',
			spy: 'Undercover: Undercover cop, knows other cops',
			assassin: 'The Sniper: Can shoot The Watcher if Cartel wins'
		},
		gameplay: {
			title: 'Operation flow',
			step1: 'El Jefe proposes a crew',
			step2: 'Show of hands vote (sí/no)',
			step3: 'If approved: secret mission vote',
			step4: '1 seizure = operation failed (except Operation 4 with 7+ players: 2 required)'
		},
		specialRules: {
			title: 'Special rules',
			rule1: '5 consecutive rejections = Gang war (Police wins)',
			rule2: 'Locals CAN vote seize to bluff (risky!)',
			rule3: 'If Cartel wins with special roles, the Sniper can turn the tables by shooting The Watcher'
		}
	}
};
