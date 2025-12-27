<script lang="ts">
	import { showIOSModal, closeIOSModal } from '$lib/stores/pwaStore';
	import { t } from '$lib/i18n';

	function handleClose() {
		closeIOSModal();
	}
</script>

{#if $showIOSModal}
	<div class="modal-overlay" onclick={handleClose} role="presentation">
		<div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
			<h2 class="modal-title">{$t.pwa.installTitle}</h2>

			<div class="steps">
				<div class="step">
					<div class="step-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
							<polyline points="16 6 12 2 8 6" />
							<line x1="12" y1="2" x2="12" y2="15" />
						</svg>
					</div>
					<p class="step-text">{$t.pwa.step1}</p>
				</div>

				<div class="step">
					<div class="step-icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
							<line x1="12" y1="8" x2="12" y2="16" />
							<line x1="8" y1="12" x2="16" y2="12" />
						</svg>
					</div>
					<p class="step-text">{$t.pwa.step2}</p>
				</div>
			</div>

			<button class="close-btn" onclick={handleClose}>
				{$t.pwa.understood}
			</button>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-lg);
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(4px);
		animation: fadeIn 200ms ease;
	}

	.modal {
		width: 100%;
		max-width: 320px;
		padding: var(--spacing-xl);
		background: var(--color-surface);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-lg);
		text-align: center;
		animation: slideUp 300ms var(--ease-out-expo);
	}

	.modal-title {
		margin: 0 0 var(--spacing-xl);
		font-size: var(--text-xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.step {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		text-align: left;
	}

	.step-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: rgba(233, 69, 96, 0.15);
		border-radius: var(--radius-md);
		color: var(--color-accent);
	}

	.step-text {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text-muted);
	}

	.close-btn {
		width: 100%;
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--color-accent);
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		font-weight: var(--font-weight-semibold);
		color: white;
		cursor: pointer;
		transition: opacity var(--transition-fast);
	}

	.close-btn:hover {
		opacity: 0.9;
	}

	.close-btn:active {
		opacity: 0.8;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
