<script lang="ts">
	import type { Player, Mission } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import TextButton from '$lib/components/ui/TextButton.svelte';

	interface Props {
		mission: Mission;
		players: Player[];
		consecutiveRejections: number;
		onVote: (approved: boolean) => void;
	}

	let { mission, players, consecutiveRejections, onVote }: Props = $props();

	const teamMembers = $derived(
		mission.team.map((id) => players.find((p) => p.id === id)!.name)
	);
</script>

<div class="team-vote">
	<h2 class="title anim-slide-down">{$t.teamVote.title}</h2>

	<!-- Proposed Team with wooden boards -->
	<div class="crew-section anim-slide-up" style="--delay: 100ms">
		<p class="section-label">{$t.teamVote.proposedTeam}</p>
		<div class="crew-list">
			{#each teamMembers as name, i}
				<div class="crew-board" style="--delay: {150 + i * 50}ms">
					<span class="crew-name">{name}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Instructions -->
	<div class="instruction-section anim-fade-in" style="--delay: 200ms">
		<p class="instruction">{$t.teamVote.voteInstruction}</p>
	</div>

	<div class="spacer"></div>

	<!-- Vote Buttons -->
	<div class="vote-buttons anim-slide-up" style="--delay: 300ms">
		<TextButton variant="success" size="medium" onclick={() => onVote(true)}>
			{$t.teamVote.approve}
		</TextButton>
		<TextButton variant="danger" size="medium" onclick={() => onVote(false)}>
			{$t.teamVote.reject}
		</TextButton>
	</div>
</div>

<style>
	.team-vote {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	/* === TITLE === */
	.title {
		font-family: var(--font-display);
		font-size: var(--text-4xl);
		font-weight: var(--font-weight-bold);
		text-align: center;
		text-transform: uppercase;
		margin: 0 0 var(--spacing-lg) 0;
	}

	/* === CREW SECTION === */
	.crew-section {
		margin-bottom: var(--spacing-lg);
	}

	.section-label {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--spacing-md) 0;
		text-align: center;
	}

	/* === CREW LIST (wooden boards) === */
	.crew-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.crew-board {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md) var(--spacing-lg);
		background: url('/board-crew.webp') center/contain no-repeat;
		aspect-ratio: 820/200;
		max-height: 55px;
		animation: boardIn 400ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
		transform: translateX(-10px);
	}

	@keyframes boardIn {
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.crew-name {
		font-family: 'Swash Break', var(--font-display);
		font-size: var(--text-2xl);
		color: #3d2a1a;
		text-transform: uppercase;
	}

	/* === INSTRUCTION === */
	.instruction-section {
		margin-bottom: var(--spacing-md);
	}

	.instruction {
		text-align: center;
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.5;
	}

	/* === SPACER === */
	.spacer {
		flex: 1;
		min-height: var(--spacing-md);
	}

	/* === VOTE BUTTONS === */
	.vote-buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
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
