<script lang="ts">
	import type { Mission } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

	interface Props {
		mission: Mission;
		onContinue: () => void;
	}

	let { mission, onContinue }: Props = $props();

	const success = $derived(mission.result.success);
</script>

<div class="result" class:success class:fail={!success}>
	<!-- Atmospheric gradient overlay -->
	<div class="atmosphere"></div>

	<div class="spacer"></div>

	<div class="result-content">
		<!-- Large result image -->
		<div class="image-container anim-scale-in">
			{#if success}
				<img src="/omerta/icon-success.png" alt="Succès" class="result-image" />
			{:else}
				<img src="/omerta/icon-failure.png" alt="Échec" class="result-image" />
			{/if}
		</div>

		<!-- Title -->
		<h1 class="result-title anim-fade-in" style="--delay: 200ms">
			{#if success}
				{$t.missionResult.success}
			{:else}
				{$t.missionResult.failure}
			{/if}
		</h1>

		<!-- Vote counts (simplified) -->
		<div class="vote-counts anim-fade-in" style="--delay: 300ms">
			<span class="vote-item success-vote">{mission.result.successes} {$t.missionResult.successes}</span>
			<span class="vote-separator">•</span>
			<span class="vote-item fail-vote">{mission.result.sabotages} {$t.missionResult.sabotages}</span>
		</div>

		<!-- Note for special missions -->
		{#if mission.requiredFailures === 2}
			<p class="note anim-fade-in" style="--delay: 400ms">
				{$t.missionResult.requiredTwo}
			</p>
		{/if}
	</div>

	<div class="spacer"></div>

	<!-- Continue button -->
	<div class="action-section anim-slide-up" style="--delay: 500ms">
		<CornerButton team="neutral" onclick={onContinue}>
			{$t.missionResult.continue}
		</CornerButton>
	</div>
</div>

<style>
	.result {
		--result-color: var(--color-success);
		--result-glow: rgba(78, 204, 163, 0.3);

		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: var(--spacing-lg);
		text-align: center;
		overflow: hidden;
	}

	.result.fail {
		--result-color: var(--color-danger);
		--result-glow: rgba(233, 69, 96, 0.3);
	}

	/* === ATMOSPHERE === */
	.atmosphere {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			180deg,
			var(--result-glow) 0%,
			transparent 50%
		);
		pointer-events: none;
		animation: atmospherePulse 3s ease-in-out infinite;
	}

	@keyframes atmospherePulse {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 1; }
	}

	/* === SPACER === */
	.spacer {
		flex: 1;
		min-height: var(--spacing-lg);
	}

	/* === RESULT CONTENT === */
	.result-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* === IMAGE === */
	.image-container {
		margin-bottom: var(--spacing-xl);
	}

	.result-image {
		width: 220px;
		height: 220px;
		object-fit: contain;
		border-radius: var(--radius-lg);
		filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4));
	}

	/* === TITLE === */
	.result-title {
		font-family: var(--font-family);
		font-size: var(--text-3xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--result-color);
		margin: 0 0 var(--spacing-md) 0;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-shadow:
			0 2px 4px rgba(0, 0, 0, 0.3),
			0 0 40px var(--result-glow);
	}

	/* === VOTE COUNTS === */
	.vote-counts {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		font-size: var(--text-base);
		font-weight: var(--font-weight-medium);
	}

	.vote-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.success-vote {
		color: var(--color-success);
	}

	.fail-vote {
		color: var(--color-danger);
	}

	.vote-separator {
		color: var(--color-text-muted);
		opacity: 0.5;
	}

	/* === NOTE === */
	.note {
		margin-top: var(--spacing-lg);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-style: italic;
	}

	/* === ACTION === */
	.action-section {
		position: relative;
		z-index: 1;
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* === ANIMATIONS === */
	.anim-scale-in {
		animation: scaleIn 600ms var(--ease-out-expo) forwards;
		opacity: 0;
		transform: scale(0.8);
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
			transform: translateY(24px);
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
