<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		team?: 'famiglia' | 'police' | 'neutral';
		size?: 'normal' | 'small';
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let { team = 'neutral', size = 'normal', disabled = false, onclick, children }: Props = $props();
</script>

<button
	class="corner-btn"
	class:famiglia={team === 'famiglia'}
	class:police={team === 'police'}
	class:neutral={team === 'neutral'}
	class:small={size === 'small'}
	{disabled}
	{onclick}
>
	<span class="corner corner-tl"></span>
	<span class="corner corner-tr"></span>
	<span class="corner corner-bl"></span>
	<span class="corner corner-br"></span>
	<span class="btn-text">
		{@render children()}
	</span>
</button>

<style>
	.corner-btn {
		--corner-color: var(--color-police);
		--bg-color: rgba(233, 69, 96, 0.15);
		--corner-size: 14px;
		--corner-thickness: 2px;

		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 1.25rem 2.5rem;
		background: var(--bg-color);
		border: none;
		color: var(--color-text);
		font-family: var(--font-family);
		font-size: var(--text-2xl);
		font-weight: var(--font-weight-extrabold);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		cursor: pointer;
		transition: all 200ms ease;
	}

	.corner-btn.famiglia {
		--corner-color: var(--color-famiglia);
		--bg-color: rgba(78, 204, 163, 0.15);
	}

	.corner-btn.police {
		--corner-color: var(--color-police);
		--bg-color: rgba(233, 69, 96, 0.15);
	}

	.corner-btn.neutral {
		--corner-color: rgba(255, 255, 255, 0.7);
		--bg-color: rgba(255, 255, 255, 0.12);
	}

	/* Size variants */
	.corner-btn.small {
		padding: 1rem 2rem;
		font-size: var(--text-lg);
		letter-spacing: 0.15em;
	}

	/* Corners */
	.corner {
		position: absolute;
		width: var(--corner-size);
		height: var(--corner-size);
		border-color: var(--corner-color);
		border-style: solid;
		transition: all 200ms ease;
	}

	.corner-tl {
		top: 0;
		left: 0;
		border-width: var(--corner-thickness) 0 0 var(--corner-thickness);
	}

	.corner-tr {
		top: 0;
		right: 0;
		border-width: var(--corner-thickness) var(--corner-thickness) 0 0;
	}

	.corner-bl {
		bottom: 0;
		left: 0;
		border-width: 0 0 var(--corner-thickness) var(--corner-thickness);
	}

	.corner-br {
		bottom: 0;
		right: 0;
		border-width: 0 var(--corner-thickness) var(--corner-thickness) 0;
	}

	/* Text */
	.btn-text {
		position: relative;
		z-index: 1;
	}

	/* Hover */
	.corner-btn:hover:not(:disabled) {
		--bg-color: rgba(233, 69, 96, 0.25);
	}

	.corner-btn.famiglia:hover:not(:disabled) {
		--bg-color: rgba(78, 204, 163, 0.25);
	}

	.corner-btn.neutral:hover:not(:disabled) {
		--bg-color: rgba(255, 255, 255, 0.2);
	}

	.corner-btn:hover:not(:disabled) .corner {
		--corner-size: 18px;
		filter: drop-shadow(0 0 6px var(--corner-color));
	}

	/* Active */
	.corner-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	/* Disabled */
	.corner-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Focus */
	.corner-btn:focus-visible {
		outline: 2px solid var(--corner-color);
		outline-offset: 4px;
	}
</style>
