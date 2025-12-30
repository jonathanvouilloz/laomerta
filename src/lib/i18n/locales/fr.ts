import type { Translations } from '../types';

export const fr: Translations = {
	home: {
		subtitle: 'Plata o Plomo',
		playerCount: '5-10 gangsters',
		singlePhone: 'Un seul téléphone',
		newGame: "Entrer dans l'île",
		credits: 'Inspiré par The Resistance: Avalon',
		inspired: 'Une réinterprétation de The Resistance'
	},

	setup: {
		title: 'Briefing',
		playerCountLabel: 'Trafiquants présents',
		goodVsEvil: (good, evil) => `${good} Locaux vs ${evil} Infiltrés`,
		playerNames: 'Noms des joueurs',
		playerPlaceholder: (n) => `Joueur ${n}`,
		specialRoles: 'Spécialistes',
		notAvailable: (count) => `Non disponible à ${count} joueurs`,
		recommended: 'Recommandé',
		optional: 'Optionnel',
		showRoles: 'Voir les rôles',
		hideRoles: 'Masquer les rôles',
		startGame: 'Lancer le business',
		back: 'Retour'
	},

	missionBoard: {
		good: 'Cartel',
		evil: 'Policía',
		teamLeader: 'El Jefe :',
		consecutiveRejections: (count) => `${count}/5 refus consécutifs`
	},

	teamSelection: {
		mission: (n) => `Opération ${n}`,
		leaderChooses: (name, count) => `El Jefe ${name} choisit ${count} hommes`,
		requiredFailures: (count) =>
			count === 2 ? '2 flics requis pour saisir' : '1 flic suffit pour saisir la drogue',
		recruited: 'recrutés',
		proposeTeam: 'Proposer ce Crew'
	},

	teamVote: {
		title: 'Conseil du Cartel',
		proposedTeam: 'Le Crew proposé :',
		voteInstruction: 'On valide ce plan ? Vote à main levée.',
		rejectionWarning: (count) =>
			`Attention : ${count}/5 refus. Au 5e refus, guerre des gangs !`,
		approve: 'Validé (Sí)',
		reject: 'Refusé (No)'
	},

	secretVote: {
		instruction: 'Tu livres ou tu balances aux flics ?',
		success: 'Livrer (Plata)',
		sabotage: 'Saisir (Plomo)',
		tip: 'Les locaux peuvent saboter pour bluffer (risqué).'
	},

	roleReveal: {
		evilAre: 'Les Flics Infiltrés sont :',
		evilAllies: 'Vos collègues corrompus :',
		understood: "J'ai compris",
		wait: (seconds) => `Attendez (${seconds}s)`
	},

	missionResult: {
		success: 'Opération Réussie !',
		failure: 'Opération Saisie !',
		successes: 'Livraisons',
		sabotages: 'Saisies',
		requiredTwo: 'Cette opération nécessitait 2 saisies pour échouer',
		continue: 'Continuer'
	},

	accusation: {
		title: "L'Interrogatoire",
		mafiaWon:
			'Le Cartel a gagné, mais le Sniper est en position !',
		instruction: 'Les flics discutent : Qui est la balance ?',
		whoIsMole: "Qui est l'Informateur ?",
		accuse: 'Tirer sur ce joueur'
	},

	gameEnd: {
		victory: 'Victoire',
		winners: 'Les gagnants',
		losers: 'Les perdants',
		accusedPlayer: 'Cible abattue :',
		roleReveal: 'Révélation des rôles',
		recap: 'Récapitulatif',
		missionSuccess: 'Livrée',
		missionFailed: 'Saisie',
		newGame: 'Nouvelle partie',
		returnHome: "Retour à l'accueil"
	},

	transitions: {
		passPhone: 'Passe le téléphone à',
		iAm: (name) => `Je suis ${name}`,
		secretVotePass: 'Vote secret - Passe le téléphone à',
		nextPlayer: 'Passage au joueur suivant...',
		allVotesRecorded: 'Tous les votes sont enregistrés',
		seeResult: 'Voir le résultat'
	},

	roles: {
		loyalist: {
			name: 'El Soldado',
			description:
				'Trafiquant local cool. Assurez-vous que la marchandise passe pour gagner.'
		},
		merlin: {
			name: 'El Vigía',
			description:
				"L'informateur. Vous connaissez les flics infiltrés, mais attention au Sniper."
		},
		spy: {
			name: 'Infiltré',
			description:
				'Flic sous couverture. Sabotez les livraisons et faites tomber le réseau.'
		},
		assassin: {
			name: 'Le Sniper',
			description:
				"Si le Cartel gagne 3 livraisons, abattez l'Informateur pour voler la victoire."
		}
	},

	teams: {
		good: 'El Cartel',
		evil: 'La Policía'
	},

	winReasons: {
		paralyzed: "Guerre des gangs : Le Cartel s'est entretué (5 équipes refusées)",
		operationsSuccess: 'La marchandise a été livrée. Le Cartel est riche !',
		networkDismantled: 'Descente de police ! Le réseau est démantelé.',
		moleIdentified: "Pan ! Le Sniper a abattu l'Informateur.",
		moleHidden: "Tir manqué ! L'Informateur s'est fondu dans la foule."
	},

	meta: {
		description: 'Jeu de bluff tropical et de corruption pour 5-10 joueurs'
	},

	settings: {
		title: 'Paramètres',
		language: 'Langue',
		help: 'Aide & Règles',
		viewRules: 'Voir les règles',
		restart: 'Recommencer',
		newGame: 'Nouvelle partie',
		confirmRestart: 'Abandonner la partie en cours ?',
		confirm: 'Confirmer',
		cancel: 'Annuler',
		chooseRestartType: 'Recommencer comment ?',
		freshStart: 'Nouvelle partie',
		samePlayers: 'Mêmes joueurs'
	},

	credits: {
		title: 'Crédits',
		createdBy: 'Créé par',
		inspiredBy: 'Inspiré par',
		originalGame: 'The Resistance: Avalon',
		originalAuthor: 'Don Eskridge',
		technologies: 'Technologies',
		website: 'Site web',
		version: 'Version',
		back: 'Retour'
	},

	pwa: {
		install: 'Installer le jeu',
		installTitle: 'Installer Isla Plomo',
		step1: 'Appuyez sur le bouton Partager',
		step2: "Sélectionnez « Sur l'écran d'accueil »",
		understood: 'Compris'
	},

	desktopBlocker: {
		title: 'Jeu optimisé pour mobile',
		subtitle: 'Ouvre cette page sur ton téléphone pour jouer.'
	},

	nightPhase: {
		title: 'Couvre-feu',
		everyoneCloseEyes: 'Fermez les yeux. La nuit tombe sur Isla Plomo.',
		evilOpenEyes: 'Les Flics Infiltrés ouvrent les yeux.',
		evilIdentify: 'Regardez vos collègues corrompus.',
		evilCloseEyes: 'Les Flics ferment les yeux.',
		evilThumbsUp: 'Les Flics lèvent le pouce.',
		merlinOpenEyes: "L'Informateur (El Vigía) ouvre les yeux.",
		merlinSeeEvil: 'Mémorisez les visages des flics.',
		merlinCloseEyes: "L'Informateur ferme les yeux.",
		evilThumbsDown: 'Les Flics baissent le pouce.',
		everyoneOpenEyes: 'Tout le monde ouvre les yeux.',
		gameCanStart: 'Le business commence maintenant.',
		next: 'Suivant',
		startGame: 'Commencer'
	},

	help: {
		title: 'Règles du jeu',
		close: 'Fermer',
		objective: {
			title: 'But du jeu',
			good: 'El Cartel doit réussir 3 opérations sur 5',
			evil: 'La Policía infiltrée doit saisir 3 opérations'
		},
		teams: {
			title: 'Les équipes',
			goodDesc: 'El Cartel (locaux) : Soldados + El Vigía',
			evilDesc: 'La Policía (infiltrés) : Undercovers + Sniper'
		},
		rolesTitle: 'Les rôles',
		rolesDesc: {
			loyalist: 'El Soldado : Trafiquant loyal, ne connaît personne',
			merlin: 'El Vigía : Informateur, connaît tous les flics',
			spy: 'Infiltré : Flic sous couverture, connaît les autres flics',
			assassin: "Le Sniper : Peut abattre l'Informateur si le Cartel gagne"
		},
		gameplay: {
			title: "Déroulement d'une opération",
			step1: 'El Jefe propose un crew',
			step2: 'Vote à main levée (sí/no)',
			step3: 'Si accepté : vote secret de mission',
			step4: '1 saisie = opération échouée (sauf Opération 4 à 7+ joueurs : 2 requises)'
		},
		specialRules: {
			title: 'Règles spéciales',
			rule1: '5 refus consécutifs = Guerre des gangs (victoire Police)',
			rule2: 'Les locaux PEUVENT voter saisie pour bluffer (risqué !)',
			rule3: "Si le Cartel gagne avec rôles spéciaux, le Sniper peut retourner la victoire en abattant l'Informateur"
		}
	}
};
