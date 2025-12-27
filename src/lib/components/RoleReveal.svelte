<script lang="ts">
	import type { Player, Role } from '$lib/types/game';
	import { getRoleInfo, getTeamName } from '$lib/utils/roles';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

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
		mafioso: '/omerta/the-mafioso.png',
		policier: '/omerta/the-detective.png',
		enqueteur: '/omerta/the-investigator.png',
		taupe: '/omerta/the-mole.png'
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

<div class="reveal" class:famiglia={roleInfo.team === 'famiglia'} class:police={roleInfo.team === 'police'}>
	<!-- Full-screen background image -->
	<div class="bg-image" style="background-image: url({roleImage})"></div>

	<!-- Dark overlay -->
	<div class="overlay"></div>

	<!-- Content at bottom -->
	<div class="content">
		<div class="text-banner">
			<!-- Team Badge -->
			<div class="team-badge anim-fade-in" style="--delay: 100ms">
				<span class="team-indicator"></span>
				<span class="team-text">{getTeamName(roleInfo.team, $t)}</span>
			</div>

			<!-- Role Name -->
			<h1 class="role-name anim-scale-in" style="--delay: 200ms">
				{roleInfo.name}
			</h1>

			<!-- Description -->
			<p class="role-description anim-fade-in" style="--delay: 300ms">
				{roleInfo.description}
			</p>
		</div>
	</div>

	<!-- Action Button -->
	<div class="action-section anim-slide-up" style="--delay: 500ms">
		<CornerButton team={roleInfo.team} disabled={!canConfirm} onclick={onConfirm}>
			{#if canConfirm}
				{$t.roleReveal.understood}
			{:else}
				{$t.roleReveal.wait(countdown)}
			{/if}
		</CornerButton>
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

	.reveal.famiglia {
		--accent-color: var(--color-famiglia);
		--accent-glow: rgba(78, 204, 163, 0.4);
	}

	.reveal.police {
		--accent-color: var(--color-police);
		--accent-glow: rgba(233, 69, 96, 0.4);
	}

	/* === FULL-SCREEN BACKGROUND IMAGE === */
	.bg-image {
		position: fixed;
		inset: 0;
		background-size: cover;
		background-position: top center;
		z-index: 0;
	}

	/* === DARK OVERLAY (lighter at top to show character) === */
	.overlay {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(22, 33, 62, 0.1) 0%,
			rgba(22, 33, 62, 0.2) 30%,
			rgba(22, 33, 62, 0.4) 60%,
			rgba(22, 33, 62, 0.6) 100%
		);
		z-index: 1;
	}

	/* === CONTENT (at bottom) === */
	.content {
		position: relative;
		z-index: 2;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 0;
		text-align: center;
	}

	/* === TEXT BANNER (black overlay strip) === */
	.text-banner {
		width: 100%;
		padding: var(--spacing-xl) var(--spacing-lg);
		margin-bottom: var(--spacing-2xl);
		background: rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(8px);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	/* === TEAM BADGE === */
	.team-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-xs) var(--spacing-md);
		background: rgba(0, 0, 0, 0.4);
		border-radius: var(--radius-full);
		margin-bottom: var(--spacing-lg);
		backdrop-filter: blur(8px);
	}

	.team-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent-color);
		border: 2px solid var(--accent-color);
		box-shadow: 0 0 10px var(--accent-color), 0 0 20px var(--accent-color);
		animation: indicatorPulse 2s ease-in-out infinite;
	}

	@keyframes indicatorPulse {
		0%, 100% { box-shadow: 0 0 10px var(--accent-color); }
		50% { box-shadow: 0 0 20px var(--accent-color), 0 0 30px var(--accent-color); }
	}

	.team-text {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--accent-color);
	}

	/* === ROLE NAME === */
	.role-name {
		font-family: var(--font-family);
		font-size: var(--text-4xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--color-text);
		margin: 0 0 var(--spacing-md) 0;
		letter-spacing: 0.02em;
		text-shadow:
			0 2px 8px rgba(0, 0, 0, 0.5),
			0 0 60px var(--accent-glow);
	}

	/* === DESCRIPTION === */
	.role-description {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
		max-width: 320px;
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

	.chip-police {
		background: rgba(233, 69, 96, 0.2);
		color: var(--color-police);
		border: 1px solid rgba(233, 69, 96, 0.3);
	}

	.chip-famiglia {
		background: rgba(78, 204, 163, 0.2);
		color: var(--color-famiglia);
		border: 1px solid rgba(78, 204, 163, 0.3);
	}

	/* === ACTION SECTION === */
	.action-section {
		position: relative;
		z-index: 2;
		padding: var(--spacing-lg);
		padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
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
