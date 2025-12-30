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
	class="bullet-btn"
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
	.bullet-btn {
		--btn-color: var(--color-accent);
		--bg-color: rgba(255, 109, 0, 0.25);

		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 1.25rem 2.5rem;
		background: repeating-linear-gradient(
			45deg,
			var(--bg-color),
			var(--bg-color) 3px,
			transparent 3px,
			transparent 12px
		);
		border: none;
		color: var(--btn-color);
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		text-transform: uppercase;
		cursor: pointer;
		transition: all 300ms ease;
	}

	.bullet-btn.good {
		--btn-color: var(--color-good);
		--bg-color: rgba(0, 230, 118, 0.25);
	}

	.bullet-btn.evil {
		--btn-color: var(--color-danger);
		--bg-color: rgba(255, 23, 68, 0.25);
	}

	.bullet-btn.neutral {
		--btn-color: var(--color-accent);
		--bg-color: rgba(255, 109, 0, 0.25);
	}

	/* Size variants */
	.bullet-btn.small {
		padding: 1rem 2rem;
		font-size: var(--text-xl);
	}

	/* Text */
	.btn-text {
		position: relative;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	/* Hover */
	.bullet-btn:hover:not(:disabled) {
		--bg-color: rgba(255, 109, 0, 0.2);
		box-shadow: 0 0 30px rgba(255, 109, 0, 0.2);
	}

	.bullet-btn.good:hover:not(:disabled) {
		--bg-color: rgba(0, 230, 118, 0.2);
		box-shadow: 0 0 30px rgba(0, 230, 118, 0.2);
	}

	.bullet-btn.evil:hover:not(:disabled) {
		--bg-color: rgba(255, 23, 68, 0.2);
		box-shadow: 0 0 30px rgba(255, 23, 68, 0.2);
	}

	/* Active */
	.bullet-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	/* Disabled */
	.bullet-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Focus */
	.bullet-btn:focus-visible {
		outline: 2px solid var(--btn-color);
		outline-offset: 4px;
	}
</style>
