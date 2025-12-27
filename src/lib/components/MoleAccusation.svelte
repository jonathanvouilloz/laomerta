<script lang="ts">
	import type { Player } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		players: Player[];
		onAccuse: (playerId: string) => void;
	}

	let { players, onAccuse }: Props = $props();

	let selectedId: string | null = $state(null);

	// Filtrer pour n'afficher que les membres de La Famiglia (suspects potentiels)
	const suspects = $derived(players.filter((p) => p.team === 'famiglia'));
</script>

<div class="accusation">
	<!-- Dramatic Background -->
	<div class="atmosphere"></div>

	<!-- Header -->
	<div class="header anim-slide-down">
		<h2 class="title">{$t.accusation.title}</h2>
		<p class="subtitle">{$t.accusation.mafiaWon}</p>
	</div>

	<!-- Instruction Card -->
	<div class="section anim-fade-in" style="--delay: 100ms">
		<Card variant="elevated" accent="police" padding="md">
			<p class="instruction">
				{$t.accusation.instruction} <strong class="highlight">{$t.roles.taupe.name}</strong>.
			</p>
		</Card>
	</div>

	<!-- Suspects List -->
	<div class="section anim-fade-in" style="--delay: 200ms">
		<Card variant="default" padding="lg">
			<p class="section-label">{$t.accusation.whoIsMole}</p>
			<div class="suspects">
				{#each suspects as player, i}
					<button
						class="suspect-btn"
						class:selected={selectedId === player.id}
						onclick={() => (selectedId = player.id)}
						style="--delay: {250 + i * 50}ms"
					>
						<span class="suspect-name">{player.name}</span>
						<span class="suspect-indicator" class:active={selectedId === player.id}>
							{#if selectedId === player.id}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							{/if}
						</span>
					</button>
				{/each}
			</div>
		</Card>
	</div>

	<div class="spacer"></div>

	<!-- Action -->
	<div class="action anim-slide-up" style="--delay: 400ms">
		<CornerButton
			team="police"
			disabled={!selectedId}
			onclick={() => selectedId && onAccuse(selectedId)}
		>
			{$t.accusation.accuse}
		</CornerButton>
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
		margin-bottom: var(--spacing-lg);
	}

	.title {
		font-size: var(--text-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.subtitle {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		margin: 0;
	}

	/* === SECTIONS === */
	.section {
		position: relative;
		z-index: 1;
		margin-bottom: var(--spacing-md);
	}

	.section-label {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--spacing-md) 0;
	}

	/* === INSTRUCTION === */
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

	/* === SUSPECTS === */
	.suspects {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.suspect-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md) var(--spacing-lg);
		background: linear-gradient(
			135deg,
			rgba(31, 43, 71, 0.8) 0%,
			rgba(22, 33, 62, 0.9) 100%
		);
		border: 2px solid var(--color-surface-light);
		border-radius: var(--radius-md);
		color: var(--color-text);
		font-family: var(--font-family);
		font-size: var(--text-base);
		cursor: pointer;
		transition:
			border-color 200ms ease,
			background-color 200ms ease,
			transform 200ms var(--ease-out-expo),
			box-shadow 200ms ease;
		animation: suspectIn 400ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: translateX(-10px);
	}

	@keyframes suspectIn {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.suspect-btn:hover {
		border-color: var(--color-warning);
		transform: translateX(4px);
	}

	.suspect-btn.selected {
		background: linear-gradient(135deg, var(--color-warning) 0%, #d68910 100%);
		border-color: var(--color-warning);
		box-shadow: var(--shadow-md), 0 0 20px rgba(243, 156, 18, 0.3);
	}

	.suspect-name {
		font-weight: var(--font-weight-medium);
	}

	.suspect-indicator {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 2px solid var(--color-surface-light);
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			border-color 200ms ease,
			background-color 200ms ease;
	}

	.suspect-indicator.active {
		background: var(--color-bg);
		border-color: var(--color-bg);
		color: var(--color-warning);
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
