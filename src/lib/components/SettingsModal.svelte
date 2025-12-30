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

	let showRestartOptions = $state(false);
	let hasPlayers = $derived($gameStore.players.length > 0);

	function handleRestart() {
		showRestartOptions = true;
	}

	function handleFreshStart() {
		gameStore.restartGame();
		onClose();
	}

	function handleSamePlayers() {
		gameStore.replayWithSamePlayers();
		onClose();
	}

	function cancelRestart() {
		showRestartOptions = false;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (showRestartOptions) {
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

		{#if showRestartOptions}
			<div class="restart-section animate-fade-in">
				<p class="restart-title">{$t.settings.chooseRestartType}</p>
				<div class="restart-buttons">
					<CornerButton team="neutral" size="small" onclick={handleFreshStart}>
						{$t.settings.freshStart}
					</CornerButton>
					<CornerButton team="neutral" size="small" onclick={handleSamePlayers} disabled={!hasPlayers}>
						{$t.settings.samePlayers}
					</CornerButton>
				</div>
				<button class="cancel-link" onclick={cancelRestart}>
					{$t.settings.cancel}
				</button>
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

	.restart-section {
		text-align: center;
	}

	.restart-title {
		margin-bottom: var(--spacing-lg);
		color: var(--color-text);
		font-weight: var(--font-weight-medium);
	}

	.restart-buttons {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.restart-buttons :global(.btn) {
		width: 100%;
	}

	.cancel-link {
		margin-top: var(--spacing-lg);
		padding: var(--spacing-sm);
		background: none;
		border: none;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: color var(--transition-fast);
	}

	.cancel-link:hover {
		color: var(--color-text);
	}
</style>
