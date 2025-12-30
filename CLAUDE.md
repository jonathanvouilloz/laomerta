# Isla Plomo - Guide Claude Code

## Contexte du projet

Jeu de déduction sociale pour 5-10 joueurs, jouable sur un seul téléphone qu'on se passe.
Inspiré de "The Resistance: Avalon" avec un twist tropical : le Cartel = gentils, la Police = méchants.

## Stack technique

- **Framework** : SvelteKit (mode SPA/static)
- **Langage** : TypeScript
- **Styling** : CSS custom avec thème tropical violet
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
--color-bg: #1a1025;       /* Violet très sombre */
--color-surface: #2d1b3e;  /* Violet nuit */
--color-accent: #ff6d00;   /* Orange tropical */
--color-text: #fff8e1;     /* Blanc chaud */
--color-success: #00e676;  /* Vert néon */
--color-danger: #ff1744;   /* Rouge */
--color-good: #ff6d00;     /* Orange (Cartel) */
--color-evil: #0092ff;     /* Bleu (Police) */
```

## Points d'attention

- Mobile-first : l'app sera principalement utilisée sur téléphone
- Les membres du Cartel PEUVENT voter Sabotage pour bluffer (choix de design voulu)
- Mission 4 à 7+ joueurs nécessite 2 sabotages pour échouer
- La Taupe (The Watcher) et le Sniper remplacent (ne s'ajoutent pas) des rôles de base

## Fichiers de référence

- `omerta-specs.md` : Cahier des charges complet (historique)
