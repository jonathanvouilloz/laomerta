<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'elevated' | 'interactive';
		accent?: 'none' | 'good' | 'evil';
		accentPosition?: 'left' | 'top';
		padding?: 'sm' | 'md' | 'lg';
		children: Snippet;
	}

	let {
		variant = 'default',
		accent = 'none',
		accentPosition = 'left',
		padding = 'lg',
		children
	}: Props = $props();
</script>

<div
	class="card card-{variant} card-padding-{padding}"
	class:card-accent-good={accent === 'good'}
	class:card-accent-evil={accent === 'evil'}
	class:card-accent-top={accentPosition === 'top'}
>
	<!-- Subtle inner glow for accent variants -->
	{#if accent !== 'none'}
		<span class="card-accent-glow"></span>
	{/if}

	<div class="card-content">
		{@render children()}
	</div>
</div>

<style>
	.card {
		--card-accent-color: transparent;
		--card-accent-glow: transparent;

		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;

		/* Subtle gradient background */
		background: linear-gradient(
			135deg,
			rgba(26, 26, 26, 0.85) 0%,
			rgba(18, 18, 18, 0.92) 100%
		);

		/* Fine border */
		border: 1px solid var(--color-border);

		/* Soft shadow for depth */
		box-shadow:
			var(--shadow-sm),
			inset 0 1px 0 rgba(255, 255, 255, 0.03);

		/* Subtle glassmorphism */
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);

		transition:
			transform 200ms var(--ease-out-expo),
			box-shadow 200ms var(--ease-out-expo),
			border-color 200ms ease;
	}

	.card-content {
		position: relative;
		z-index: 1;
	}

	/* === PADDING VARIANTS === */
	.card-padding-sm {
		padding: var(--spacing-sm);
	}

	.card-padding-md {
		padding: var(--spacing-md);
	}

	.card-padding-lg {
		padding: var(--spacing-lg);
	}

	/* === VARIANT: ELEVATED === */
	.card-elevated {
		background: linear-gradient(
			135deg,
			rgba(34, 34, 34, 0.9) 0%,
			rgba(26, 26, 26, 0.95) 100%
		);

		box-shadow:
			var(--shadow-md),
			0 2px 8px rgba(0, 0, 0, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);

		border-color: var(--color-border-active);
	}

	/* === VARIANT: INTERACTIVE === */
	.card-interactive {
		cursor: pointer;
	}

	.card-interactive:hover {
		transform: translateY(-2px);
		border-color: var(--color-border-active);

		box-shadow:
			var(--shadow-md),
			0 8px 24px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	.card-interactive:active {
		transform: translateY(0);
		box-shadow:
			var(--shadow-sm),
			inset 0 1px 0 rgba(255, 255, 255, 0.03);
	}

	/* === ACCENT: GOOD (Green - The Good Team) === */
	.card-accent-good {
		--card-accent-color: var(--color-good);
		--card-accent-glow: rgba(78, 204, 163, 0.15);

		border-left: 4px solid var(--card-accent-color);
		border-top-left-radius: var(--radius-lg);
		border-bottom-left-radius: var(--radius-lg);
	}

	.card-accent-good:hover {
		border-left-color: var(--color-good);
		box-shadow:
			var(--shadow-md),
			-4px 0 20px rgba(78, 204, 163, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	/* === ACCENT: EVIL (Red - The Evil Team) === */
	.card-accent-evil {
		--card-accent-color: var(--color-evil);
		--card-accent-glow: rgba(233, 69, 96, 0.15);

		border-left: 4px solid var(--card-accent-color);
		border-top-left-radius: var(--radius-lg);
		border-bottom-left-radius: var(--radius-lg);
	}

	.card-accent-evil:hover {
		border-left-color: var(--color-evil);
		box-shadow:
			var(--shadow-md),
			-4px 0 20px rgba(233, 69, 96, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	/* Accent glow - subtle colored light bleeding from the accent border */
	.card-accent-glow {
		position: absolute;
		top: 0;
		left: 0;
		width: 60%;
		height: 100%;
		background: linear-gradient(
			90deg,
			var(--card-accent-glow) 0%,
			transparent 100%
		);
		pointer-events: none;
		opacity: 0.5;
		transition: opacity 200ms ease;
	}

	.card:hover .card-accent-glow {
		opacity: 0.8;
	}

	/* Combined interactive + accent states */
	.card-interactive.card-accent-good:hover {
		border-color: var(--color-border-active);
		border-left-color: var(--color-good);
	}

	.card-interactive.card-accent-evil:hover {
		border-color: var(--color-border-active);
		border-left-color: var(--color-evil);
	}

	/* === ACCENT POSITION: TOP === */
	.card-accent-top.card-accent-good {
		border-left: 1px solid var(--color-border);
		border-top: 4px solid var(--color-good);
	}

	.card-accent-top.card-accent-evil {
		border-left: 1px solid var(--color-border);
		border-top: 4px solid var(--color-evil);
	}

	.card-accent-top .card-accent-glow {
		width: 100%;
		height: 60%;
		background: linear-gradient(
			to bottom,
			var(--card-accent-glow) 0%,
			transparent 100%
		);
	}

	.card-accent-top.card-accent-good:hover {
		border-top-color: var(--color-good);
		box-shadow:
			var(--shadow-md),
			0 -4px 20px rgba(78, 204, 163, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.card-accent-top.card-accent-evil:hover {
		border-top-color: var(--color-evil);
		box-shadow:
			var(--shadow-md),
			0 -4px 20px rgba(233, 69, 96, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}
</style>
