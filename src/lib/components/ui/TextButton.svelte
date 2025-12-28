<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'danger' | 'success';
		size?: 'normal' | 'small';
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let { variant = 'default', size = 'normal', disabled = false, onclick, children }: Props = $props();
</script>

<button
	class="text-btn"
	class:danger={variant === 'danger'}
	class:success={variant === 'success'}
	class:small={size === 'small'}
	{disabled}
	{onclick}
>
	{@render children()}
</button>

<style>
	.text-btn {
		background: transparent;
		border: none;
		font-family: var(--font-display);
		font-size: 3.5rem;
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		cursor: pointer;
		text-transform: uppercase;
		padding: var(--spacing-md) var(--spacing-xl);
		transition: opacity var(--transition-fast), transform var(--transition-fast);
	}

	.text-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.text-btn:not(:disabled):hover {
		opacity: 0.8;
	}

	.text-btn:not(:disabled):active {
		transform: scale(0.98);
	}

	.text-btn.danger {
		color: var(--color-danger);
	}

	.text-btn.success {
		color: var(--color-success);
	}

	.text-btn.small {
		font-size: 1.75rem;
		padding: var(--spacing-sm) var(--spacing-md);
	}
</style>
