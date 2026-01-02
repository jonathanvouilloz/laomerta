<script lang="ts">
	import type { Mission } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import TextButton from '$lib/components/ui/TextButton.svelte';

	interface Props {
		mission: Mission;
		onContinue: () => void;
	}

	let { mission, onContinue }: Props = $props();

	const success = $derived(mission.result.success);
</script>

<div class="result" class:success class:fail={!success}>
	<!-- Badge stats en haut -->
	<div class="stats-badge anim-fade-in">
		<span class="success-vote">{mission.result.successes} {$t.missionResult.successes}</span>
		<span class="separator">•</span>
		<span class="fail-vote">{mission.result.sabotages} {$t.missionResult.sabotages}</span>
	</div>

	<!-- Titre -->
	<h1 class="result-title anim-fade-in" style="--delay: 200ms">
		{#if success}
			{$t.missionResult.success}
		{:else}
			{$t.missionResult.failure}
		{/if}
	</h1>

	<!-- Note pour missions spéciales -->
	{#if mission.requiredFailures === 2}
		<p class="note anim-fade-in" style="--delay: 300ms">
			{$t.missionResult.requiredTwo}
		</p>
	{/if}

	<!-- Bouton Continue -->
	<TextButton size="small" onclick={onContinue}>
		{$t.missionResult.continue}
	</TextButton>
</div>

<style>
	.result {
		--result-color: var(--color-success);
		--result-glow: rgba(78, 204, 163, 0.3);

		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: 5dvh;
		background-image: url('/images/backgrounds/mission-success.webp');
		background-size: cover;
		background-position: center;
	}

	.result::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 50%);
		pointer-events: none;
		z-index: 0;
	}

	.result.fail {
		--result-color: var(--color-danger);
		--result-glow: rgba(233, 69, 96, 0.3);
		background-image: url('/images/backgrounds/mission-failed.webp');
	}

	/* === STATS BADGE === */
	.stats-badge {
		position: fixed;
		top: var(--spacing-lg);
		left: var(--spacing-lg);
		z-index: 10;
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-xs) var(--spacing-md);
		background: rgba(0, 0, 0, 0.9);
		font-family: var(--font-display);
		font-size: var(--text-base);
		text-transform: uppercase;
		transform: rotate(-2deg);
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
	}

	.success-vote {
		color: var(--color-success);
	}

	.fail-vote {
		color: var(--color-danger);
	}

	.separator {
		color: var(--color-text-muted);
		opacity: 0.5;
	}

	/* === TITLE === */
	.result-title {
		position: relative;
		z-index: 1;
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--result-color);
		margin: 0 0 var(--spacing-xl) 0;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-align: center;
		text-shadow:
			0 2px 4px rgba(0, 0, 0, 0.3),
			0 0 40px var(--result-glow);
	}

	/* === NOTE === */
	.note {
		position: relative;
		z-index: 1;
		margin: 0 0 var(--spacing-lg) 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-style: italic;
	}

	/* === BUTTON === */
	.result :global(.text-btn) {
		position: relative;
		z-index: 1;
	}

	/* === ANIMATIONS === */
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
