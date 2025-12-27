<script lang="ts">
	import { t } from '$lib/i18n';
	import CornerButton from './ui/CornerButton.svelte';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
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

		<h2 class="modal-title">{$t.help.title}</h2>

		<div class="help-content">
			<section class="help-section">
				<h3 class="section-title">{$t.help.objective.title}</h3>
				<ul class="help-list">
					<li class="text-famiglia">{$t.help.objective.famiglia}</li>
					<li class="text-police">{$t.help.objective.police}</li>
				</ul>
			</section>

			<section class="help-section">
				<h3 class="section-title">{$t.help.teams.title}</h3>
				<ul class="help-list">
					<li class="text-famiglia">{$t.help.teams.famigliaDesc}</li>
					<li class="text-police">{$t.help.teams.policeDesc}</li>
				</ul>
			</section>

			<section class="help-section">
				<h3 class="section-title">{$t.help.rolesTitle}</h3>
				<ul class="help-list roles-list">
					<li>{$t.help.rolesDesc.mafioso}</li>
					<li>{$t.help.rolesDesc.taupe}</li>
					<li>{$t.help.rolesDesc.policier}</li>
					<li>{$t.help.rolesDesc.enqueteur}</li>
				</ul>
			</section>

			<section class="help-section">
				<h3 class="section-title">{$t.help.gameplay.title}</h3>
				<ol class="help-list numbered">
					<li>{$t.help.gameplay.step1}</li>
					<li>{$t.help.gameplay.step2}</li>
					<li>{$t.help.gameplay.step3}</li>
					<li>{$t.help.gameplay.step4}</li>
				</ol>
			</section>

			<section class="help-section">
				<h3 class="section-title">{$t.help.specialRules.title}</h3>
				<ul class="help-list special-rules">
					<li>{$t.help.specialRules.rule1}</li>
					<li class="highlight">{$t.help.specialRules.rule2}</li>
					<li>{$t.help.specialRules.rule3}</li>
				</ul>
			</section>
		</div>

		<div class="modal-footer">
			<CornerButton team="neutral" onclick={onClose}>
				{$t.help.close}
			</CornerButton>
		</div>
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
		max-width: 420px;
		max-height: 85vh;
		display: flex;
		flex-direction: column;
		background-color: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		overflow: hidden;
	}

	.close-btn {
		position: absolute;
		top: var(--spacing-md);
		right: var(--spacing-md);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		border: none;
		border-radius: var(--radius-full);
		background-color: var(--color-surface-light);
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.close-btn:hover {
		background-color: var(--color-surface-elevated);
		color: var(--color-text);
	}

	.modal-title {
		font-size: var(--text-xl);
		font-weight: var(--font-weight-bold);
		padding: var(--spacing-xl);
		padding-bottom: var(--spacing-md);
		text-align: center;
	}

	.help-content {
		flex: 1;
		overflow-y: auto;
		padding: 0 var(--spacing-xl);
		padding-bottom: var(--spacing-md);
	}

	.help-section {
		margin-bottom: var(--spacing-lg);
	}

	.help-section:last-child {
		margin-bottom: 0;
	}

	.section-title {
		font-size: var(--text-base);
		font-weight: var(--font-weight-semibold);
		color: var(--color-accent);
		margin-bottom: var(--spacing-sm);
		padding-bottom: var(--spacing-xs);
		border-bottom: 1px solid var(--color-border);
	}

	.help-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.help-list li {
		position: relative;
		padding-left: var(--spacing-lg);
		margin-bottom: var(--spacing-xs);
		font-size: var(--text-sm);
		line-height: 1.5;
	}

	.help-list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.6em;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: var(--color-text-muted);
	}

	.help-list.numbered {
		counter-reset: step;
	}

	.help-list.numbered li {
		counter-increment: step;
	}

	.help-list.numbered li::before {
		content: counter(step);
		width: 1.2em;
		height: 1.2em;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-xs);
		font-weight: var(--font-weight-bold);
		color: var(--color-bg);
		background-color: var(--color-accent);
		top: 0.25em;
	}

	.help-list li.text-famiglia::before {
		background-color: var(--color-famiglia);
	}

	.help-list li.text-police::before {
		background-color: var(--color-police);
	}

	.help-list.roles-list li:nth-child(1)::before,
	.help-list.roles-list li:nth-child(2)::before {
		background-color: var(--color-famiglia);
	}

	.help-list.roles-list li:nth-child(3)::before,
	.help-list.roles-list li:nth-child(4)::before {
		background-color: var(--color-police);
	}

	.help-list.special-rules li.highlight {
		color: var(--color-warning);
		font-weight: var(--font-weight-medium);
	}

	.help-list.special-rules li.highlight::before {
		background-color: var(--color-warning);
	}

	.modal-footer {
		padding: var(--spacing-md) var(--spacing-xl) var(--spacing-xl);
	}

	.text-famiglia {
		color: var(--color-famiglia);
	}

	.text-police {
		color: var(--color-police);
	}
</style>
