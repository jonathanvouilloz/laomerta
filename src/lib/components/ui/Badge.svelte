<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		active?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let { active = false, onclick, children }: Props = $props();
</script>

<button
	class="badge"
	class:active
	{onclick}
>
	{@render children()}
</button>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xs) var(--spacing-sm);
		min-width: 36px;
		background: rgba(233, 69, 96, 0.25);
		border: 1px solid var(--color-accent);
		border-radius: var(--radius-sm);
		color: var(--color-text);
		font-family: var(--font-family);
		font-size: var(--text-xs);
		font-weight: var(--font-weight-bold);
		letter-spacing: 0.05em;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.badge:hover:not(.active) {
		background: rgba(233, 69, 96, 0.4);
	}

	.badge.active {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-text);
	}

	.badge:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}
</style>
