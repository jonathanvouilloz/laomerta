<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		team?: 'good' | 'evil' | 'neutral';
		size?: 'normal' | 'small';
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let { team = 'neutral', size = 'normal', disabled = false, onclick, children }: Props = $props();
</script>

<button
	class="basic-btn"
	class:good={team === 'good'}
	class:evil={team === 'evil'}
	class:neutral={team === 'neutral'}
	class:small={size === 'small'}
	{disabled}
	{onclick}
>
	<span class="btn-text">
		{@render children()}
	</span>
</button>

<style>
	.basic-btn {
		--btn-color: var(--color-accent);
		--bg-color: rgba(255, 109, 0, 0.1);

		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 1.25rem 2.5rem;
		background: var(--bg-color);
		border: 1px solid var(--btn-color);
		color: var(--color-text);
		font-family: var(--font-family);
		font-size: var(--text-2xl);
		font-weight: var(--font-weight-extrabold);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		cursor: pointer;
		transition: all 200ms ease;
	}

	.basic-btn.good {
		--btn-color: var(--color-good);
		--bg-color: rgba(0, 230, 118, 0.1);
	}

	.basic-btn.evil {
		--btn-color: var(--color-danger);
		--bg-color: rgba(255, 23, 68, 0.1);
	}

	.basic-btn.neutral {
		--btn-color: rgba(255, 255, 255, 0.5);
		--bg-color: rgba(255, 255, 255, 0.08);
	}

	/* Size variants */
	.basic-btn.small {
		padding: 1rem 2rem;
		font-size: var(--text-lg);
		letter-spacing: 0.15em;
	}

	/* Text */
	.btn-text {
		position: relative;
		z-index: 1;
	}

	/* Hover */
	.basic-btn:hover:not(:disabled) {
		--bg-color: rgba(255, 109, 0, 0.2);
		box-shadow: 0 0 15px rgba(255, 109, 0, 0.15);
	}

	.basic-btn.good:hover:not(:disabled) {
		--bg-color: rgba(0, 230, 118, 0.2);
		box-shadow: 0 0 15px rgba(0, 230, 118, 0.15);
	}

	.basic-btn.evil:hover:not(:disabled) {
		--bg-color: rgba(255, 23, 68, 0.2);
		box-shadow: 0 0 15px rgba(255, 23, 68, 0.15);
	}

	.basic-btn.neutral:hover:not(:disabled) {
		--bg-color: rgba(255, 255, 255, 0.15);
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
	}

	/* Active */
	.basic-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	/* Disabled */
	.basic-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Focus */
	.basic-btn:focus-visible {
		outline: 2px solid var(--btn-color);
		outline-offset: 4px;
	}
</style>
