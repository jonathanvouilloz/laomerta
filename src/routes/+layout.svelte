<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { locale } from '$lib/i18n';
	import DesktopBlocker from '$lib/components/ui/DesktopBlocker.svelte';

	let { children } = $props();

	$effect(() => {
		document.documentElement.lang = $locale;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<DesktopBlocker />
{@render children()}
