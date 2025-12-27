<script lang="ts">
	import type { Player, Role } from '$lib/types/game';
	import { getRoleInfo, getTeamName } from '$lib/utils/roles';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

	interface Props {
		player: Player;
		allPlayers: Player[];
		onVote: (success: boolean) => void;
	}

	let { player, allPlayers, onVote }: Props = $props();

	const roleInfo = $derived(getRoleInfo(player, allPlayers, $t));

	const roleImages: Record<Role, string> = {
		mafioso: '/omerta/the-mafioso.png',
		policier: '/omerta/the-detective.png',
		enqueteur: '/omerta/the-investigator.png',
		taupe: '/omerta/the-mole.png'
	};

	const roleImage = $derived(roleInfo?.role ? roleImages[roleInfo.role] : '');
</script>

<div class="secret-vote" class:famiglia={roleInfo.team === 'famiglia'} class:police={roleInfo.team === 'police'}>
	<!-- Background image -->
	<div class="bg-image" style="background-image: url({roleImage})"></div>
	<div class="overlay"></div>

	<!-- Content at bottom -->
	<div class="content">
		<div class="text-banner anim-fade-in">
			<!-- Team Badge -->
			<div class="team-badge">
				<span class="team-indicator"></span>
				<span class="team-text">{getTeamName(roleInfo.team, $t)}</span>
			</div>

			<!-- Role Name -->
			<h1 class="role-name">{roleInfo.name}</h1>

			<!-- Instruction -->
			<p class="instruction">{$t.secretVote.instruction}</p>
		</div>
	</div>

	<!-- Action Section -->
	<div class="action-section anim-slide-up" style="--delay: 200ms">
		<CornerButton team="famiglia" size="small" onclick={() => onVote(true)}>
			{$t.secretVote.success}
		</CornerButton>
		<div class="button-gap"></div>
		<CornerButton team="police" size="small" onclick={() => onVote(false)}>
			{$t.secretVote.sabotage}
		</CornerButton>

		<!-- Tip -->
		<p class="tip">{$t.secretVote.tip}</p>
	</div>
</div>

<style>
	.secret-vote {
		--accent-color: var(--color-accent);
		--accent-glow: rgba(233, 69, 96, 0.4);

		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 10;
	}

	.secret-vote.famiglia {
		--accent-color: var(--color-famiglia);
		--accent-glow: rgba(78, 204, 163, 0.4);
	}

	.secret-vote.police {
		--accent-color: var(--color-police);
		--accent-glow: rgba(233, 69, 96, 0.4);
	}

	/* === BACKGROUND IMAGE === */
	.bg-image {
		position: fixed;
		inset: 0;
		background-size: cover;
		background-position: top center;
		z-index: 0;
	}

	/* === OVERLAY === */
	.overlay {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(10, 10, 10, 0.1) 0%,
			rgba(10, 10, 10, 0.3) 50%,
			rgba(10, 10, 10, 0.6) 100%
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

	/* === TEXT BANNER === */
	.text-banner {
		width: 100%;
		padding: var(--spacing-xl) var(--spacing-lg);
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
		margin-bottom: var(--spacing-md);
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
		font-size: var(--text-3xl);
		font-weight: var(--font-weight-extrabold);
		color: var(--color-text);
		margin: 0 0 var(--spacing-md) 0;
		letter-spacing: 0.02em;
		text-shadow:
			0 2px 8px rgba(0, 0, 0, 0.5),
			0 0 60px var(--accent-glow);
	}

	/* === INSTRUCTION === */
	.instruction {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
		max-width: 320px;
	}

	/* === ACTION SECTION === */
	.action-section {
		position: relative;
		z-index: 2;
		padding: var(--spacing-lg);
		padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
	}

	.button-gap {
		height: var(--spacing-md);
	}

	/* === TIP === */
	.tip {
		text-align: center;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: var(--spacing-lg) 0 0 0;
		opacity: 0.7;
		line-height: 1.5;
	}

	/* === ANIMATIONS === */
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
