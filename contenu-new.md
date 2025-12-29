# Contenu Thématique - ISLA PLOMO

Ce fichier liste TOUS les éléments thématiques du jeu adaptés pour l'univers "Isla Plomo".

> **Note:** Le code utilise des noms génériques (`good`/`evil`, `loyalist`/`merlin`/`spy`/`assassin`) en interne. Les noms thématiques ci-dessous remplacent l'affichage.

---

## 1. IDENTITÉ DU JEU

### Nom et Slogan

| Élément | Valeur (Thème Isla Plomo) | Fichier |
|---------|---------------------------|---------|
| Nom du jeu | `Isla Plomo` | `static/manifest.json`, `src/lib/i18n/locales/*.ts` |
| Slogan FR | `Plata o Plomo` | `src/lib/i18n/locales/fr.ts` |
| Slogan EN | `Plata o Plomo` | `src/lib/i18n/locales/en.ts` |
| Description FR | `Jeu de bluff tropical et de corruption pour 5-10 joueurs` | `static/manifest.json` |
| Description EN | `Tropical social deduction game of heist and corruption` | `src/lib/i18n/locales/en.ts` |

---

## 2. RÔLES

### Structure des rôles

| Type interne | Équipe | Rôle thématique | Concept |
|--------------|--------|-----------------|---------|
| `loyalist` | `good` | El Soldado | Trafiquant local "Chill" |
| `merlin` | `good` | El Vigía | L'Informateur (sait tout) |
| `spy` | `evil` | L'Infiltré | Flic sous couverture |
| `assassin` | `evil` | Le Sniper | Tireur d'élite de la police |

### Équipe Good (Le Cartel - Les Locaux)

| Rôle interne | Nom FR | Nom EN | Description FR | Description EN |
|--------------|--------|--------|----------------|----------------|
| `loyalist` | `El Soldado` | `El Soldado` | Trafiquant local cool. Assurez-vous que la marchandise passe pour gagner. | Laid-back local trafficker. Ensure the contraband gets through to win. |
| `merlin` | `El Vigía` | `The Watcher` | L'informateur. Vous connaissez les flics infiltrés, mais attention au Sniper. | The Informant. You know the undercover cops, but watch out for the Sniper. |

**Fichiers:** `src/lib/i18n/locales/fr.ts` et `en.ts`

### Équipe Evil (La Police - Les Infiltrés)

| Rôle interne | Nom FR | Nom EN | Description FR | Description EN |
|--------------|--------|--------|----------------|----------------|
| `spy` | `Infiltré` | `Undercover` | Flic sous couverture. Sabotez les livraisons et faites tomber le réseau. | Undercover cop. Sabotage the shipments and take down the network. |
| `assassin` | `Le Sniper` | `The Sniper` | Si le Cartel gagne 3 livraisons, abattez El Vigía pour voler la victoire. | If the Cartel wins 3 shipments, shoot The Watcher to steal the victory. |

**Fichiers:** `src/lib/i18n/locales/fr.ts` et `en.ts`

---

## 3. ÉQUIPES

| Type interne | Nom FR | Nom EN | Variable CSS | Couleur |
|--------------|--------|--------|--------------|---------|
| `good` | `El Cartel` | `El Cartel` | `--color-good` | `#00E676` (Vert tropical néon) |
| `evil` | `La Policía` | `The Police` | `--color-evil` | `#2979FF` (Bleu gyrophare) |

**Fichiers:** `src/lib/i18n/locales/*.ts` et `src/app.css`

---

## 4. TERMES DE JEU

### Actions

| Terme FR | Terme EN | Contexte |
|----------|----------|----------|
| `Opération` | `Operation` | Phase principale (Mission) |
| `Saisie Policière` | `Police Raid` | Vote secret négatif (Sabotage) |
| `Livraison` | `Delivery` | Vote secret positif (Réussite) |
| `Crew` | `Crew` | Groupe sélectionné |
| `El Jefe` | `El Jefe` | Joueur qui propose l'équipe |

### Phases

| Phase FR | Phase EN | Description |
|----------|----------|-------------|
| `Couvre-feu` | `Curfew` | Phase de nuit (début) |
| `Interrogatoire` | `Interrogation` | Tentative de tir du Sniper |

### Messages de fin de partie

| ID | Message FR | Message EN |
|----|------------|------------|
| `paralyzed` | `Guerre des gangs : Le Cartel s'est entretué (5 équipes refusées)` | `Gang war: The Cartel destroyed itself (5 crews rejected)` |
| `operationsSuccess` | `La marchandise a été livrée. Le Cartel est riche !` | `The shipment is delivered. The Cartel is rich!` |
| `networkDismantled` | `Descente de police ! Le réseau est démantelé.` | `Police raid! The network has been dismantled.` |
| `merlinIdentified` | `Pan ! Le Sniper a abattu l'Informateur.` | `Bang! The Sniper took out The Watcher.` |
| `merlinHidden` | `Tir manqué ! L'Informateur s'est fondu dans la foule.` | `Missed shot! The Watcher vanished into the crowd.` |

---

## 5. TEXTES D'INTERFACE

### Écran d'accueil

| Élément | FR | EN |
|---------|----|----|
| Titre | `Isla Plomo` | `Isla Plomo` |
| Sous-titre | `Plata o Plomo` | `Plata o Plomo` |
| Info joueurs | `5-10 gangsters` | `5-10 gangsters` |
| Info téléphone | `Un seul téléphone` | `One phone only` |
| Bouton | `Entrer dans l'île` | `Enter the island` |

### Configuration

| Élément | FR | EN |
|---------|----|----|
| Titre | `Briefing` | `Briefing` |
| Nombre joueurs | `Trafiquants présents` | `Traffickers present` |
| Répartition | `{good} Locaux vs {evil} Infiltrés` | `{good} Locals vs {evil} Undercovers` |
| Rôles spéciaux | `Spécialistes` | `Specialists` |

### Phase de nuit (Couvre-feu)

| Élément | FR | EN |
|---------|----|----|
| Titre | `Couvre-feu` | `Curfew` |
| Instruction 1 | `Fermez les yeux. La nuit tombe sur Isla Plomo.` | `Close your eyes. Night falls on Isla Plomo.` |
| Instruction 2 | `Les Flics Infiltrés ouvrent les yeux.` | `Undercover Cops open your eyes.` |
| Instruction 3 | `Regardez vos collègues corrompus.` | `Look at your corrupt colleagues.` |
| Instruction 4 | `Les Flics ferment les yeux.` | `Cops close your eyes.` |
| Instruction 5 | `Les Flics lèvent le pouce.` | `Cops raise your thumbs.` |
| Instruction 6 | `L'Informateur (El Vigía) ouvre les yeux.` | `The Watcher (El Vigía) opens your eyes.` |
| Instruction 7 | `Mémorisez les visages des flics.` | `Memorize the cops' faces.` |
| Instruction 8 | `L'Informateur ferme les yeux.` | `The Watcher closes your eyes.` |
| Instruction 9 | `Les Flics baissent le pouce.` | `Cops lower your thumbs.` |
| Instruction 10 | `Tout le monde ouvre les yeux.` | `Everyone open your eyes.` |
| Instruction 11 | `Le business commence maintenant.` | `Business starts now.` |

### Sélection d'équipe

| Élément | FR | EN |
|---------|----|----|
| Titre | `Opération {n}` | `Operation {n}` |
| Instruction | `El Jefe {name} choisit {count} hommes` | `El Jefe {name} picks {count} men` |
| Info sabotage | `1 flic suffit pour saisir la drogue` | `1 cop is enough to seize the drugs` |
| Bouton | `Proposer ce Crew` | `Propose this Crew` |

### Vote d'équipe

| Élément | FR | EN |
|---------|----|----|
| Titre | `Conseil du Cartel` | `Cartel Council` |
| Équipe proposée | `Le Crew proposé :` | `Proposed Crew:` |
| Instruction | `On valide ce plan ? Vote à main levée.` | `Do we trust this plan? Show of hands.` |
| Bouton accepter | `Validé (Sí)` | `Approved (Sí)` |
| Bouton refuser | `Refusé (No)` | `Rejected (No)` |

### Vote secret (La Mission)

| Élément | FR | EN |
|---------|----|----|
| Instruction | `Tu livres ou tu balances aux flics ?` | `Deliver or rat to the cops?` |
| Bouton réussite | `Livrer (Plata)` | `Deliver (Plata)` |
| Bouton sabotage | `Saisir (Plomo)` | `Seize (Plomo)` |
| Astuce | `Les locaux peuvent saboter pour bluffer (risqué).` | `Locals can sabotage to bluff (risky).` |

### Résultat de mission

| Élément | FR | EN |
|---------|----|----|
| Succès | `Opération Réussie !` | `Operation Successful!` |
| Échec | `Opération Saisie !` | `Operation Seized!` |
| Label réussites | `Livraisons` | `Deliveries` |
| Label sabotages | `Saisies` | `Seizures` |

### Phase d'accusation (Le Sniper)

| Élément | FR | EN |
|---------|----|----|
| Titre | `L'Interrogatoire` | `The Interrogation` |
| Introduction | `Le Cartel a gagné, mais le Sniper est en position.` | `The Cartel won, but the Sniper is in position.` |
| Instruction | `Les flics discutent : Qui est la balance ?` | `Cops discuss: Who is the rat?` |
| Question | `Qui est l'Informateur ?` | `Who is The Watcher?` |
| Bouton | `Tirer sur ce joueur` | `Shoot this player` |

---

## 6. COULEURS (CSS)

| Variable | Valeur (Isla Plomo) | Usage |
|----------|---------------------|-------|
| `--color-bg` | `#1a1025` | Fond (Violet nuit profonde) |
| `--color-surface` | `#2d1b3e` | Cartes (Violet désaturé) |
| `--color-accent` | `#ff6d00` | Orange Sunset (Boutons principaux) |
| `--color-text` | `#fff8e1` | Blanc cassé (couleur sable) |
| `--color-success` | `#00e676` | Vert néon (Succès/Cartel) |
| `--color-danger` | `#ff1744` | Rouge sang (Échec/Police) |
| `--color-good` | `#00e676` | Team Cartel |
| `--color-evil` | `#2979ff` | Team Police |

---

## 7. IMAGES ET ICÔNES

### Images de rôles (Format Portrait 9:16)

| Rôle interne | Nouveau Nom de Fichier | Description Visuelle |
|--------------|------------------------|----------------------|
| `loyalist` | `static/omerta/el-soldado.png` | Le local cool avec sa boombox |
| `merlin` | `static/omerta/el-vigia.png` | L'homme au costume lin et carnet |
| `spy` | `static/omerta/el-infiltrado.png` | Le flic stressé au bureau |
| `assassin` | `static/omerta/el-sniper.png` | Le tireur tactique |

### Icônes d'équipe

| Équipe | Fichier | Description |
|--------|---------|-------------|
| `good` | `static/omerta/icon-cartel.png` | Crâne + Bandana + Machettes |
| `evil` | `static/omerta/icon-police.png` | Insigne de police usé |

### Icônes de vote et Statut

| Action | Fichier | Description |
|--------|---------|-------------|
| Réussite | `static/omerta/icon-loot.png` | Sac de billets et or |
| Échec/Sabotage | `static/omerta/icon-jail.png` | Mains menottées et barreaux |
| Logo | `static/logo.png` | Typographie "ISLA PLOMO" |
| Background | `static/omerta/background-slum.png` | Slum tropical flouté au coucher du soleil |

---