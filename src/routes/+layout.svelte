<script lang="ts">
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import favicon from '$lib/assets/favicon.svg';
	import { locale } from '$lib/i18n';
	import DesktopBlocker from '$lib/components/ui/DesktopBlocker.svelte';

	let { children } = $props();

	// Service Worker registration
	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					console.log('SW Registered');
				},
				onRegisterError(error) {
					console.error('SW registration error', error);
				}
			});
		}
	});

	$effect(() => {
		document.documentElement.lang = $locale;
	});

	// Manifest link tag for head
	const webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
	<link rel="icon" href={favicon} />
</svelte:head>

<DesktopBlocker />
{@render children()}
