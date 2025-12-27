import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export const isStandalone = writable(false);
export const canInstall = writable(false);
export const isIOS = writable(false);
export const showIOSModal = writable(false);

export const showInstallButton = derived(
	[isStandalone, canInstall, isIOS],
	([$isStandalone, $canInstall, $isIOS]) => {
		return !$isStandalone && ($canInstall || $isIOS);
	}
);

if (browser) {
	// Detect standalone mode
	const standaloneQuery = window.matchMedia('(display-mode: standalone)');
	isStandalone.set(
		standaloneQuery.matches || (navigator as any).standalone === true
	);

	// Listen for changes (user installs while on page)
	standaloneQuery.addEventListener('change', (e) => {
		isStandalone.set(e.matches);
	});

	// Detect iOS
	const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
	isIOS.set(isIOSDevice);

	// Listen for install prompt (Chrome/Android)
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt = e as BeforeInstallPromptEvent;
		canInstall.set(true);
	});

	// Reset if app gets installed
	window.addEventListener('appinstalled', () => {
		deferredPrompt = null;
		canInstall.set(false);
		isStandalone.set(true);
	});
}

export async function installPwa() {
	if (deferredPrompt) {
		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			deferredPrompt = null;
			canInstall.set(false);
		}
	}
}

export function openIOSModal() {
	showIOSModal.set(true);
}

export function closeIOSModal() {
	showIOSModal.set(false);
}
