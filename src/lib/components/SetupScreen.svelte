<script lang="ts">
	import { gameStore } from '$lib/stores/gameStore';
	import { getMissionConfig } from '$lib/utils/missions';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let playerCount = $state(5);
	let playerNames: string[] = $state(Array(10).fill(''));
	let useSpecialRoles = $state(false);
	let showRoles = $state(false);

	const currentConfig = $derived(playerCount >= 5 && playerCount <= 10 ? getMissionConfig(playerCount) : null);
	const canUseSpecialRoles = $derived(currentConfig?.specialRolesAvailable ?? false);
	const specialRolesRecommended = $derived(currentConfig?.specialRolesRecommended ?? false);

	const validNames = $derived(playerNames.slice(0, playerCount).filter((name) => name.trim().length > 0));
	const canStart = $derived(validNames.length === playerCount);

	function handleStart() {
		const names = playerNames.slice(0, playerCount).map((n) => n.trim());
		gameStore.setPlayers(names);
		gameStore.setSpecialRoles(useSpecialRoles && canUseSpecialRoles);
		gameStore.startDistribution();
	}
</script>

<div class="setup">
	<h2 class="title anim-slide-down">{$t.setup.title}</h2>

	<!-- Player Count Selection -->
	<div class="section anim-slide-up" style="--delay: 100ms">
		<Card variant="default" padding="lg">
			<p class="section-label">{$t.setup.playerCountLabel}</p>
			<div class="player-counter">
				<button
					class="counter-btn"
					onclick={() => (playerCount = Math.max(5, playerCount - 1))}
					disabled={playerCount <= 5}
					aria-label="Diminuer"
				>
					-
				</button>
				<span class="counter-value">{playerCount}</span>
				<button
					class="counter-btn"
					onclick={() => (playerCount = Math.min(10, playerCount + 1))}
					disabled={playerCount >= 10}
					aria-label="Augmenter"
				>
					+
				</button>
			</div>
			{#if currentConfig}
				<p class="config-info">
					{$t.setup.goodVsEvil(currentConfig.goodCount, currentConfig.evilCount)}
				</p>
			{/if}
		</Card>
	</div>

	<!-- Player Names -->
	<div class="section anim-slide-up" style="--delay: 200ms">
		<Card variant="default" padding="lg">
			<p class="section-label">{$t.setup.playerNames}</p>
			<div class="names-grid">
				{#each { length: playerCount } as _, i}
					<div class="input-wrapper">
						<span class="input-number">{i + 1}</span>
						<input
							type="text"
							class="input"
							placeholder={$t.setup.playerPlaceholder(i + 1)}
							bind:value={playerNames[i]}
							maxlength="20"
						/>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<!-- Special Roles Toggle -->
	<div class="section anim-slide-up" style="--delay: 300ms">
		<Card variant="default" padding="lg">
			<p class="section-label">{$t.setup.specialRoles}</p>

			<!-- Switch stylisé -->
			<button
				class="switch-container"
				class:disabled={!canUseSpecialRoles}
				class:active={useSpecialRoles && canUseSpecialRoles}
				onclick={() => canUseSpecialRoles && (useSpecialRoles = !useSpecialRoles)}
				disabled={!canUseSpecialRoles}
			>
				<span class="switch-label">OFF</span>
				<span class="switch-track">
					<span class="switch-thumb"></span>
				</span>
				<span class="switch-label">ON</span>
			</button>

			<!-- Status text -->
			<p class="status-text">
				{#if !canUseSpecialRoles}
					{$t.setup.notAvailable(playerCount)}
				{:else if specialRolesRecommended}
					{$t.setup.recommended}
				{:else}
					{$t.setup.optional}
				{/if}
			</p>

			<!-- Accordéon pour les règles -->
			<button class="accordion-trigger" onclick={() => (showRoles = !showRoles)}>
				<span>{showRoles ? $t.setup.hideRoles : $t.setup.showRoles}</span>
				<span class="accordion-icon">{showRoles ? '▲' : '▼'}</span>
			</button>

			{#if showRoles}
				<div class="roles-accordion">
					<div class="role-card good">
						<span class="role-name">{$t.roles.merlin.name}</span>
						<span class="role-desc">{$t.roles.merlin.description}</span>
					</div>
					<div class="role-card evil">
						<span class="role-name">{$t.roles.assassin.name}</span>
						<span class="role-desc">{$t.roles.assassin.description}</span>
					</div>
				</div>
			{/if}
		</Card>
	</div>

	<div class="spacer"></div>

	<!-- Action Buttons -->
	<div class="actions anim-slide-up" style="--delay: 400ms">
		<CornerButton team="neutral" disabled={!canStart} onclick={handleStart}>
			{$t.setup.startGame}
		</CornerButton>

		<CornerButton team="neutral" onclick={() => gameStore.returnHome()}>
			{$t.setup.back}
		</CornerButton>
	</div>
</div>

<style>
	.setup {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: var(--spacing-lg);
		gap: var(--spacing-md);
	}

	/* === TITLE === */
	.title {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		text-transform: uppercase;
		text-align: center;
		margin: 0 0 var(--spacing-sm) 0;
		color: var(--color-text);
	}

	/* === SECTIONS === */
	.section {
		width: 100%;
	}

	.section-label {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--spacing-md) 0;
	}

	/* === PLAYER COUNTER === */
	.player-counter {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-lg);
	}

	.counter-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 88px;
		height: 88px;
		border: none;
		border-radius: 50%;
		background: transparent;
		color: var(--color-text);
		font-family: var(--font-display);
		font-size: 5rem;
		line-height: 1;
		cursor: pointer;
		transition:
			color 150ms ease,
			transform 150ms ease,
			opacity 150ms ease;
	}

	.counter-btn:hover:not(:disabled) {
		color: var(--color-accent);
		transform: scale(1.1);
	}

	.counter-btn:active:not(:disabled) {
		transform: scale(0.95);
	}

	.counter-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.counter-value {
		font-family: var(--font-display);
		font-size: 5rem;
		color: var(--color-accent);
		min-width: 80px;
		text-align: center;
		text-shadow: 0 0 20px rgba(255, 109, 0, 0.4);
	}

	.config-info {
		margin: var(--spacing-md) 0 0 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-align: center;
	}

	/* === NAMES GRID === */
	.names-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.input-number {
		width: 24px;
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-muted);
		text-align: center;
	}

	.input {
		flex: 1;
		padding: var(--spacing-md);
		border: 2px solid var(--color-surface-light);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		color: var(--color-text);
		font-family: var(--font-family);
		font-size: var(--text-base);
		transition: border-color 150ms ease, box-shadow 150ms ease;
	}

	.input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.1);
	}

	.input::placeholder {
		color: var(--color-text-muted);
		opacity: 0.6;
	}

	/* === SWITCH === */
	.switch-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: var(--font-family);
		width: 100%;
		transition: opacity 200ms ease;
	}

	.switch-container.disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.switch-label {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-muted);
		min-width: 32px;
		transition: color 200ms ease;
	}

	.switch-container.active .switch-label:last-of-type {
		color: var(--color-accent);
	}

	.switch-container:not(.active) .switch-label:first-of-type {
		color: var(--color-text);
	}

	.switch-track {
		width: 64px;
		height: 32px;
		background: var(--color-surface-light);
		border-radius: 16px;
		position: relative;
		transition: background-color 200ms ease;
	}

	.switch-container.active .switch-track {
		background: var(--color-accent);
	}

	.switch-thumb {
		position: absolute;
		width: 26px;
		height: 26px;
		background: var(--color-text);
		border-radius: 50%;
		top: 3px;
		left: 3px;
		transition: transform 200ms ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.switch-container.active .switch-thumb {
		transform: translateX(32px);
	}

	/* === STATUS TEXT === */
	.status-text {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-align: center;
	}

	/* === ACCORDION === */
	.accordion-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		width: 100%;
		margin-top: var(--spacing-md);
		padding: var(--spacing-sm) var(--spacing-md);
		background: transparent;
		border: 1px solid var(--color-surface-light);
		border-radius: var(--radius-md);
		color: var(--color-text-muted);
		font-family: var(--font-family);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: border-color 150ms ease, color 150ms ease;
	}

	.accordion-trigger:hover {
		border-color: var(--color-accent);
		color: var(--color-text);
	}

	.accordion-icon {
		font-size: var(--text-xs);
	}

	.roles-accordion {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin-top: var(--spacing-md);
		animation: accordionOpen 200ms ease;
	}

	@keyframes accordionOpen {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.role-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: var(--spacing-md);
		background: var(--color-surface-light);
		border-radius: var(--radius-md);
		border-left: 3px solid;
	}

	.role-card.good {
		border-left-color: var(--color-good);
	}

	.role-card.evil {
		border-left-color: var(--color-evil);
	}

	.role-name {
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
	}

	.role-desc {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.4;
	}

	/* === SPACER === */
	.spacer {
		flex: 1;
		min-height: var(--spacing-md);
	}

	/* === ACTIONS === */
	.actions {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	/* === ANIMATIONS === */
	.anim-slide-down {
		animation: slideDown 500ms var(--ease-out-expo) forwards;
		opacity: 0;
	}

	@keyframes slideDown {
		0% {
			opacity: 0;
			transform: translateY(-16px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.anim-slide-up {
		animation: slideUp 500ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes slideUp {
		0% {
			opacity: 0;
			transform: translateY(16px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
