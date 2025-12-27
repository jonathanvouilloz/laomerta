<script lang="ts">
	import { locale } from './index';
</script>

<button
	class="lang-toggle"
	onclick={() => locale.toggle()}
	aria-label="Toggle language"
>
	{$locale === 'fr' ? 'EN' : 'FR'}
</button>

<style>
	.lang-toggle {
		position: fixed;
		top: var(--spacing-md);
		right: var(--spacing-md);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-surface);
		border: 1px solid var(--color-surface-light);
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		z-index: 100;
		transition: all var(--transition-fast);
	}

	.lang-toggle:hover {
		border-color: var(--color-accent);
		color: var(--color-text);
	}
</style>
