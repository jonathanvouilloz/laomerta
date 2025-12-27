<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'success' | 'danger' | 'outline' | 'noir';
		size?: 'normal' | 'large';
		disabled?: boolean;
		fullWidth?: boolean;
		type?: 'button' | 'submit';
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'normal',
		disabled = false,
		fullWidth = true,
		type = 'button',
		onclick,
		children
	}: Props = $props();
</script>

<button
	class="btn btn-{variant} btn-{size}"
	class:btn-full={fullWidth}
	{type}
	{disabled}
	{onclick}
>
	<span class="btn-content">
		{@render children()}
	</span>
	<span class="btn-shimmer"></span>
	<span class="btn-glow"></span>
</button>

<style>
	.btn {
		--btn-bg: var(--color-accent);
		--btn-bg-dark: var(--color-accent-dark);
		--btn-glow: var(--glow-accent);
		--btn-text: var(--color-text);

		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-lg);
		border: none;
		border-radius: var(--radius-md);
		font-family: var(--font-family);
		font-size: 1rem;
		font-weight: var(--font-weight-semibold);
		letter-spacing: 0.02em;
		color: var(--btn-text);
		cursor: pointer;
		overflow: hidden;
		isolation: isolate;

		background: linear-gradient(
			135deg,
			var(--btn-bg) 0%,
			var(--btn-bg-dark) 100%
		);
		box-shadow:
			var(--shadow-sm),
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			inset 0 -1px 0 rgba(0, 0, 0, 0.1);

		transition:
			transform 200ms var(--ease-out-expo),
			box-shadow 200ms var(--ease-out-expo),
			background 150ms ease;
	}

	.btn-full {
		width: 100%;
	}

	/* Content layer */
	.btn-content {
		position: relative;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
	}

	/* Shimmer effect - glint of chrome in dim light */
	.btn-shimmer {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			120deg,
			transparent 30%,
			rgba(255, 255, 255, 0.15) 50%,
			transparent 70%
		);
		transform: translateX(-100%) skewX(-15deg);
		transition: none;
	}

	/* Glow layer */
	.btn-glow {
		position: absolute;
		inset: -2px;
		z-index: -1;
		border-radius: inherit;
		background: var(--btn-bg);
		opacity: 0;
		filter: blur(12px);
		transition: opacity 300ms ease;
	}

	/* Hover states */
	.btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow:
			var(--shadow-md),
			inset 0 1px 0 rgba(255, 255, 255, 0.15),
			inset 0 -1px 0 rgba(0, 0, 0, 0.1),
			var(--btn-glow);
	}

	.btn:hover:not(:disabled) .btn-shimmer {
		transform: translateX(100%) skewX(-15deg);
		transition: transform 600ms ease;
	}

	.btn:hover:not(:disabled) .btn-glow {
		opacity: 0.4;
	}

	/* Active state */
	.btn:active:not(:disabled) {
		transform: translateY(0) scale(0.98);
		box-shadow:
			var(--shadow-sm),
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			inset 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.btn:active:not(:disabled) .btn-glow {
		opacity: 0.2;
	}

	/* Focus state for accessibility */
	.btn:focus-visible {
		outline: 2px solid var(--btn-bg);
		outline-offset: 3px;
	}

	/* Disabled state */
	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}

	/* === VARIANT: PRIMARY === */
	.btn-primary {
		--btn-bg: var(--color-accent);
		--btn-bg-dark: var(--color-accent-dark);
		--btn-glow: var(--glow-accent);
		--btn-text: var(--color-text);
	}

	/* === VARIANT: SUCCESS === */
	.btn-success {
		--btn-bg: var(--color-success);
		--btn-bg-dark: var(--color-success-dark);
		--btn-glow: var(--glow-success);
		--btn-text: var(--color-bg);
	}

	/* === VARIANT: DANGER === */
	.btn-danger {
		--btn-bg: var(--color-danger);
		--btn-bg-dark: #b83a4f;
		--btn-glow: var(--glow-danger);
		--btn-text: var(--color-text);
	}

	/* === VARIANT: OUTLINE === */
	.btn-outline {
		--btn-bg: transparent;
		--btn-bg-dark: transparent;
		--btn-glow: var(--glow-accent);
		--btn-text: var(--color-text);

		background: transparent;
		border: 2px solid var(--color-surface-light);
		box-shadow: none;
	}

	.btn-outline .btn-shimmer {
		background: linear-gradient(
			120deg,
			transparent 30%,
			rgba(255, 255, 255, 0.08) 50%,
			transparent 70%
		);
	}

	.btn-outline:hover:not(:disabled) {
		border-color: var(--color-accent);
		color: var(--color-accent);
		background: rgba(233, 69, 96, 0.08);
		box-shadow: var(--glow-accent);
	}

	.btn-outline:active:not(:disabled) {
		background: rgba(233, 69, 96, 0.12);
		box-shadow: none;
	}

	/* === VARIANT: NOIR (Film Noir style) === */
	.btn-noir {
		--btn-text: #e0e0e0;

		background: linear-gradient(135deg, #0a0a0f 0%, #12121a 100%);
		border: 1px solid rgba(233, 69, 96, 0.4);
		box-shadow:
			0 0 15px rgba(233, 69, 96, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.03);
		animation: borderPulse 3s ease-in-out infinite;
	}

	.btn-noir .btn-shimmer {
		display: none;
	}

	.btn-noir .btn-glow {
		display: none;
	}

	.btn-noir:hover:not(:disabled) {
		border-color: rgba(233, 69, 96, 0.7);
		box-shadow:
			0 0 25px rgba(233, 69, 96, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
		transform: translateY(-2px);
	}

	.btn-noir:active:not(:disabled) {
		transform: translateY(0) scale(0.98);
		box-shadow: 0 0 10px rgba(233, 69, 96, 0.2);
		animation: none;
	}

	@keyframes borderPulse {
		0%, 100% {
			border-color: rgba(233, 69, 96, 0.3);
			box-shadow: 0 0 10px rgba(233, 69, 96, 0.1);
		}
		50% {
			border-color: rgba(233, 69, 96, 0.6);
			box-shadow: 0 0 20px rgba(233, 69, 96, 0.25);
		}
	}

	/* === SIZE: LARGE === */
	.btn-large {
		padding: var(--spacing-lg) var(--spacing-xl);
		font-size: var(--text-lg);
		border-radius: var(--radius-lg);
	}

	/* === SIZE: NORMAL (explicit for clarity) === */
	.btn-normal {
		padding: var(--spacing-md) var(--spacing-lg);
		font-size: 1rem;
		border-radius: var(--radius-md);
	}
</style>
