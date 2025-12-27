<script lang="ts">
	import type { Player } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

	interface Props {
		player: Player;
		onConfirm: () => void;
		message?: string;
	}

	let { player, onConfirm, message }: Props = $props();

	const displayMessage = $derived(message ?? $t.transitions.passPhone);
</script>

<div class="transition">
	<!-- Ambient Glow -->
	<div class="ambient-glow"></div>

	<div class="spacer"></div>

	<div class="content">
		<p class="message anim-fade-in">{displayMessage}</p>
		<h1 class="player-name anim-scale-in">{player.name}</h1>
		<div class="player-indicator anim-fade-in" style="--delay: 200ms">
			<span class="indicator-dot"></span>
		</div>
	</div>

	<div class="spacer"></div>

	<div class="action anim-slide-up" style="--delay: 300ms">
		<CornerButton team="neutral" onclick={onConfirm}>
			{$t.transitions.iAm(player.name)}
		</CornerButton>
	</div>
</div>

<style>
	.transition {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100dvh;
		padding: var(--spacing-xl);
		text-align: center;
		overflow: hidden;
	}

	/* === AMBIENT GLOW === */
	.ambient-glow {
		position: fixed;
		inset: 0;
		background: radial-gradient(
			ellipse at center 30%,
			rgba(233, 69, 96, 0.15) 0%,
			transparent 60%
		);
		pointer-events: none;
		animation: glowPulse 4s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}

	/* === CONTENT === */
	.content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.message {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
		margin: 0 0 var(--spacing-md) 0;
		letter-spacing: 0.02em;
	}

	.player-name {
		font-size: var(--text-4xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--color-accent);
		margin: 0;
		text-shadow:
			0 2px 4px rgba(0, 0, 0, 0.3),
			0 0 40px rgba(233, 69, 96, 0.4);
	}

	/* === INDICATOR === */
	.player-indicator {
		margin-top: var(--spacing-lg);
	}

	.indicator-dot {
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--color-accent);
		box-shadow: 0 0 20px rgba(233, 69, 96, 0.6);
		animation: dotPulse 2s ease-in-out infinite;
	}

	@keyframes dotPulse {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.7;
		}
	}

	/* === SPACER === */
	.spacer {
		flex: 1;
		min-height: var(--spacing-xl);
	}

	/* === ACTION === */
	.action {
		position: relative;
		z-index: 1;
		width: 100%;
	}

	/* === ANIMATIONS === */
	.anim-fade-in {
		animation: fadeIn 600ms ease forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes fadeIn {
		to { opacity: 1; }
	}

	.anim-scale-in {
		animation: scaleIn 600ms var(--ease-out-expo) forwards;
		opacity: 0;
		transform: scale(0.9);
	}

	@keyframes scaleIn {
		to {
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
