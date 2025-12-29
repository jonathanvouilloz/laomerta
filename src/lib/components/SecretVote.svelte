<script lang="ts">
	import type { Player, Role } from '$lib/types/game';
	import { getRoleInfo, getTeamName } from '$lib/utils/roles';
	import { t } from '$lib/i18n';
	import TextButton from '$lib/components/ui/TextButton.svelte';

	interface Props {
		player: Player;
		allPlayers: Player[];
		onVote: (success: boolean) => void;
	}

	let { player, allPlayers, onVote }: Props = $props();

	const roleInfo = $derived(getRoleInfo(player, allPlayers, $t));

	const roleImages: Record<Role, string> = {
		loyalist: '/omerta/the-loyalist.webp',
		spy: '/omerta/the-spy.webp',
		assassin: '/omerta/the-assassin.webp',
		merlin: '/omerta/the-mole.webp'
	};

	const roleImage = $derived(roleInfo?.role ? roleImages[roleInfo.role] : '');
</script>

<div class="secret-vote" class:good={roleInfo.team === 'good'} class:evil={roleInfo.team === 'evil'}>
	<!-- Background image -->
	<div class="bg-image" style="background-image: url({roleImage})"></div>
	<div class="overlay"></div>

	<!-- Team Badge (top-left) -->
	<div class="team-badge anim-fade-in" style="--delay: 100ms">
		{getTeamName(roleInfo.team, $t)}
	</div>

	<!-- Content -->
	<div class="content">
		<!-- Role Banner (tilted) -->
		<div class="role-banner anim-scale-in" style="--delay: 200ms">
			<h1 class="role-name">{roleInfo.name}</h1>
		</div>
	</div>

	<!-- Action Section -->
	<div class="action-section anim-slide-up" style="--delay: 300ms">
		<TextButton variant="success" size="small" onclick={() => onVote(true)}>
			{$t.secretVote.success}
		</TextButton>
		<TextButton variant="danger" size="small" onclick={() => onVote(false)}>
			{$t.secretVote.sabotage}
		</TextButton>
	</div>
</div>

<style>
	.secret-vote {
		--accent-color: var(--color-accent);
		--accent-glow: rgba(255, 109, 0, 0.4);

		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 10;
	}

	.secret-vote.good {
		--accent-color: var(--color-good);
		--accent-glow: rgba(255, 109, 0, 0.4);
	}

	.secret-vote.evil {
		--accent-color: var(--color-evil);
		--accent-glow: rgba(0, 146, 255, 0.4);
	}

	/* === BACKGROUND IMAGE === */
	.bg-image {
		position: fixed;
		inset: 0;
		background-size: cover;
		background-position: top center;
		z-index: 0;
	}

	/* === OVERLAY (gradient from bottom) === */
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

	/* === CONTENT === */
	.content {
		position: relative;
		z-index: 2;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 0 var(--spacing-lg);
		padding-bottom: var(--spacing-lg);
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

	/* === ROLE BANNER (full width) === */
	.role-banner {
		width: 120vw;
		margin-left: -10vw;
		padding: var(--spacing-lg) var(--spacing-xl);
		background: rgba(0, 0, 0, 0.95);
		margin-bottom: var(--spacing-xl);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
		transform: rotate(-5deg);
	}

	/* === ROLE NAME === */
	.role-name {
		font-family: var(--font-display);
		font-size: 3rem;
		color: var(--accent-color);
		margin: 0;
		padding-left: 1.5rem;
		text-transform: uppercase;
		text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
	}

	/* === ACTION SECTION === */
	.action-section {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		padding: var(--spacing-md) var(--spacing-lg);
		padding-bottom: calc(4rem + env(safe-area-inset-bottom));
		text-align: center;
	}

	/* === ANIMATIONS === */
	.anim-scale-in {
		animation: scaleIn 600ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: scale(0.9) rotate(-5deg);
	}

	@keyframes scaleIn {
		to {
			opacity: 1;
			transform: scale(1) rotate(-5deg);
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
