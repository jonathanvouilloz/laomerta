<script lang="ts">
	import { gameStore, currentMission } from '$lib/stores/gameStore';
	import { t } from '$lib/i18n';
	import Card from '$lib/components/ui/Card.svelte';

	let { goodScore, evilScore, missions, consecutiveRejections } = $derived($gameStore);
</script>

<div class="board">
	<!-- Scores - Hors de la Card -->
	<div class="scores">
		<div class="score-icon score-icon-good">
			<img src="/isla-plomo/icon-good.webp" alt="Good" />
			<span class="score-value">{goodScore}</span>
		</div>
		<div class="vs">
			<span class="vs-text">VS</span>
		</div>
		<div class="score-icon score-icon-bad">
			<img src="/isla-plomo/icon-bad.webp" alt="Evil" />
			<span class="score-value">{evilScore}</span>
		</div>
	</div>

	<!-- Card avec missions et info -->
	<Card variant="elevated" padding="lg">
		<!-- Mission Indicators -->
		<div class="missions">
			{#each missions as mission, i}
				{@const isCurrent = !mission.result.completed && i === $gameStore.currentMissionIndex}
				{@const isPending = !mission.result.completed && i !== $gameStore.currentMissionIndex}
				<div class="mission-slot">
					<div
						class="mission-badge"
						class:current={isCurrent}
						class:pending={isPending}
					>
						{#if mission.result.completed}
							<img
								src="/isla-plomo/{mission.result.success ? 'icon-good' : 'icon-bad'}.webp"
								alt=""
								class="badge-icon"
							/>
						{:else}
							<img
								src="/mission-badge.webp"
								alt=""
								class="badge-icon"
							/>
						{/if}
						{#if mission.requiredFailures === 2 && !mission.result.completed}
							<span class="mission-special">!</span>
						{/if}
					</div>
					<span class="mission-size">{mission.teamSize}</span>
				</div>
			{/each}
		</div>

		<!-- Divider -->
		<div class="divider"></div>

		<!-- Info: Compteur de rejets (toujours visible) -->
		<div class="info">
			<p class="rejections" class:danger={consecutiveRejections >= 4}>
				{$t.missionBoard.consecutiveRejections(consecutiveRejections)}
			</p>
		</div>
	</Card>
</div>

<style>
	.board {
		margin-bottom: var(--spacing-lg);
		margin-left: calc(-1 * var(--spacing-xl));
		margin-right: calc(-1 * var(--spacing-xl));
		padding-left: var(--spacing-sm);
		padding-right: var(--spacing-sm);
	}

	/* Override Card styles for square look */
	.board :global(.card) {
		border-radius: 0;
		border: none;
	}

	/* === SCORES === */
	.scores {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-lg);
		width: 100%;
		margin-bottom: var(--spacing-lg);
	}

	.score-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.score-icon img {
		width: 6rem;
		height: auto;
		display: block;
		border-radius: var(--radius-lg);
	}

	.score-value {
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--color-text);
	}

	.vs {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 var(--spacing-sm);
	}

	.vs-text {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		color: var(--color-text-muted);
	}

	/* === MISSIONS === */
	.missions {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--spacing-lg);
	}

	.mission-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.mission-badge {
		position: relative;
		width: 4rem;
		height: 4rem;
	}

	.badge-icon {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: filter 200ms ease, opacity 200ms ease, transform 200ms ease;
	}

	/* État: Pending (future) */
	.mission-badge.pending .badge-icon {
		filter: grayscale(0.7) brightness(0.5);
		opacity: 0.6;
	}

	/* État: Current (en cours) */
	.mission-badge.current .badge-icon {
		animation: currentPulse 2.5s ease-in-out infinite;
		filter: drop-shadow(0 0 6px rgba(255, 109, 0, 0.5));
	}

	@keyframes currentPulse {
		0%, 100% {
			transform: scale(1);
			filter: drop-shadow(0 0 6px rgba(255, 109, 0, 0.5));
		}
		50% {
			transform: scale(1.03);
			filter: drop-shadow(0 0 10px rgba(255, 109, 0, 0.6));
		}
	}

	/* Badge spécial (mission 4 avec 2 sabotages requis) */
	.mission-special {
		position: absolute;
		top: -4px;
		right: -4px;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--color-warning);
		color: var(--color-bg);
		font-size: 10px;
		font-weight: var(--font-weight-bold);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow-sm);
		z-index: 2;
	}

	/* Taille de l'équipe */
	.mission-size {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
	}

	.mission-badge.pending + .mission-size {
		color: var(--color-text-muted);
	}

	/* === DIVIDER === */
	.divider {
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-border), transparent);
		margin-bottom: var(--spacing-md);
	}

	/* === INFO === */
	.info {
		text-align: center;
	}

	.rejections {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: var(--font-weight-medium);
		transition: color 200ms ease;
	}

	.rejections.danger {
		color: var(--color-danger);
	}
</style>
