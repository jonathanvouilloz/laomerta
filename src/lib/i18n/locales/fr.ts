import type { Translations } from '../types';

export const fr: Translations = {
	home: {
		subtitle: 'La loi du silence',
		playerCount: '5-10 joueurs',
		singlePhone: 'Un seul téléphone pour tous',
		newGame: 'Nouvelle partie',
		credits: 'Inspiré par The Resistance: Avalon'
	},

	setup: {
		title: 'Configuration',
		playerCountLabel: 'Nombre de joueurs',
		mafiaVsPolice: (mafia, police) => `${mafia} Mafiosi vs ${police} Policiers`,
		playerNames: 'Noms des joueurs',
		playerPlaceholder: (n) => `Joueur ${n}`,
		specialRoles: 'Rôles spéciaux',
		notAvailable: (count) => `Non disponible à ${count} joueurs`,
		recommended: 'Recommandé',
		optional: 'Optionnel',
		showRoles: 'Voir les rôles',
		hideRoles: 'Masquer les rôles',
		startGame: 'Lancer la partie',
		back: 'Retour'
	},

	missionBoard: {
		famiglia: 'Famiglia',
		flics: 'Flics',
		teamLeader: "Chef d'équipe :",
		consecutiveRejections: (count) => `${count}/5 refus consécutifs`
	},

	teamSelection: {
		mission: (n) => `Mission ${n}`,
		leaderChooses: (name, count) => `${name} choisit ${count} membres`,
		requiredFailures: (count) =>
			count === 2 ? '2 sabotages requis pour échouer' : '1 sabotage suffit pour échouer',
		selected: (current, total) => `${current} / ${total} sélectionnés`,
		proposeTeam: 'Proposer cette équipe'
	},

	teamVote: {
		title: "Vote d'équipe",
		proposedTeam: 'Équipe proposée :',
		voteInstruction: "Votez à main levée. La majorité l'emporte.",
		rejectionWarning: (count) =>
			`Attention : ${count}/5 refus. Au 5e refus, les Flics gagnent !`,
		approve: 'Équipe acceptée',
		reject: 'Équipe refusée'
	},

	secretVote: {
		instruction: 'Votre vote est secret. Que décidez-vous ?',
		success: 'Réussite',
		sabotage: 'Sabotage',
		tip: "Astuce : Les Mafiosi peuvent saboter pour bluffer, mais c'est risqué !"
	},

	roleReveal: {
		policeAre: 'Les Policiers sont :',
		policeAllies: 'Vos alliés Policiers :',
		understood: "J'ai compris",
		wait: (seconds) => `Attendez (${seconds}s)`
	},

	missionResult: {
		success: 'Mission réussie !',
		failure: 'Mission échouée',
		successes: 'Réussites',
		sabotages: 'Sabotages',
		requiredTwo: 'Cette mission nécessitait 2 sabotages pour échouer',
		continue: 'Continuer'
	},

	accusation: {
		title: "Phase d'accusation",
		mafiaWon:
			"La Mafia a remporté 3 missions, mais L'Enquêteur peut encore retourner la situation !",
		instruction: 'Les Policiers discutent et désignent qui ils pensent être',
		whoIsMole: 'Qui est La Taupe ?',
		accuse: 'Accuser ce joueur'
	},

	gameEnd: {
		victory: 'Victoire',
		accusedPlayer: 'Joueur accusé :',
		roleReveal: 'Révélation des rôles',
		recap: 'Récapitulatif',
		missionSuccess: 'Réussie',
		missionFailed: 'Échouée',
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
		mafioso: {
			name: 'Mafioso',
			description:
				"Membre loyal de La Famiglia. Faites réussir les missions pour gagner. Vous pouvez voter Sabotage pour bluffer, mais c'est risqué !"
		},
		taupe: {
			name: 'La Taupe',
			description:
				"Mafioso infiltré dans la police. Vous connaissez l'identité de tous les Policiers. Restez cachée jusqu'à la fin !"
		},
		policier: {
			name: 'Policier',
			description:
				'Agent infiltré dans la Mafia. Sabotez les missions pour démanteler le réseau. Vous connaissez les autres Policiers.'
		},
		enqueteur: {
			name: "L'Enquêteur",
			description:
				'Policier spécial. Si la Mafia gagne 3 missions, vous aurez une chance de retourner la victoire en identifiant La Taupe !'
		}
	},

	teams: {
		famiglia: 'La Famiglia',
		police: 'Les Flics'
	},

	winReasons: {
		paralyzed: 'La Famiglia est paralysée par la méfiance (5 équipes refusées)',
		operationsSuccess: 'Les opérations ont été un succès !',
		networkDismantled: 'Le réseau a été démantelé !',
		moleIdentified: "L'Enquêteur a identifié La Taupe !",
		moleHidden: "L'Enquêteur s'est trompé ! La Taupe reste cachée."
	},

	meta: {
		description: 'Jeu de déduction sociale pour 5-10 joueurs'
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
		cancel: 'Annuler'
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
		installTitle: 'Installer Omertà',
		step1: 'Appuyez sur le bouton Partager',
		step2: "Sélectionnez « Sur l'écran d'accueil »",
		understood: 'Compris'
	},

	nightPhase: {
		title: 'Phase de nuit',
		everyoneCloseEyes: 'Tout le monde ferme les yeux',
		policeOpenEyes: 'Les Policiers ouvrent les yeux',
		policeIdentify: 'Identifiez-vous entre vous',
		policeCloseEyes: 'Les Policiers ferment les yeux',
		policeThumbsUp: 'Les Policiers lèvent le pouce en l\'air',
		moleOpenEyes: 'La Taupe ouvre les yeux',
		moleSeePolice: 'Repérez les pouces levés - ce sont les Policiers',
		moleCloseEyes: 'La Taupe ferme les yeux',
		policeThumbsDown: 'Les Policiers baissent le pouce',
		everyoneOpenEyes: 'Tout le monde ouvre les yeux',
		gameCanStart: 'La partie peut commencer !',
		next: 'Suivant',
		startGame: 'Commencer la partie'
	},

	help: {
		title: 'Règles du jeu',
		close: 'Fermer',
		objective: {
			title: 'But du jeu',
			famiglia: 'La Famiglia (Mafia) doit réussir 3 missions sur 5',
			police: 'Les Flics infiltrés doivent saboter 3 missions'
		},
		teams: {
			title: 'Les équipes',
			famigliaDesc: 'La Famiglia (gentils) : Mafiosi + La Taupe',
			policeDesc: 'Les Flics (méchants) : Policiers + Enquêteur'
		},
		rolesTitle: 'Les rôles',
		rolesDesc: {
			mafioso: 'Mafioso : Loyal à la famille, ne connaît personne',
			taupe: 'La Taupe : Mafioso infiltré, connaît tous les Policiers',
			policier: 'Policier : Agent infiltré, connaît les autres Policiers',
			enqueteur: "L'Enquêteur : Peut identifier La Taupe si la Mafia gagne"
		},
		gameplay: {
			title: "Déroulement d'une mission",
			step1: 'Le chef propose une équipe',
			step2: 'Vote à main levée (accepter/refuser)',
			step3: 'Si acceptée : vote secret de mission',
			step4: '1 sabotage = mission échouée (sauf Mission 4 à 7+ joueurs : 2 requis)'
		},
		specialRules: {
			title: 'Règles spéciales',
			rule1: '5 refus consécutifs = victoire des Flics',
			rule2: 'Les Mafiosi PEUVENT voter sabotage pour bluffer (risqué !)',
			rule3: "Si la Mafia gagne avec rôles spéciaux, l'Enquêteur peut retourner la victoire en identifiant La Taupe"
		}
	}
};
