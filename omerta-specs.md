# Omertà - Cahier des Charges

## Concept

Jeu de déduction sociale pour 5-10 joueurs, jouable sur un seul téléphone qu'on se passe. Inspiré des mécaniques de "The Resistance: Avalon" mais avec un thème Mafia vs Police inversé.

**Twist narratif** : La Mafia = les gentils (ils veulent faire réussir leurs opérations), la Police = les méchants (ils veulent démanteler le réseau).

---

## Les Camps

### La Famiglia (Gentils)
- **Mafiosi** : Membres loyaux de la famille. Ne connaissent pas l'identité des autres (sauf entre méchants).
- **La Taupe** (optionnel) : Mafioso infiltré dans la police. Connaît l'identité de tous les Policiers. Doit rester cachée jusqu'à la fin.

### Les Flics (Méchants)
- **Policiers** : Agents infiltrés. Se reconnaissent entre eux au début de la partie.
- **L'Enquêteur** (optionnel, nécessite La Taupe) : Policier spécial. Si la Mafia gagne 3 missions, il a une chance de retourner la victoire en identifiant La Taupe.

---

## Composition des équipes selon le nombre de joueurs

### Répartition des camps

| Joueurs | Mafiosi (Gentils) | Policiers (Méchants) |
|---------|-------------------|----------------------|
| 5       | 3                 | 2                    |
| 6       | 4                 | 2                    |
| 7       | 4                 | 3                    |
| 8       | 5                 | 3                    |
| 9       | 6                 | 3                    |
| 10      | 6                 | 4                    |

### Taille des équipes par mission

| Joueurs | Mission 1 | Mission 2 | Mission 3 | Mission 4 | Mission 5 |
|---------|-----------|-----------|-----------|-----------|-----------|
| 5       | 2         | 3         | 2         | 3         | 3         |
| 6       | 2         | 3         | 4         | 3         | 4         |
| 7       | 2         | 3         | 3         | 4*        | 4         |
| 8       | 3         | 4         | 4         | 5*        | 5         |
| 9       | 3         | 4         | 4         | 5*        | 5         |
| 10      | 3         | 4         | 4         | 5*        | 5         |

*Mission 4 à 7+ joueurs : nécessite 2 échecs pour faire échouer la mission (au lieu de 1).

### Rôles spéciaux selon le nombre de joueurs

| Joueurs | Rôles spéciaux | Recommandation |
|---------|----------------|----------------|
| 5       | Non disponibles | Base uniquement (équilibre trop serré) |
| 6       | Optionnels | Peut activer Taupe + Enquêteur |
| 7       | Recommandés | Taupe + Enquêteur conseillés |
| 8       | Recommandés | Taupe + Enquêteur conseillés |
| 9       | Recommandés | Taupe + Enquêteur conseillés |
| 10      | Recommandés | Taupe + Enquêteur conseillés |

**Important** : La Taupe **remplace** un Mafioso standard (pas en plus). L'Enquêteur **remplace** un Policier standard (pas en plus). L'équilibre des camps reste identique.

Exemple à 7 joueurs avec rôles spéciaux :
- 3 Mafiosi + 1 Taupe = 4 membres de La Famiglia
- 2 Policiers + 1 Enquêteur = 3 Flics

---

## Flow de l'application

### Phase 1 : Configuration de la partie
1. Écran d'accueil avec le nom "Omertà" et ambiance mafia
2. Saisie du nombre de joueurs (5-10)
3. Saisie des noms de chaque joueur
4. Option : activer/désactiver les rôles spéciaux (Taupe + Enquêteur)
   - À 5 joueurs : option grisée/désactivée avec message "Non recommandé à 5 joueurs"
   - À 6 joueurs : option disponible avec mention "Optionnel"
   - À 7+ joueurs : option disponible avec mention "Recommandé"
5. Bouton "Lancer la partie"

### Phase 2 : Distribution des rôles (téléphone qui passe)
1. Écran "Passe le téléphone à [Nom du joueur]"
2. Bouton "Je suis [Nom]" pour confirmer
3. Écran de révélation du rôle :
   - Affiche le rôle du joueur
   - Si Policier/Enquêteur : liste les autres policiers
   - Si Taupe : liste les policiers (qu'elle connaît car "infiltrée")
   - Si Mafioso simple : ne voit rien d'autre
4. Bouton "J'ai compris" (avec timer de 5 sec minimum pour éviter les clics accidentels)
5. Écran de transition (masque le rôle) avant de passer au joueur suivant
6. Répéter jusqu'à ce que tous les joueurs aient vu leur rôle

### Phase 3 : Jeu - Boucle des missions
Pour chaque mission (1 à 5) :

#### 3a. Constitution de l'équipe (à main levée)
- Afficher : numéro de mission, taille d'équipe requise, score actuel
- Le chef d'équipe actuel est affiché (tourne dans l'ordre des joueurs)
- Input : saisir les noms des membres choisis pour la mission
- Bouton "Proposer cette équipe"

#### 3b. Vote d'approbation de l'équipe (à main levée)
- L'app affiche l'équipe proposée
- Les joueurs votent à main levée (hors app)
- Input : "Équipe acceptée" ou "Équipe refusée"
- Si refusée : compteur de refus +1, passer au chef suivant
- Si 5 refus consécutifs : Les Flics gagnent automatiquement
- Si acceptée : passer au vote de mission

#### 3c. Vote de mission (téléphone qui passe - SECRET)
Pour chaque membre de l'équipe :
1. Écran "Passe le téléphone à [Membre de l'équipe]"
2. Bouton "Je suis [Nom]"
3. Écran de vote secret :
   - Rappel de son rôle
   - Deux boutons : "✓ Réussite" / "✗ Sabotage"
   - Note : Tous les joueurs peuvent voter Réussite ou Sabotage. Les Mafiosi peuvent saboter pour bluffer et semer le doute, mais c'est risqué !
4. Confirmation du vote (sans révéler le choix)
5. Écran de transition avant le membre suivant

#### 3d. Résultat de la mission
- Afficher le nombre de votes Réussite et Sabotage (mélangés, pas d'ordre)
- Règle : 1 Sabotage = mission échouée (sauf Mission 4 à 7+ joueurs : 2 sabotages requis)
- Animation de résultat : Succès (vert) ou Échec (rouge)
- Mettre à jour le score

### Phase 4 : Fin de partie

#### Si 3 missions réussies (Mafia en tête) :
- Si rôles spéciaux désactivés : Victoire de La Famiglia !
- Si Enquêteur actif : Phase d'accusation
  - Les Policiers discutent (hors app) pour identifier La Taupe
  - Input : sélectionner un joueur accusé d'être La Taupe
  - Révélation : Si c'est La Taupe → Victoire des Flics ! Sinon → Victoire de La Famiglia !

#### Si 3 missions échouées :
- Victoire des Flics ! Le réseau est démantelé.

#### Si 5 équipes refusées consécutivement :
- Victoire des Flics ! La Famiglia est paralysée par la méfiance.

### Phase 5 : Récapitulatif
- Révéler tous les rôles de tous les joueurs
- Afficher le résumé des missions
- Boutons : "Nouvelle partie" / "Retour à l'accueil"

---

## Écrans à créer

1. **Accueil** : Logo, titre "Omertà", bouton "Nouvelle partie"
2. **Config joueurs** : Nombre de joueurs, noms, options rôles spéciaux
3. **Transition joueur** : "Passe à [Nom]" + bouton confirmation
4. **Révélation rôle** : Rôle, informations secrètes, timer, bouton "Compris"
5. **Écran masqué** : Écran neutre entre deux joueurs
6. **Dashboard mission** : Score, mission actuelle, chef, taille équipe, compteur refus
7. **Saisie équipe** : Sélection des membres
8. **Vote équipe** : Affiche équipe, boutons Accepté/Refusé
9. **Vote mission secret** : Rappel rôle, boutons Réussite/Sabotage
10. **Résultat mission** : Nombre de chaque vote, résultat
11. **Accusation Taupe** : Sélection du suspect (si applicable)
12. **Fin de partie** : Vainqueur, révélation rôles, récap, rejouer

---

## Spécifications techniques

### Stack
- **Framework** : SvelteKit (mode SPA/static)
- **Styling** : CSS custom avec thème sombre/mafia (ou Tailwind si préféré)
- **State management** : Svelte stores
- **Déploiement** : Vercel ou Netlify (static export)
- **PWA** : Manifest + Service Worker pour installation sur téléphone

### Contraintes
- 100% client-side, pas de backend
- Responsive mobile-first (écran principal = téléphone)
- Pas de persistance nécessaire (partie = session unique)
- Les votes secrets ne doivent JAMAIS être loggués ou visibles dans la console

### Structure suggérée
```
src/
├── lib/
│   ├── stores/
│   │   └── gameStore.js      # État global de la partie
│   ├── utils/
│   │   ├── roles.js          # Logique de distribution des rôles
│   │   ├── missions.js       # Config missions selon nb joueurs
│   │   └── shuffle.js        # Mélange sécurisé
│   └── components/
│       ├── PlayerTransition.svelte
│       ├── RoleReveal.svelte
│       ├── MissionBoard.svelte
│       ├── SecretVote.svelte
│       └── ...
├── routes/
│   └── +page.svelte          # App single-page avec routing interne
└── app.html
```

### Palette de couleurs suggérée (thème Mafia)
- Background : #1a1a2e (bleu très sombre)
- Surface : #16213e (bleu nuit)
- Accent : #e94560 (rouge sang)
- Text : #eaeaea (blanc cassé)
- Success : #4ecca3 (vert menthe)
- Danger : #e94560 (rouge)

---

## Évolutions futures possibles (hors MVP)

- Mode multi-téléphones avec WebSocket
- Rôles additionnels (Percival → "L'Indic", Morgane → "L'Agent Double", Oberon → "Le Loup Solitaire", Mordred → "Le Parrain Fantôme")
- Historique des parties (localStorage)
- Thèmes visuels alternatifs
- Sons et vibrations
- Mode spectateur
- Timer pour les phases de discussion

---

## Commande pour initialiser le projet

```bash
npx sv create omerta
# Choisir : SvelteKit minimal, TypeScript (optionnel), pas de additional options
cd omerta
npm install
```

---

## Notes pour Claude Code

- Commencer par le gameStore et la logique de distribution des rôles
- Puis créer le flow écran par écran dans l'ordre du jeu
- Tester avec 5 joueurs fictifs d'abord
- S'assurer que les informations secrètes ne "fuient" jamais (pas de console.log des rôles, pas de stockage en clair)
- Les Mafiosi PEUVENT voter Sabotage pour bluffer (contrairement à Avalon original où les gentils ne peuvent pas) - c'est un choix de design voulu
