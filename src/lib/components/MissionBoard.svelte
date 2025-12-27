<script lang="ts">
	import { gameStore, currentMission, currentLeader } from '$lib/stores/gameStore';
	import { t } from '$lib/i18n';
	import Card from '$lib/components/ui/Card.svelte';

	let { mafiaScore, policeScore, missions, consecutiveRejections } = $derived($gameStore);
</script>

<div class="board">
	<!-- Scores - Hors de la Card -->
	<div class="scores">
		<div class="score-icon">
			<img src="/omerta/icon-famiglia.png" alt="Famiglia" />
			<span class="score-value">{mafiaScore}</span>
		</div>
		<div class="vs">
			<span class="vs-text">VS</span>
		</div>
		<div class="score-icon">
			<img src="/omerta/icon-police.png" alt="Police" />
			<span class="score-value">{policeScore}</span>
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
					<span class="mission-size">{mission.teamSize}</span>
					{#if mission.requiredFailures === 2}
						<span class="mission-special">!</span>
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
		gap: var(--spacing-md);
		width: 100%;
		margin-bottom: var(--spacing-lg);
	}

	.score-icon {
		position: relative;
		flex: 1;
	}

	.score-icon img {
		width: 100%;
		height: auto;
		display: block;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.score-value {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: var(--text-3xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--color-text);
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
	}

	.vs {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 var(--spacing-sm);
	}

	.vs-text {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-bold);
		color: var(--color-text-muted);
		letter-spacing: 0.1em;
	}

	/* === MISSIONS === */
	.missions {
		display: flex;
		justify-content: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-lg);
	}

	.mission-dot {
		position: relative;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-sm);
		transition: transform 200ms ease, box-shadow 200ms ease;
	}

	.dot-pending {
		background: var(--color-surface-light);
		color: var(--color-text-muted);
		border: 2px solid var(--color-border);
	}

	.dot-success {
		background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-dark) 100%);
		color: var(--color-bg);
		box-shadow: 0 0 12px rgba(78, 204, 163, 0.4);
	}

	.dot-fail {
		background: linear-gradient(135deg, var(--color-danger) 0%, var(--color-accent-dark) 100%);
		color: var(--color-text);
		box-shadow: 0 0 12px rgba(233, 69, 96, 0.4);
	}

	.dot-current {
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
