<script lang="ts">
	import type { Player, Mission } from '$lib/types/game';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

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

	<!-- Proposed Team -->
	<div class="section anim-slide-up" style="--delay: 100ms">
		<Card variant="elevated" padding="lg">
			<p class="section-label">{$t.teamVote.proposedTeam}</p>
			<div class="team-list">
				{#each teamMembers as name}
					<Badge>{name}</Badge>
				{/each}
			</div>
		</Card>
	</div>

	<!-- Instructions -->
	<div class="section anim-fade-in" style="--delay: 200ms">
		<Card variant="default" padding="md">
			<p class="instruction">{$t.teamVote.voteInstruction}</p>
			{#if consecutiveRejections > 0}
				<p class="warning">
					{$t.teamVote.rejectionWarning(consecutiveRejections)}
				</p>
			{/if}
		</Card>
	</div>

	<div class="spacer"></div>

	<!-- Vote Buttons -->
	<div class="vote-buttons anim-slide-up" style="--delay: 300ms">
		<CornerButton team="good" size="small" onclick={() => onVote(true)}>
			{$t.teamVote.approve}
		</CornerButton>
		<CornerButton team="evil" size="small" onclick={() => onVote(false)}>
			{$t.teamVote.reject}
		</CornerButton>
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
		font-size: var(--text-2xl);
		font-weight: var(--font-weight-bold);
		text-align: center;
		margin: 0 0 var(--spacing-lg) 0;
	}

	/* === SECTIONS === */
	.section {
		margin-bottom: var(--spacing-md);
	}

	.section-label {
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--spacing-md) 0;
	}

	/* === TEAM LIST === */
	.team-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	/* === INSTRUCTION === */
	.instruction {
		text-align: center;
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.5;
	}

	.warning {
		text-align: center;
		color: var(--color-danger);
		font-size: var(--text-sm);
		font-weight: var(--font-weight-medium);
		margin: var(--spacing-sm) 0 0 0;
	}

	/* === SPACER === */
	.spacer {
		flex: 1;
		min-height: var(--spacing-lg);
	}

	/* === VOTE BUTTONS === */
	.vote-buttons {
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
