<script lang="ts">
	import type { Player, Mission } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		players: Player[];
		mission: Mission;
		leaderName: string;
		onSubmit: (playerIds: string[]) => void;
	}

	let { players, mission, leaderName, onSubmit }: Props = $props();

	let selectedIds: string[] = $state([]);

	const canSubmit = $derived(selectedIds.length === mission.teamSize);

	function togglePlayer(playerId: string) {
		if (selectedIds.includes(playerId)) {
			selectedIds = selectedIds.filter((id) => id !== playerId);
		} else if (selectedIds.length < mission.teamSize) {
			selectedIds = [...selectedIds, playerId];
		}
	}
</script>

<div class="selection">
	<!-- Header -->
	<div class="header anim-slide-down">
		<h2 class="title">{$t.teamSelection.mission(mission.number)}</h2>
		<p class="subtitle">{$t.teamSelection.leaderChooses(leaderName, mission.teamSize)}</p>
		<p class="requirement">{$t.teamSelection.requiredFailures(mission.requiredFailures)}</p>
	</div>

	<!-- Players Grid -->
	<div class="players-section anim-fade-in" style="--delay: 100ms">
		<div class="players">
			{#each players as player, i}
				<button
					class="player-btn"
					class:selected={selectedIds.includes(player.id)}
					onclick={() => togglePlayer(player.id)}
					style="--delay: {150 + i * 30}ms"
				>
					<span class="player-name">{player.name}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Counter -->
	<div class="counter-section anim-fade-in" class:complete={canSubmit} style="--delay: 200ms">
		<Card variant="default" padding="md">
			<div class="counter">
				<span class="counter-current" class:complete={canSubmit}>{selectedIds.length}</span>
				<span class="counter-separator">/</span>
				<span class="counter-total">{mission.teamSize}</span>
				<span class="counter-label">{$t.teamSelection.selected(selectedIds.length, mission.teamSize).split(' ').slice(-1)[0]}</span>
			</div>
		</Card>
	</div>

	<!-- Submit Button -->
	<div class="action anim-slide-up" style="--delay: 300ms">
		<CornerButton team="neutral" size="small" disabled={!canSubmit} onclick={() => onSubmit(selectedIds)}>
			{$t.teamSelection.proposeTeam}
		</CornerButton>
	</div>
</div>

<style>
	.selection {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-lg);
	}

	/* === HEADER === */
	.header {
		text-align: center;
		margin-bottom: var(--spacing-lg);
	}

	.title {
		font-size: var(--text-2xl);
		font-weight: var(--font-weight-bold);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.subtitle {
		color: var(--color-text-muted);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.requirement {
		font-size: var(--text-sm);
		color: var(--color-warning);
		margin: 0;
		font-weight: var(--font-weight-medium);
	}

	/* === PLAYERS === */
	.players-section {
		margin-bottom: var(--spacing-md);
	}

	.players {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.player-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--color-surface);
		border: 1px solid var(--color-surface-light);
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
		animation: playerIn 400ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: translateX(-10px);
	}

	@keyframes playerIn {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.player-btn:hover {
		border-color: var(--color-accent);
		transform: translateX(4px);
	}

	.player-btn.selected {
		background: rgba(233, 69, 96, 0.15);
		border-color: var(--color-accent);
		box-shadow: var(--glow-accent);
	}

	.player-name {
		font-weight: var(--font-weight-medium);
	}

	/* === COUNTER === */
	.counter-section {
		margin-bottom: var(--spacing-lg);
		border-radius: var(--radius-lg);
		border: 1px solid transparent;
		transition: border-color 200ms ease, box-shadow 200ms ease;
	}

	.counter-section.complete {
		border-color: var(--color-success);
		box-shadow: var(--glow-success);
	}

	.counter-section.complete :global(.card) {
		border-color: transparent;
	}

	.counter {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: var(--spacing-xs);
	}

	.counter-current {
		font-size: var(--text-3xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--color-text-muted);
		transition: color 200ms ease;
	}

	.counter-current.complete {
		color: var(--color-success);
	}

	.counter-separator {
		font-size: var(--text-xl);
		color: var(--color-text-muted);
	}

	.counter-total {
		font-size: var(--text-xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
	}

	.counter-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-left: var(--spacing-sm);
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

	.anim-fade-in {
		animation: fadeIn 500ms ease forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
</style>
