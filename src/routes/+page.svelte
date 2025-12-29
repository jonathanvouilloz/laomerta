<script lang="ts">
	import '../app.css';
	import { gameStore, currentPlayer, currentLeader, currentMission } from '$lib/stores/gameStore';
	import { t } from '$lib/i18n';

	// Composants
	import HomeScreen from '$lib/components/HomeScreen.svelte';
	import SetupScreen from '$lib/components/SetupScreen.svelte';
	import PlayerTransition from '$lib/components/PlayerTransition.svelte';
	import RoleReveal from '$lib/components/RoleReveal.svelte';
	import MaskedScreen from '$lib/components/MaskedScreen.svelte';
	import MissionBoard from '$lib/components/MissionBoard.svelte';
	import TeamSelection from '$lib/components/TeamSelection.svelte';
	import TeamVote from '$lib/components/TeamVote.svelte';
	import SecretVote from '$lib/components/SecretVote.svelte';
	import MissionResult from '$lib/components/MissionResult.svelte';
	import MoleAccusation from '$lib/components/MoleAccusation.svelte';
	import GameEnd from '$lib/components/GameEnd.svelte';
	import NightPhase from '$lib/components/NightPhase.svelte';
	import SettingsModal from '$lib/components/SettingsModal.svelte';
	import HelpModal from '$lib/components/HelpModal.svelte';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';
	import TextButton from '$lib/components/ui/TextButton.svelte';

	// État local pour gérer les transitions
	let showMasked = $state(false);
	let votePlayerIndex = $state(0);
	let showVoterTransition = $state(true);

	// État des modals
	let showSettings = $state(false);
	let showHelp = $state(false);

	// Masquer le bouton paramètres pendant les phases sensibles
	let hideSettingsButton = $derived(
		$gameStore.phase === 'distribution-reveal' ||
		($gameStore.phase === 'mission-secret-vote' && !showVoterTransition)
	);

	// Réinitialiser les états locaux quand on change de phase
	$effect(() => {
		if ($gameStore.phase === 'mission-secret-vote') {
			votePlayerIndex = 0;
			showVoterTransition = true;
		}
	});

	function handleRoleViewed() {
		showMasked = true;
	}

	function handleMaskedComplete() {
		showMasked = false;
		gameStore.roleViewed();
	}

	function handleSecretVoteTransitionConfirm() {
		showVoterTransition = false;
	}

	function handleSecretVote(success: boolean) {
		gameStore.submitSecretVote(success);
		const mission = $gameStore.missions[$gameStore.currentMissionIndex];
		if ($gameStore.currentPlayerIndex < mission.team.length - 1) {
			showVoterTransition = true;
		}
	}

	// Obtenir le joueur actuel pour le vote secret
	function getCurrentVoter() {
		const mission = $gameStore.missions[$gameStore.currentMissionIndex];
		const voterId = mission.team[$gameStore.currentPlayerIndex];
		return $gameStore.players.find((p) => p.id === voterId)!;
	}
</script>

<svelte:head>
	<title>Isla Plomo</title>
	<meta name="description" content={$t.meta.description} />
</svelte:head>

<main class="container">
	{#if $gameStore.phase === 'home'}
		<HomeScreen onShowHelp={() => showHelp = true} />
	{:else if $gameStore.phase === 'setup'}
		<SetupScreen />
	{:else if $gameStore.phase === 'distribution'}
		<PlayerTransition
			player={$currentPlayer}
			onConfirm={() => gameStore.confirmPlayerReady()}
		/>
	{:else if $gameStore.phase === 'distribution-reveal'}
		{#if showMasked}
			<MaskedScreen onContinue={handleMaskedComplete} />
		{:else}
			<RoleReveal
				player={$currentPlayer}
				allPlayers={$gameStore.players}
				onConfirm={handleRoleViewed}
			/>
		{/if}
	{:else if $gameStore.phase === 'night-phase'}
		<NightPhase
			useSpecialRoles={$gameStore.useSpecialRoles}
			onComplete={() => gameStore.startGame()}
		/>
	{:else if $gameStore.phase === 'mission-team-selection'}
		<div class="mission-screen">
			<MissionBoard />
			<div class="mt-lg">
				<TeamSelection
					players={$gameStore.players}
					mission={$currentMission}
					leaderName={$currentLeader.name}
					onSubmit={(ids) => gameStore.proposeTeam(ids)}
				/>
			</div>
		</div>
	{:else if $gameStore.phase === 'mission-team-vote'}
		<div class="mission-screen">
			<MissionBoard />
			<div class="vote-section">
				<TeamVote
					mission={$currentMission}
					players={$gameStore.players}
					consecutiveRejections={$gameStore.consecutiveRejections}
					onVote={(approved) => gameStore.voteTeam(approved)}
				/>
			</div>
		</div>
	{:else if $gameStore.phase === 'mission-secret-vote'}
		{@const voter = getCurrentVoter()}
		{#if showVoterTransition}
			<PlayerTransition
				player={voter}
				message={$t.transitions.secretVotePass}
				onConfirm={handleSecretVoteTransitionConfirm}
			/>
		{:else}
			<SecretVote
				player={voter}
				allPlayers={$gameStore.players}
				onVote={handleSecretVote}
			/>
		{/if}
	{:else if $gameStore.phase === 'mission-result-pending'}
		<div class="result-pending">
			<div class="operation-badge">
				{$t.teamSelection.mission($currentMission.number)}
			</div>
			<TextButton size="medium" onclick={() => gameStore.revealMissionResult()}>
				{$t.transitions.seeResult}
			</TextButton>
		</div>
	{:else if $gameStore.phase === 'mission-result'}
		<MissionResult
			mission={$currentMission}
			onContinue={() => gameStore.continueAfterResult()}
		/>
	{:else if $gameStore.phase === 'accusation'}
		<MoleAccusation
			players={$gameStore.players}
			onAccuse={(id) => gameStore.accusePlayer(id)}
		/>
	{:else if $gameStore.phase === 'end'}
		<GameEnd
			winner={$gameStore.winner!}
			winReasonKey={$gameStore.winReasonKey!}
			players={$gameStore.players}
			missions={$gameStore.missions}
			accusedPlayerId={$gameStore.accusedPlayerId}
			onNewGame={() => gameStore.goToSetup()}
			onHome={() => gameStore.returnHome()}
		/>
	{/if}
</main>

<!-- Bouton Paramètres -->
{#if !hideSettingsButton}
	<button
		class="settings-btn"
		onclick={() => showSettings = true}
		aria-label={$t.settings.title}
	>
		<img src="/settings.webp" alt="" width="35" height="35" />
	</button>
{/if}

<!-- Modals -->
{#if showSettings}
	<SettingsModal
		onClose={() => showSettings = false}
		onShowHelp={() => {
			showSettings = false;
			showHelp = true;
		}}
	/>
{/if}

{#if showHelp}
	<HelpModal onClose={() => showHelp = false} />
{/if}

<style>
	.mission-screen {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: var(--spacing-md);
	}

	.vote-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-top: var(--spacing-lg);
	}

	.result-pending {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: 15dvh;
		background-image: url('/background-vote.webp');
		background-size: cover;
		background-position: center;
	}

	.operation-badge {
		position: fixed;
		top: var(--spacing-lg);
		left: var(--spacing-lg);
		z-index: 10;
		padding: var(--spacing-xs) var(--spacing-md);
		background: rgba(0, 0, 0, 0.9);
		font-family: var(--font-display);
		font-size: var(--text-base);
		color: var(--color-good);
		text-transform: uppercase;
		transform: rotate(-2deg);
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
	}

	/* Bouton Paramètres */
	:global(.settings-btn) {
		position: fixed;
		top: var(--spacing-md);
		right: var(--spacing-md);
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	:global(.settings-btn:hover) {
		transform: rotate(45deg);
	}

	:global(.settings-btn:active) {
		transform: rotate(45deg) scale(0.95);
	}
</style>
