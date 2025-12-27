<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';

	interface Props {
		onContinue: () => void;
		duration?: number;
	}

	let { onContinue, duration = 1500 }: Props = $props();

	onMount(() => {
		const timeout = setTimeout(onContinue, duration);
		return () => clearTimeout(timeout);
	});
</script>

<button type="button" class="masked" onclick={onContinue}>
	<div class="icon">
		<svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M12 4.5c-7 0-10 7.5-10 7.5s3 7.5 10 7.5 10-7.5 10-7.5-3-7.5-10-7.5Z" />
			<circle cx="12" cy="12" r="3" />
			<path d="M3 3l18 18" stroke-linecap="round" />
		</svg>
	</div>
	<p class="text-muted">{$t.transitions.nextPlayer}</p>
</button>

<style>
	.masked {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100dvh;
		width: 100%;
		padding: var(--spacing-xl);
		background: var(--color-bg);
		border: none;
		cursor: pointer;
	}

	.icon {
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-lg);
		opacity: 0.5;
	}
</style>
