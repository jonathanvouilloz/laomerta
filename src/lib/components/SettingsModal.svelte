<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { gameStore } from '$lib/stores/gameStore';
	import CornerButton from './ui/CornerButton.svelte';
	import Badge from './ui/Badge.svelte';

	interface Props {
		onClose: () => void;
		onShowHelp: () => void;
	}

	let { onClose, onShowHelp }: Props = $props();

	let showConfirmRestart = $state(false);
	let isInGame = $derived($gameStore.phase !== 'home' && $gameStore.phase !== 'end');

	function handleRestart() {
		if (isInGame) {
			showConfirmRestart = true;
		} else {
			gameStore.restartGame();
			onClose();
		}
	}

	function confirmRestart() {
		gameStore.restartGame();
		onClose();
	}

	function cancelRestart() {
		showConfirmRestart = false;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (showConfirmRestart) {
				cancelRestart();
			} else {
				onClose();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="modal-backdrop"
	onclick={handleBackdropClick}
	onkeydown={handleKeydown}
	role="dialog"
	aria-modal="true"
	tabindex="-1"
>
	<div class="modal animate-scale-in">
		<button class="close-btn" onclick={onClose} aria-label="Fermer">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		</button>

		<h2 class="modal-title">{$t.settings.title}</h2>

		{#if showConfirmRestart}
			<div class="confirm-section animate-fade-in">
				<p class="confirm-text">{$t.settings.confirmRestart}</p>
				<div class="confirm-buttons">
					<CornerButton team="neutral" size="small" onclick={cancelRestart}>
						{$t.settings.cancel}
					</CornerButton>
					<CornerButton team="evil" size="small" onclick={confirmRestart}>
						{$t.settings.confirm}
					</CornerButton>
				</div>
			</div>
		{:else}
			<div class="settings-section">
				<div class="setting-item">
					<span class="setting-label">{$t.settings.language}</span>
					<div class="language-buttons">
						<Badge active={$locale === 'fr'} onclick={() => locale.setLocale('fr')}>FR</Badge>
						<Badge active={$locale === 'en'} onclick={() => locale.setLocale('en')}>EN</Badge>
					</div>
				</div>

				<div class="divider"></div>

				<div class="setting-item vertical">
					<span class="setting-label">{$t.settings.help}</span>
					<CornerButton team="neutral" size="small" onclick={onShowHelp}>
						{$t.settings.viewRules}
					</CornerButton>
				</div>

				<div class="divider"></div>

				<div class="setting-item vertical">
					<span class="setting-label">{$t.settings.restart}</span>
					<CornerButton team="neutral" size="small" onclick={handleRestart}>
						{$t.settings.newGame}
					</CornerButton>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md);
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
		animation: fadeIn 200ms ease;
	}

	.modal {
		position: relative;
		width: 100%;
		max-width: 360px;
		background-color: var(--color-surface);
		border-radius: var(--radius-lg);
		padding: var(--spacing-xl);
		box-shadow: var(--shadow-xl);
	}

	.close-btn {
		position: absolute;
		top: var(--spacing-md);
		right: var(--spacing-md);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border: none;
		border-radius: var(--radius-full);
		background-color: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.close-btn:hover {
		background-color: var(--color-surface-light);
		color: var(--color-text);
	}

	.modal-title {
		font-size: var(--text-xl);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-xl);
		text-align: center;
	}

	.settings-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.setting-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);
		padding: var(--spacing-sm) 0;
	}

	.setting-item.vertical {
		flex-direction: column;
		align-items: stretch;
		gap: var(--spacing-sm);
	}

	.setting-label {
		font-weight: var(--font-weight-medium);
		color: var(--color-text);
	}

	.language-buttons {
		display: flex;
		gap: var(--spacing-xs);
	}

	.divider {
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-border), transparent);
		margin: var(--spacing-sm) 0;
	}

	.confirm-section {
		text-align: center;
	}

	.confirm-text {
		margin-bottom: var(--spacing-lg);
		color: var(--color-text);
		font-weight: var(--font-weight-medium);
	}

	.confirm-buttons {
		display: flex;
		gap: var(--spacing-md);
	}

	.confirm-buttons :global(.btn) {
		flex: 1;
	}
</style>
