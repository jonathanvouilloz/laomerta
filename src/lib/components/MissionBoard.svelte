<script lang="ts">
	import { gameStore, currentMission, currentLeader } from '$lib/stores/gameStore';
	import { t } from '$lib/i18n';
	import Card from '$lib/components/ui/Card.svelte';

	let { goodScore, evilScore, missions, consecutiveRejections } = $derived($gameStore);
</script>

<div class="board">
	<!-- Scores - Hors de la Card -->
	<div class="scores">
		<div class="score-icon score-icon-good">
			<img src="/omerta/icon-good.webp" alt="Good" />
			<span class="score-value">{goodScore}</span>
		</div>
		<div class="vs">
			<span class="vs-text">VS</span>
		</div>
		<div class="score-icon score-icon-bad">
			<img src="/omerta/icon-bad.webp" alt="Evil" />
			<span class="score-value">{evilScore}</span>
		</div>
	</div>

	<!-- Card avec missions et info -->
	<Card variant="elevated" padding="lg">
		<!-- Mission Indicators -->
		<div class="missions">
			{#each missions as mission, i}
				<div
					class="mission-dot"
					class:dot-success={mission.result.completed && mission.result.success}
					class:dot-fail={mission.result.completed && !mission.result.success}
					class:dot-current={!mission.result.completed && i === $gameStore.currentMissionIndex}
					class:dot-pending={!mission.result.completed && i !== $gameStore.currentMissionIndex}
				>
					{#if mission.result.completed}
						<img
							src="/omerta/{mission.result.success ? 'icon-good' : 'icon-bad'}.webp"
							alt=""
							class="mission-result-icon"
						/>
						<span class="mission-size-below">{mission.teamSize}</span>
					{:else}
						<span class="mission-size">{mission.teamSize}</span>
						{#if mission.requiredFailures === 2}
							<span class="mission-special">!</span>
						{/if}
					{/if}
				</div>
			{/each}
		</div>

		<!-- Divider -->
		<div class="divider"></div>

		<!-- Info -->
		<div class="info">
			<p class="leader-info">
				<span class="info-label">{$t.missionBoard.teamLeader}</span>
				<strong class="leader-name">{$currentLeader?.name}</strong>
			</p>
			{#if consecutiveRejections > 0}
				<p class="rejections">
					{$t.missionBoard.consecutiveRejections(consecutiveRejections)}
				</p>
			{/if}
		</div>
	</Card>
</div>

<style>
	.board {
		margin-bottom: var(--spacing-lg);
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
		justify-content: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
	}

	.mission-dot {
		position: relative;
		width: 4rem;
		min-height: 4rem;
		border-radius: var(--radius-full);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-sm);
		transition: transform 200ms ease, box-shadow 200ms ease;
	}

	.dot-pending {
		width: 3.75rem;
		min-height: 3.75rem;
		background: var(--color-surface-light);
		color: var(--color-text-muted);
		border: 2px solid var(--color-border);
	}

	.dot-success,
	.dot-fail {
		background: transparent;
		color: var(--color-text);
	}

	.dot-current {
		width: 3.75rem;
		min-height: 3.75rem;
		background: var(--color-warning);
		color: var(--color-bg);
		animation: currentPulse 2s ease-in-out infinite;
		box-shadow: 0 0 16px rgba(243, 156, 18, 0.5);
	}

	@keyframes currentPulse {
		0%, 100% {
			transform: scale(1);
			box-shadow: 0 0 16px rgba(243, 156, 18, 0.5);
		}
		50% {
			transform: scale(1.05);
			box-shadow: 0 0 24px rgba(243, 156, 18, 0.7);
		}
	}

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
	}

	.mission-result-icon {
		width: 5rem;
		height: auto;
		border-radius: var(--radius-sm);
	}

	.mission-size-below {
		font-size: var(--text-xs);
		font-weight: var(--font-weight-bold);
		margin-top: 0.125rem;
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

	.leader-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		margin: 0;
	}

	.info-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.leader-name {
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
	}

	.rejections {
		margin: var(--spacing-sm) 0 0 0;
		font-size: var(--text-sm);
		color: var(--color-danger);
		font-weight: var(--font-weight-medium);
	}
</style>
