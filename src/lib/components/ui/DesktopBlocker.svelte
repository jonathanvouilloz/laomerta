<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';

	let isDesktop = $state(false);

	onMount(() => {
		const query = window.matchMedia('(min-width: 768px)');
		isDesktop = query.matches;

		const handler = (e: MediaQueryListEvent) => {
			isDesktop = e.matches;
		};
		query.addEventListener('change', handler);
		return () => query.removeEventListener('change', handler);
	});
</script>

{#if isDesktop}
	<div class="blocker">
		<div class="content">
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
					<line x1="12" y1="18" x2="12.01" y2="18" />
				</svg>
			</div>
			<h1 class="title">{$t.desktopBlocker.title}</h1>
			<p class="subtitle">{$t.desktopBlocker.subtitle}</p>
		</div>
	</div>
{/if}

<style>
	.blocker {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: var(--color-bg);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		text-align: center;
		padding: var(--spacing-xl);
		max-width: 320px;
	}

	.icon {
		width: 80px;
		height: 80px;
		margin: 0 auto var(--spacing-xl);
		color: var(--color-accent);
	}

	.icon svg {
		width: 100%;
		height: 100%;
	}

	.title {
		font-family: var(--font-display);
		font-size: 1.75rem;
		color: var(--color-text);
		margin: 0 0 var(--spacing-md);
		text-transform: uppercase;
	}

	.subtitle {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.5;
	}
</style>
