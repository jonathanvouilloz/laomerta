<script lang="ts">
	import type { Player, Team, Mission, Role } from '$lib/types/game';
	import type { WinReasonKey } from '$lib/i18n/types';
	import { getTeamName } from '$lib/utils/roles';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	interface Props {
		winner: Team;
		winReasonKey: WinReasonKey;
		players: Player[];
		missions: Mission[];
		accusedPlayerId: string | null;
		onNewGame: () => void;
		onHome: () => void;
	}

	let { winner, winReasonKey, players, missions, accusedPlayerId, onNewGame, onHome }: Props = $props();

	const winnerName = $derived(getTeamName(winner, $t));

	// Séparer gagnants et perdants
	const winners = $derived(players.filter(p => p.team === winner));
	const losers = $derived(players.filter(p => p.team !== winner));

	const roleImages: Record<Role, string> = {
		loyalist: '/omerta/the-loyalist.webp',
		spy: '/omerta/the-spy.webp',
		assassin: '/omerta/the-assassin.webp',
		merlin: '/omerta/the-mole.webp'
	};

	function getRoleName(role: Role): string {
		return $t.roles[role].name;
	}

	function getRoleImage(role: Role | undefined): string {
		return role ? roleImages[role] : '';
	}
</script>

<div class="game-end" class:good={winner === 'good'} class:evil={winner === 'evil'}>
	<!-- Atmospheric Background -->
	<div class="atmosphere"></div>

	<!-- Victory Banner -->
	<div class="result anim-bounce-in">
		<p class="winner-label">{$t.gameEnd.victory}</p>
		<h1 class="winner-name">{winnerName}</h1>
		<p class="win-reason">{$t.winReasons[winReasonKey]}</p>
	</div>

	<!-- Winners Section -->
	<div class="section anim-slide-up" style="--delay: 200ms">
		<h3 class="section-title">{$t.gameEnd.winners || 'Les gagnants'}</h3>
		<div class="winners-grid">
			{#each winners as player, i}
				<div class="winner-card" style="--delay: {250 + i * 100}ms">
					<img src={getRoleImage(player.role)} alt="" class="winner-image" />
					<p class="winner-name-label">{player.name}</p>
					<Badge>{getRoleName(player.role!)}</Badge>
				</div>
			{/each}
		</div>
	</div>

	<!-- Losers Section -->
	{#if losers.length > 0}
		<div class="section anim-slide-up" style="--delay: 350ms">
			<h3 class="section-title losers-title">{$t.gameEnd.losers || 'Les perdants'}</h3>
			<div class="losers-list">
				{#each losers as player}
					<div class="loser-item">
						<span class="loser-name">{player.name}</span>
						<Badge>{getRoleName(player.role!)}</Badge>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Missions Recap (compact) -->
	<div class="section anim-slide-up" style="--delay: 450ms">
		<div class="missions-compact">
			{#each missions as mission, i}
				{#if mission.result.completed}
					<div class="mission-dot" class:success={mission.result.success} class:fail={!mission.result.success}>
						{i + 1}
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Actions -->
	<div class="actions anim-slide-up" style="--delay: 550ms">
		<CornerButton team="neutral" onclick={onNewGame}>
			{$t.gameEnd.newGame}
		</CornerButton>
		<CornerButton team="neutral" size="small" onclick={onHome}>
			{$t.gameEnd.returnHome}
		</CornerButton>
	</div>
</div>

<style>
	.game-end {
		--winner-color: var(--color-good);
		--winner-glow: rgba(78, 204, 163, 0.3);

		position: relative;
		min-height: 100dvh;
		padding: var(--spacing-lg);
		overflow: hidden;
	}

	.game-end.evil {
		--winner-color: var(--color-evil);
		--winner-glow: rgba(233, 69, 96, 0.3);
	}

	/* === ATMOSPHERE === */
	.atmosphere {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			180deg,
			var(--winner-glow) 0%,
			transparent 40%
		);
		pointer-events: none;
		animation: atmospherePulse 3s ease-in-out infinite;
	}

	@keyframes atmospherePulse {
		0%, 100% { opacity: 0.8; }
		50% { opacity: 1; }
	}

	/* === RESULT === */
	.result {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: var(--spacing-lg) 0;
	}

	.winner-label {
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-text-muted);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.winner-name {
		font-size: var(--text-3xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--winner-color);
		margin: 0 0 var(--spacing-xs) 0;
		text-shadow:
			0 2px 4px rgba(0, 0, 0, 0.3),
			0 0 60px var(--winner-glow);
	}

	.win-reason {
		color: var(--color-text-muted);
		margin: 0;
		font-size: var(--text-sm);
	}

	/* === SECTIONS === */
	.section {
		position: relative;
		z-index: 1;
		margin-bottom: var(--spacing-lg);
	}

	.section-title {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--winner-color);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 var(--spacing-md) 0;
		text-align: center;
	}

	.losers-title {
		color: var(--color-text-muted);
	}

	/* === WINNERS GRID === */
	.winners-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--spacing-md);
	}

	.winner-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
		animation: cardIn 400ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: scale(0.9);
	}

	@keyframes cardIn {
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.winner-image {
		width: 80px;
		height: 80px;
		border-radius: var(--radius-lg);
		object-fit: cover;
		object-position: top center;
		box-shadow: var(--shadow-md), 0 0 20px var(--winner-glow);
		border: 2px solid var(--winner-color);
	}

	.winner-name-label {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin: 0;
	}

	/* === LOSERS LIST === */
	.losers-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		padding: 0 var(--spacing-md);
	}

	.loser-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-xs) 0;
		border-bottom: 1px solid var(--color-border);
	}

	.loser-item:last-child {
		border-bottom: none;
	}

	.loser-name {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	/* === MISSIONS COMPACT === */
	.missions-compact {
		display: flex;
		justify-content: center;
		gap: var(--spacing-sm);
	}

	.mission-dot {
		width: 36px;
		height: 36px;
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-sm);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
	}

	.mission-dot.success {
		background: rgba(78, 204, 163, 0.2);
		border: 1px solid var(--color-success);
		color: var(--color-success);
	}

	.mission-dot.fail {
		background: rgba(233, 69, 96, 0.2);
		border: 1px solid var(--color-danger);
		color: var(--color-danger);
	}

	/* === ACTIONS === */
	.actions {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-md);
	}

	/* === ANIMATIONS === */
	.anim-bounce-in {
		animation: bounceIn 600ms var(--ease-out-expo) forwards;
		opacity: 0;
	}

	@keyframes bounceIn {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		60% {
			transform: scale(1.05);
		}
		100% {
			opacity: 1;
			transform: scale(1);
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
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
