<script lang="ts">
	import type { Player, Role } from '$lib/types/game';
	import { getRoleInfo, getTeamName } from '$lib/utils/roles';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import TextButton from '$lib/components/ui/TextButton.svelte';
	
	interface Props {
		player: Player;
		allPlayers: Player[];
		onConfirm: () => void;
	}

	let { player, allPlayers, onConfirm }: Props = $props();

	let canConfirm = $state(false);
	let countdown = $state(1);

	const roleInfo = $derived(getRoleInfo(player, allPlayers, $t));

	const roleImages: Record<Role, string> = {
		loyalist: '/isla-plomo/the-loyalist.webp',
		spy: '/isla-plomo/the-spy.webp',
		assassin: '/isla-plomo/the-assassin.webp',
		merlin: '/isla-plomo/the-mole.webp'
	};

	const roleImage = $derived(roleInfo?.role ? roleImages[roleInfo.role] : '');

	onMount(() => {
		const interval = setInterval(() => {
			countdown--;
			if (countdown <= 0) {
				canConfirm = true;
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="reveal" class:good={roleInfo.team === 'good'} class:evil={roleInfo.team === 'evil'}>
	<!-- Full-screen background image -->
	<div class="bg-image" style="background-image: url({roleImage})"></div>

	<!-- Dark overlay -->
	<div class="overlay"></div>

	<!-- Team Badge (top-left) -->
	<div class="team-badge anim-fade-in" style="--delay: 100ms">
		{getTeamName(roleInfo.team, $t)}
	</div>

	<!-- Content area -->
	<div class="content">
		<!-- Role Banner (tilted) -->
		<div class="role-banner anim-scale-in" style="--delay: 200ms">
			<h1 class="role-name">{roleInfo.name}</h1>
		</div>

		<!-- Description -->
		<p class="role-description anim-fade-in" style="--delay: 300ms">
			{roleInfo.description}
		</p>
	</div>

	<!-- Action Button -->
	<div class="action-section anim-slide-up" style="--delay: 500ms">
		<TextButton disabled={!canConfirm} onclick={onConfirm}>
			{#if canConfirm}
				{$t.roleReveal.understood}
			{:else}
				{$t.roleReveal.wait(countdown)}
			{/if}
		</TextButton>
	</div>
</div>

<style>
	.reveal {
		--accent-color: var(--color-accent);
		--accent-glow: rgba(233, 69, 96, 0.4);

		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 10;
	}

	.reveal.good {
		--accent-color: var(--color-good);
		--accent-glow: rgba(255, 109, 0, 0.4);
	}

	.reveal.evil {
		--accent-color: var(--color-evil);
		--accent-glow: rgba(0, 146, 255, 0.4);
	}

	/* === FULL-SCREEN BACKGROUND IMAGE === */
	.bg-image {
		position: fixed;
		inset: 0;
		background-size: cover;
		background-position: top center;
		z-index: 0;
	}

	/* === DARK OVERLAY (gradient from bottom) === */
	.overlay {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.9) 0%,
			rgba(0, 0, 0, 0.6) 25%,
			rgba(0, 0, 0, 0.2) 50%,
			transparent 75%
		);
		z-index: 1;
	}

	/* === CONTENT (centered) === */
	.content {
		position: relative;
		z-index: 2;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 0 var(--spacing-lg);
		padding-bottom: var(--spacing-xl);
		text-align: center;
	}

	/* === TEAM BADGE (top-left, tilted) === */
	.team-badge {
		position: fixed;
		top: var(--spacing-lg);
		left: var(--spacing-lg);
		z-index: 10;
		padding: var(--spacing-xs) var(--spacing-md);
		background: rgba(0, 0, 0, 0.9);
		font-family: var(--font-display);
		font-size: var(--text-base);
		color: var(--accent-color);
		text-transform: uppercase;
		transform: rotate(-2deg);
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
	}

	/* === ROLE BANNER (tilted black strip) === */
	.role-banner {
		width: 120vw;
		margin-left: -10vw;
		padding: var(--spacing-lg) var(--spacing-xl);
		background: rgba(0, 0, 0, 0.95);
		transform: rotate(-5deg);
		margin-bottom: var(--spacing-xl);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
	}

	/* === ROLE NAME === */
	.role-name {
		font-family: var(--font-display);
		font-size: 3rem;
		color: var(--accent-color);
		margin: 0;
		text-transform: uppercase;
		transform: rotate(1deg);
		text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
	}

	/* === DESCRIPTION === */
	.role-description {
		font-size: var(--text-base);
		color: var(--color-text);
		line-height: 1.6;
		margin: 0;
		max-width: 320px;
		padding: 0 var(--spacing-md);
	}

	/* === KNOWN PLAYERS SECTION === */
	.known-section {
		position: relative;
		z-index: 2;
		padding: 0 var(--spacing-lg) var(--spacing-md);
		text-align: center;
	}

	.known-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0 0 var(--spacing-md) 0;
	}

	.player-chips {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		padding: var(--spacing-xs) var(--spacing-md);
		border-radius: var(--radius-full);
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		animation: chipReveal 400ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: scale(0.9);
	}

	@keyframes chipReveal {
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.chip-evil {
		background: rgba(233, 69, 96, 0.2);
		color: var(--color-evil);
		border: 1px solid rgba(233, 69, 96, 0.3);
	}

	.chip-good {
		background: rgba(78, 204, 163, 0.2);
		color: var(--color-good);
		border: 1px solid rgba(78, 204, 163, 0.3);
	}

	/* === ACTION SECTION === */
	.action-section {
		position: relative;
		z-index: 2;
		padding: var(--spacing-lg);
		padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
		text-align: center;
	}

	/* === ANIMATIONS === */
	.anim-scale-in {
		animation: scaleIn 600ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: scale(0.9);
	}

	@keyframes scaleIn {
		to {
			opacity: 1;
			transform: scale(1);
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
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.anim-fade-in {
		animation: fadeIn 500ms ease forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
</style>
