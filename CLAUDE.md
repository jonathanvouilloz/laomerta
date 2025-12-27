# Omertà - Guide Claude Code

## Contexte du projet

Jeu de déduction sociale pour 5-10 joueurs, jouable sur un seul téléphone qu'on se passe.
Inspiré de "The Resistance: Avalon" avec un twist : la Mafia = gentils, la Police = méchants.

## Stack technique

- **Framework** : SvelteKit (mode SPA/static)
- **Langage** : TypeScript
- **Styling** : CSS custom avec thème mafia sombre
- **State** : Svelte stores

## Règles de sécurité CRITIQUES

1. **JAMAIS de console.log** contenant des rôles, votes secrets ou informations sensibles
2. **Pas de stockage en clair** des secrets dans localStorage/sessionStorage
3. Les votes de mission sont secrets - ne jamais les exposer dans le DOM ou les DevTools

## Structure du projet

```
src/lib/
├── stores/gameStore.ts    # État global du jeu
├── types/game.ts          # Types TypeScript
├── utils/
│   ├── missions.ts        # Configuration des missions
│   ├── roles.ts           # Distribution des rôles
│   └── shuffle.ts         # Mélange sécurisé
└── components/            # Composants Svelte
```

## Conventions de code

- Utiliser TypeScript strict
- Composants Svelte en PascalCase
- Fonctions et variables en camelCase
- Types et interfaces avec préfixe explicite (ex: `GameState`, `PlayerRole`)

## Palette de couleurs

```css
--color-bg: #1a1a2e;       /* Bleu très sombre */
--color-surface: #16213e;  /* Bleu nuit */
--color-accent: #e94560;   /* Rouge sang */
--color-text: #eaeaea;     /* Blanc cassé */
--color-success: #4ecca3;  /* Vert menthe */
--color-danger: #e94560;   /* Rouge */
```

## Points d'attention

- Mobile-first : l'app sera principalement utilisée sur téléphone
- Les Mafiosi PEUVENT voter Sabotage pour bluffer (choix de design voulu)
- Mission 4 à 7+ joueurs nécessite 2 sabotages pour échouer
- La Taupe et l'Enquêteur remplacent (ne s'ajoutent pas) des rôles de base

## Fichiers de référence

- `omerta-specs.md` : Cahier des charges complet
