# Contenu Thématique - Éléments à Remplacer

Ce fichier liste TOUS les éléments thématiques du jeu qui peuvent être modifiés pour créer un nouveau thème, sans changer la mécanique de jeu.

> **Note:** Le code utilise des noms génériques (`good`/`evil`, `loyalist`/`merlin`/`spy`/`assassin`) en interne. Les noms thématiques affichés sont définis dans les fichiers de traduction.

---

## 1. IDENTITÉ DU JEU

### Nom et Slogan

| Élément | Valeur actuelle | Fichier |
|---------|-----------------|---------|
| Nom du jeu | `Omertà` | `static/manifest.json`, `src/lib/i18n/locales/*.ts` |
| Slogan FR | `La loi du silence` | `src/lib/i18n/locales/fr.ts` (ligne ~5) |
| Slogan EN | `The law of silence` | `src/lib/i18n/locales/en.ts` (ligne ~5) |
| Description FR | `Jeu de déduction sociale pour 5-10 joueurs` | `static/manifest.json` |
| Description EN | `Social deduction game for 5-10 players` | `src/lib/i18n/locales/en.ts` |

---

## 2. RÔLES

### Structure des rôles

| Type interne | Équipe | Rôle thématique actuel |
|--------------|--------|------------------------|
| `loyalist` | `good` | Mafioso (membre loyal) |
| `merlin` | `good` | La Taupe (voit les méchants) |
| `spy` | `evil` | Policier (infiltré) |
| `assassin` | `evil` | L'Enquêteur (peut identifier Merlin) |

### Équipe Good (Les "gentils" - doivent réussir les missions)

| Rôle interne | Nom FR | Nom EN | Description FR | Description EN |
|--------------|--------|--------|----------------|----------------|
| `loyalist` | `Mafioso` | `Mafioso` | Membre loyal de La Famiglia. Faites réussir les missions pour gagner. | Loyal member of La Famiglia. Make missions succeed to win. |
| `merlin` | `La Taupe` | `The Mole` | Vous connaissez l'identité de tous les méchants, mais ils ne vous connaissent pas. | You know the identity of all evil players, but they don't know you. |

**Fichiers:** `src/lib/i18n/locales/fr.ts` et `en.ts` (`roles.loyalist`, `roles.merlin`)

### Équipe Evil (Les "méchants" - doivent saboter les missions)

| Rôle interne | Nom FR | Nom EN | Description FR | Description EN |
|--------------|--------|--------|----------------|----------------|
| `spy` | `Policier` | `Cop` | Agent infiltré. Sabotez les missions. Vous connaissez les autres infiltrés. | Infiltrated agent. Sabotage missions. You know the other infiltrators. |
| `assassin` | `L'Enquêteur` | `The Investigator` | Si les gentils gagnent 3 missions, vous pouvez tenter d'identifier Merlin pour voler la victoire. | If good wins 3 missions, you can try to identify Merlin to steal victory. |

**Fichiers:** `src/lib/i18n/locales/fr.ts` et `en.ts` (`roles.spy`, `roles.assassin`)

---

## 3. ÉQUIPES

| Type interne | Nom FR | Nom EN | Variable CSS | Couleur |
|--------------|--------|--------|--------------|---------|
| `good` | `La Famiglia` | `La Famiglia` | `--color-good` | `#4ecca3` (vert menthe) |
| `evil` | `Les Flics` / `Les Policiers` | `The Cops` | `--color-evil` | `#e94560` (rouge sang) |

**Fichiers:**
- Noms: `src/lib/i18n/locales/*.ts` (`teams.good`, `teams.evil`)
- Couleurs: `src/app.css` (lignes ~15-16)

---

## 4. TERMES DE JEU

### Actions

| Terme FR | Terme EN | Contexte |
|----------|----------|----------|
| `Mission` | `Mission` | Phase principale du jeu |
| `Sabotage` | `Sabotage` | Vote secret négatif |
| `Réussite` | `Success` | Vote secret positif |
| `Équipe` | `Team` | Groupe sélectionné pour mission |
| `Chef d'équipe` | `Team leader` | Joueur qui propose l'équipe |

### Phases

| Phase FR | Phase EN | Description |
|----------|----------|-------------|
| `Phase de nuit` | `Night phase` | Identification des rôles au début |
| `Phase d'accusation` | `Accusation phase` | Tentative d'identifier Merlin |

### Messages de fin de partie

| ID | Message FR | Message EN |
|----|------------|------------|
| `paralyzed` | `La Famiglia est paralysée par la méfiance (5 équipes refusées)` | `La Famiglia is paralyzed by distrust (5 teams rejected)` |
| `operationsSuccess` | `Les opérations ont été un succès !` | `The operations were a success!` |
| `networkDismantled` | `Le réseau a été démantelé !` | `The network has been dismantled!` |
| `merlinIdentified` | `L'Enquêteur a identifié La Taupe !` | `The Investigator identified The Mole!` |
| `merlinHidden` | `L'Enquêteur s'est trompé ! La Taupe reste cachée.` | `The Investigator was wrong! The Mole remains hidden.` |

**Fichier:** `src/lib/i18n/locales/*.ts` (`winReasons.*`)

---

## 5. TEXTES D'INTERFACE

### Écran d'accueil

| Élément | FR | EN |
|---------|----|----|
| Titre | `Omertà` | `Omertà` |
| Sous-titre | `La loi du silence` | `The law of silence` |
| Info joueurs | `5-10 joueurs` | `5-10 players` |
| Info téléphone | `Un seul téléphone pour tous` | `One phone for everyone` |
| Bouton | `Nouvelle partie` | `New game` |

### Configuration

| Élément | FR | EN |
|---------|----|----|
| Titre | `Configuration` | `Setup` |
| Nombre joueurs | `Nombre de joueurs` | `Number of players` |
| Répartition | `{good} Mafiosi vs {evil} Policiers` | `{good} Mafiosi vs {evil} Cops` |
| Rôles spéciaux | `Rôles spéciaux` | `Special roles` |

### Phase de nuit

| Élément | FR | EN |
|---------|----|----|
| Titre | `Phase de nuit` | `Night phase` |
| Instruction 1 | `Tout le monde ferme les yeux` | `Everyone close your eyes` |
| Instruction 2 | `Les méchants ouvrent les yeux` | `Evil players open your eyes` |
| Instruction 3 | `Identifiez-vous entre vous` | `Identify each other` |
| Instruction 4 | `Les méchants ferment les yeux` | `Evil players close your eyes` |
| Instruction 5 | `Les méchants lèvent le pouce en l'air` | `Evil players raise your thumbs` |
| Instruction 6 | `Merlin ouvre les yeux` | `Merlin opens your eyes` |
| Instruction 7 | `Repérez les pouces levés - ce sont les méchants` | `Spot the raised thumbs - those are evil` |
| Instruction 8 | `Merlin ferme les yeux` | `Merlin closes your eyes` |
| Instruction 9 | `Les méchants baissent le pouce` | `Evil players lower your thumbs` |
| Instruction 10 | `Tout le monde ouvre les yeux` | `Everyone open your eyes` |
| Instruction 11 | `La partie peut commencer !` | `The game can begin!` |

### Sélection d'équipe

| Élément | FR | EN |
|---------|----|----|
| Titre | `Mission {n}` | `Mission {n}` |
| Instruction | `{name} choisit {count} membres` | `{name} selects {count} members` |
| Info sabotage (4+ joueurs) | `2 sabotages nécessaires pour échouer` | `2 sabotages required to fail` |
| Info sabotage (standard) | `1 sabotage suffit pour échouer` | `1 sabotage is enough to fail` |
| Bouton | `Proposer cette équipe` | `Propose this team` |

### Vote d'équipe

| Élément | FR | EN |
|---------|----|----|
| Titre | `Vote d'équipe` | `Team vote` |
| Équipe proposée | `Équipe proposée :` | `Proposed team:` |
| Instruction | `Votez à main levée. La majorité l'emporte.` | `Vote by show of hands. Majority wins.` |
| Avertissement | `Attention : {count}/5 refus consécutifs...` | `Warning: {count}/5 consecutive rejections...` |
| Bouton accepter | `Équipe acceptée` | `Approve team` |
| Bouton refuser | `Équipe refusée` | `Reject team` |

### Vote secret

| Élément | FR | EN |
|---------|----|----|
| Instruction | `Votre vote est secret. Que décidez-vous ?` | `Your vote is secret. What do you decide?` |
| Bouton réussite | `Réussite` | `Success` |
| Bouton sabotage | `Sabotage` | `Sabotage` |
| Astuce | `Astuce : Les loyalistes peuvent saboter pour bluffer...` | `Tip: Loyalists can sabotage to bluff...` |

### Résultat de mission

| Élément | FR | EN |
|---------|----|----|
| Succès | `Mission réussie !` | `Mission successful!` |
| Échec | `Mission échouée` | `Mission failed` |
| Label réussites | `Réussites` | `Successes` |
| Label sabotages | `Sabotages` | `Sabotages` |
| Info 2 sabotages | `Cette mission nécessitait 2 sabotages pour échouer` | `This mission required 2 sabotages to fail` |

### Phase d'accusation

| Élément | FR | EN |
|---------|----|----|
| Titre | `Phase d'accusation` | `Accusation phase` |
| Introduction | `Les gentils ont remporté 3 missions...` | `Good has won 3 missions...` |
| Instruction | `Les méchants discutent et désignent qui ils pensent être` | `Evil players discuss and point out who they think is` |
| Question | `Qui est Merlin ?` | `Who is Merlin?` |
| Bouton | `Accuser ce joueur` | `Accuse this player` |

### Fin de partie

| Élément | FR | EN |
|---------|----|----|
| Titre victoire | `Victoire` | `Victory` |
| Joueur accusé | `Joueur accusé :` | `Accused player:` |
| Nouvelle partie | `Nouvelle partie` | `New game` |
| Retour accueil | `Retour à l'accueil` | `Return to home` |

### Transitions

| Élément | FR | EN |
|---------|----|----|
| Passer téléphone | `Passe le téléphone à` | `Pass the phone to` |
| Je suis | `Je suis {name}` | `I am {name}` |
| Vote secret | `Vote secret - Passe le téléphone à` | `Secret vote - Pass the phone to` |
| Votes enregistrés | `Tous les votes sont enregistrés` | `All votes are recorded` |

### Divers

| Élément | FR | EN |
|---------|----|----|
| Compris | `J'ai compris` | `Got it` |
| Attendez | `Attendez ({seconds}s)` | `Wait ({seconds}s)` |
| Paramètres | `Paramètres` | `Settings` |
| Aide & Règles | `Aide & Règles` | `Help & Rules` |
| Installer le jeu | `Installer le jeu` | `Install game` |

**Fichier principal:** `src/lib/i18n/locales/fr.ts` et `en.ts`

---

## 6. COULEURS (CSS)

| Variable | Valeur actuelle | Usage |
|----------|-----------------|-------|
| `--color-bg` | `#0a0a0a` | Fond principal (noir pur) |
| `--color-surface` | `#121212` | Surfaces/cartes (gris très foncé) |
| `--color-accent` | `#e94560` | Couleur d'accent (rouge sang) |
| `--color-accent-dark` | `#c73e54` | Accent foncé |
| `--color-text` | `#eaeaea` | Texte principal (blanc cassé) |
| `--color-success` | `#4ecca3` | Succès (vert menthe) |
| `--color-success-dark` | `#3eb489` | Succès foncé |
| `--color-danger` | `#e94560` | Danger/erreur (rouge) |
| `--color-warning` | `#f39c12` | Avertissement (orange/or) |
| `--color-good` | `#4ecca3` | Équipe Good (vert) |
| `--color-evil` | `#e94560` | Équipe Evil (rouge) |

**Fichier:** `src/app.css` (lignes 1-20)

---

## 7. IMAGES ET ICÔNES

### Images de rôles (silhouettes)

| Rôle interne | Fichier |
|--------------|---------|
| `loyalist` | `static/omerta/the-loyalist.png` |
| `merlin` | `static/omerta/the-mole.png` |
| `spy` | `static/omerta/the-spy.png` |
| `assassin` | `static/omerta/the-assassin.png` |

### Icônes d'équipe

| Équipe | Fichier |
|--------|---------|
| `good` | `static/omerta/icon-good.png` |
| `evil` | `static/omerta/icon-evil.png` |

### Icônes de vote

| Action | Fichier |
|--------|---------|
| Réussite | `static/omerta/icon-success.png` |
| Échec/Sabotage | `static/omerta/icon-failure.png` |
| Approuver équipe | `static/omerta/icon-approve.png` |
| Rejeter équipe | `static/omerta/icon-reject.png` |

### Backgrounds

| Usage | Fichier |
|-------|---------|
| Desktop | `static/omerta/background.png` |
| Mobile | `static/omerta/background-mobile.png` |

### Logo et Favicon

| Usage | Fichier |
|-------|---------|
| Logo principal | `static/logo.png` |
| Favicon SVG | `static/favicon.svg` |
| Favicon ICO | `static/favicon.ico` |
| PWA Android 192px | `static/android-chrome-192x192.png` |
| PWA Android 512px | `static/android-chrome-512x512.png` |
| PWA iOS | `static/apple-touch-icon.png` |

---

## 8. MÉTADONNÉES PWA

**Fichier:** `static/manifest.json`

```json
{
  "name": "Omertà",
  "short_name": "Omertà",
  "description": "Jeu de déduction sociale pour 5-10 joueurs",
  "theme_color": "#1a1a2e",
  "background_color": "#1a1a2e"
}
```

---

## 9. TYPES TYPESCRIPT

**Fichier:** `src/lib/types/game.ts`

```typescript
// Équipes (génériques)
type Team = 'good' | 'evil';

// Rôles (génériques, basés sur Avalon)
type Role = 'loyalist' | 'merlin' | 'spy' | 'assassin';
```

> **Note:** Le code utilise des noms génériques. Les noms thématiques sont définis dans les fichiers i18n.

---

## 10. RÉSUMÉ PAR FICHIER

| Fichier | Éléments à modifier |
|---------|---------------------|
| `src/lib/i18n/locales/fr.ts` | Tous les textes FR affichés (~200 lignes) |
| `src/lib/i18n/locales/en.ts` | Tous les textes EN affichés (~200 lignes) |
| `src/app.css` | Palette de couleurs (~20 variables) |
| `static/manifest.json` | Nom, description, couleurs PWA |
| `static/omerta/*.png` | Toutes les images thématiques (~12 fichiers) |
| `static/*.png` | Logo et icônes PWA (~5 fichiers) |
| `static/favicon.*` | Favicons (~2 fichiers) |

> **Note:** Les fichiers TypeScript (`game.ts`, `gameStore.ts`, etc.) utilisent des noms génériques et n'ont **pas besoin** d'être modifiés pour un re-thème.

---

## CHECKLIST DE RE-THÈME

- [ ] Choisir un nouveau nom de jeu
- [ ] Définir les 2 équipes (noms + couleurs)
- [ ] Définir les 4 rôles (noms + descriptions)
- [ ] Modifier les textes FR dans `src/lib/i18n/locales/fr.ts`
- [ ] Modifier les textes EN dans `src/lib/i18n/locales/en.ts`
- [ ] Créer la nouvelle palette de couleurs dans `src/app.css`
- [ ] Créer les 4 images de rôles (`the-loyalist.png`, `the-mole.png`, `the-spy.png`, `the-assassin.png`)
- [ ] Créer les 2 icônes d'équipe (`icon-good.png`, `icon-evil.png`)
- [ ] Créer les icônes de vote
- [ ] Créer le nouveau background
- [ ] Créer le nouveau logo
- [ ] Générer les favicons et icônes PWA
- [ ] Mettre à jour `static/manifest.json`
- [ ] Tester sur mobile
