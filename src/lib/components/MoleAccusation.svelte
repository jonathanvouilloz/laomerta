<script lang="ts">
	import type { Player } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import TextButton from '$lib/components/ui/TextButton.svelte';

	interface Props {
		players: Player[];
		onAccuse: (playerId: string) => void;
	}

	let { players, onAccuse }: Props = $props();

	let selectedId: string | null = $state(null);

	// Filtrer pour n'afficher que les membres de l'équipe Good (suspects potentiels)
	const suspects = $derived(players.filter((p) => p.team === 'good'));
</script>

<div class="accusation">
	<!-- Dramatic Background -->
	<div class="atmosphere"></div>

	<!-- Header -->
	<div class="header anim-slide-down">
		<h2 class="title">{$t.accusation.title}</h2>
		<p class="subtitle">{$t.accusation.mafiaWon}</p>
	</div>

	<!-- Instruction Banner -->
	<div class="banner anim-fade-in" style="--delay: 100ms">
		<p class="instruction">
			{$t.accusation.instruction} <strong class="highlight">{$t.roles.merlin.name}</strong>.
		</p>
	</div>

	<!-- Suspects List -->
	<div class="suspects-section anim-fade-in" style="--delay: 200ms">
		<p class="section-label">{$t.accusation.whoIsMole}</p>
		<div class="suspects">
			{#each suspects as player, i}
				<button
					class="suspect-board"
					class:selected={selectedId === player.id}
					onclick={() => (selectedId = player.id)}
					style="--delay: {250 + i * 50}ms"
				>
					<span class="suspect-name">{player.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="spacer"></div>

	<!-- Action -->
	<div class="action anim-slide-up" style="--delay: 400ms">
		<TextButton
			size="medium"
			disabled={!selectedId}
			onclick={() => selectedId && onAccuse(selectedId)}
		>
			{$t.accusation.accuse}
		</TextButton>
	</div>
</div>

<style>
	.accusation {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: var(--spacing-lg);
		overflow: hidden;
	}

	/* === ATMOSPHERE === */
	.atmosphere {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(233, 69, 96, 0.15) 0%,
			transparent 50%
		);
		pointer-events: none;
	}

	/* === HEADER === */
	.header {
		position: relative;
		z-index: 1;
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.title {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		color: var(--color-text);
		margin: 0 0 var(--spacing-sm) 0;
	}

	.subtitle {
		font-size: var(--text-base);
		color: var(--color-text);
		margin: 0;
	}

	/* === BANNER === */
	.banner {
		position: relative;
		z-index: 1;
		background: #000;
		width: 100vw;
		margin-left: calc(-1 * var(--spacing-lg));
		padding: var(--spacing-md) var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.instruction {
		text-align: center;
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.5;
	}

	.highlight {
		color: var(--color-warning);
		font-weight: var(--font-weight-bold);
	}

	/* === SUSPECTS SECTION === */
	.suspects-section {
		position: relative;
		z-index: 1;
		margin-bottom: var(--spacing-md);
	}

	.section-label {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: center;
		margin: 0 0 var(--spacing-md) 0;
	}

	/* === SUSPECTS === */
	.suspects {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.suspect-board {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md) var(--spacing-lg);
		background: url('/board-crew.webp') center/contain no-repeat;
		border: none;
		border-radius: 0;
		cursor: pointer;
		aspect-ratio: 820/200;
		max-height: 60px;
		transition: filter 200ms ease, transform 200ms var(--ease-out-expo);
		animation: boardIn 400ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: translateX(-10px);
	}

	@keyframes boardIn {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.suspect-board:hover {
		filter: brightness(1.1);
		transform: scale(1.02);
	}

	.suspect-board.selected {
		filter: brightness(1.2) drop-shadow(0 0 8px var(--color-accent));
	}

	.suspect-name {
		font-family: 'Swash Break', var(--font-display);
		font-size: var(--text-2xl);
		color: #3d2a1a;
		text-transform: uppercase;
	}

	/* === SPACER === */
	.spacer {
		flex: 1;
		min-height: var(--spacing-lg);
	}

	/* === ACTION === */
	.action {
		position: relative;
		z-index: 1;
	}

	/* === ANIMATIONS === */
	.anim-slide-down {
		animation: slideDown 500ms var(--ease-out-expo) forwards;
		opacity: 0;
	}

	@keyframes slideDown {
		0% {
			opacity: 0;
			transform: translateY(-16px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.anim-fade-in {
		animation: fadeIn 500ms ease forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes fadeIn {
		to { opacity: 1; }
	}

	.anim-slide-up {
		animation: slideUp 500ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes slideUp {
		0% {
			opacity: 0;
			transform: translateY(16px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
