<script lang="ts">
	import type { Player, Mission } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

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
		{#if mission.requiredFailures > 1}
			<p class="requirement">{$t.teamSelection.requiredFailures(mission.requiredFailures)}</p>
		{/if}
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
		<div class="counter">
			<span class="counter-current" class:complete={canSubmit}>{selectedIds.length}</span>
			<span class="counter-separator">/</span>
			<span class="counter-total">{mission.teamSize}</span>
			<span class="counter-label">{$t.teamSelection.recruited}</span>
		</div>
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
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		text-transform: uppercase;
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
		background: url('/board-crew.png') center/contain no-repeat;
		border: none;
		border-radius: 0;
		color: var(--color-text);
		font-family: var(--font-family);
		font-size: var(--text-base);
		cursor: pointer;
		aspect-ratio: 820/200;
		max-height: 60px;
		transition:
			filter 200ms ease,
			transform 200ms var(--ease-out-expo);
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
		filter: brightness(1.1);
		transform: scale(1.02);
	}

	.player-btn.selected {
		filter: brightness(1.2) drop-shadow(0 0 8px var(--color-accent));
	}

	.player-name {
		font-family: 'Swash Break', var(--font-display);
		font-size: var(--text-2xl);
		color: #3d2a1a;
		text-transform: uppercase;
	}

	/* === COUNTER === */
	.counter-section {
		margin-bottom: var(--spacing-lg);
	}

	.counter {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: var(--spacing-xs);
	}

	.counter-current {
		font-family: var(--font-display);
		font-size: 3.5rem;
		color: var(--color-text-muted);
		transition: color 200ms ease;
	}

	.counter-current.complete {
		color: var(--color-success);
	}

	.counter-separator {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		color: var(--color-text-muted);
	}

	.counter-total {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
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
