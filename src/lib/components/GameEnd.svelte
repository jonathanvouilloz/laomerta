<script lang="ts">
	import type { Player, Team, Mission, Role } from '$lib/types/game';
	import type { WinReasonKey } from '$lib/i18n/types';
	import { getTeamName } from '$lib/utils/roles';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

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

	function getRoleName(role: Role): string {
		return $t.roles[role].name;
	}
</script>

<div class="game-end" class:good={winner === 'good'} class:evil={winner === 'evil'}>
	<!-- Background Image -->
	<div class="background"></div>

	<!-- Overlay for readability -->
	<div class="overlay"></div>

	<!-- Content -->
	<div class="content">
		<!-- Victory Banner -->
		<div class="victory-banner anim-bounce-in">
			<p class="victory-label">{$t.gameEnd.victory}</p>
			<h1 class="team-name">{winnerName}</h1>
			<p class="win-reason">{$t.winReasons[winReasonKey]}</p>
		</div>

		<!-- Winners Section -->
		<div class="team-section winners anim-slide-up" style="--delay: 200ms">
			<h3 class="section-title">{$t.gameEnd.winners}</h3>
			<div class="players-list">
				{#each winners as player, i}
					<div class="player-board winner-glow" style="--delay: {250 + i * 80}ms">
						<span class="player-name">{player.name}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Losers Section -->
		{#if losers.length > 0}
			<div class="team-section losers anim-slide-up" style="--delay: 350ms">
				<h3 class="section-title">{$t.gameEnd.losers}</h3>
				<div class="players-list">
					{#each losers as player, i}
						<div class="player-board" style="--delay: {400 + i * 80}ms">
							<span class="player-name">{player.name}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Actions -->
		<div class="actions anim-slide-up" style="--delay: 450ms">
			<CornerButton team="neutral" onclick={onNewGame}>
				{$t.gameEnd.newGame}
			</CornerButton>
			<CornerButton team="neutral" size="small" onclick={onHome}>
				{$t.gameEnd.returnHome}
			</CornerButton>
		</div>
	</div>
</div>

<style>
	.game-end {
		position: relative;
		min-height: 100dvh;
		overflow: hidden;
	}

	/* === BACKGROUND === */
	.background {
		position: fixed;
		inset: 0;
		background-size: cover;
		background-position: center;
		z-index: 0;
	}

	.game-end.good .background {
		background-image: url('/background-cartel-win.webp');
	}

	.game-end.evil .background {
		background-image: url('/background-police-win.webp');
	}

	/* === OVERLAY === */
	.overlay {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.6) 0%,
			rgba(0, 0, 0, 0.3) 50%,
			rgba(0, 0, 0, 0.6) 100%
		);
		z-index: 1;
	}

	/* === CONTENT === */
	.content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: var(--spacing-lg);
	}

	/* === VICTORY BANNER === */
	.victory-banner {
		text-align: center;
		padding: var(--spacing-lg) 0;
	}

	.victory-label {
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-text-muted);
		margin: 0 0 var(--spacing-xs) 0;
	}

	.team-name {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 12vw, 4rem);
		font-weight: var(--font-weight-extrabold);
		text-transform: uppercase;
		margin: 0 0 var(--spacing-sm) 0;
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
	}

	.game-end.good .team-name {
		color: var(--color-good);
	}

	.game-end.evil .team-name {
		color: var(--color-evil);
	}

	.win-reason {
		font-size: var(--text-base);
		color: var(--color-text);
		margin: 0;
		font-style: italic;
	}

	/* === TEAM SECTIONS === */
	.team-section {
		margin-bottom: var(--spacing-md);
	}

	.section-title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 var(--spacing-sm) 0;
		text-align: center;
		text-shadow: 0 0 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.6);
	}

	.winners .section-title {
		color: var(--color-text);
	}

	.losers .section-title {
		color: var(--color-text-muted);
	}

	/* === PLAYERS LIST === */
	.players-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		align-items: center;
	}

	/* === PLAYER BOARD === */
	.player-board {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 400px;
		padding: var(--spacing-sm) var(--spacing-lg);
		background: url('/board-crew.webp') center/contain no-repeat;
		aspect-ratio: 820/200;
		max-height: 70px;
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

	/* Halo pour les winners */
	.winners .player-board.winner-glow {
		filter: drop-shadow(0 0 12px var(--winner-glow-color));
	}

	.game-end.good {
		--winner-glow-color: var(--color-accent);
	}

	.game-end.evil {
		--winner-glow-color: #4a9eff;
	}

	/* Losers plus discrets */
	.losers .player-board {
		max-height: 55px;
		opacity: 0.85;
	}

	/* === PLAYER NAME === */
	.player-name {
		font-family: 'Swash Break', var(--font-display);
		font-size: var(--text-xl);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		color: #3d2a1a;
		line-height: 1;
	}

	.losers .player-name {
		font-size: var(--text-lg);
	}

	/* === ACTIONS === */
	.actions {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		padding-top: var(--spacing-lg);
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
