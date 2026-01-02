<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/ui/Button.svelte';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

	interface Props {
		hasWatcher: boolean;
		onComplete: () => void;
	}

	let { hasWatcher, onComplete }: Props = $props();

	type Mode = 'choice' | 'audio' | 'manual';
	let mode = $state<Mode>('choice');
	let isPlaying = $state(false);
	let currentAudioIndex = $state(0);

	// Construire la playlist selon la présence du Watcher
	const audioPlaylist = $derived(
		hasWatcher
			? ['/audio/narration-part1.mp3', '/audio/narration-part2.mp3', '/audio/narration-part3.mp3']
			: ['/audio/narration-part1.mp3', '/audio/narration-part3.mp3']
	);

	// Instructions pour le mode manuel
	const baseInstructions = $derived([
		$t.nightPhase.everyoneCloseEyes,
		$t.nightPhase.evilOpenEyes,
		$t.nightPhase.evilCloseEyes
	]);

	const watcherInstructions = $derived([
		$t.nightPhase.merlinOpenEyes,
		$t.nightPhase.merlinCloseEyes
	]);

	const instructions = $derived(
		hasWatcher
			? [...baseInstructions, ...watcherInstructions, $t.nightPhase.everyoneOpenEyes]
			: [...baseInstructions, $t.nightPhase.everyoneOpenEyes]
	);

	let audioElement: HTMLAudioElement | null = null;

	function startAudio() {
		mode = 'audio';
		isPlaying = true;
		currentAudioIndex = 0;
		playNextAudio();
	}

	function playNextAudio() {
		if (currentAudioIndex >= audioPlaylist.length) {
			// Tous les audios sont joués
			isPlaying = false;
			onComplete();
			return;
		}

		if (audioElement) {
			audioElement.src = audioPlaylist[currentAudioIndex];
			audioElement.play();
		}
	}

	function handleAudioEnded() {
		currentAudioIndex++;
		playNextAudio();
	}

	function startManual() {
		mode = 'manual';
	}

	function handleManualComplete() {
		onComplete();
	}
</script>

<div class="night-narration">
	<!-- Background overlay -->
	<div class="bg-overlay"></div>

	<!-- Stars background effect -->
	<div class="stars">
		{#each Array(20) as _, i}
			<div
				class="star"
				style="--delay: {i * 0.15}s; --x: {Math.random() * 100}%; --y: {Math.random() * 60}%"
			></div>
		{/each}
	</div>

	<!-- Hidden audio element -->
	<audio bind:this={audioElement} onended={handleAudioEnded}></audio>

	<!-- Content -->
	<div class="content">
		{#if mode === 'choice'}
			<h1 class="title">{$t.nightPhase.title}</h1>
			<p class="subtitle">{$t.nightNarration.chooseMode}</p>

			<div class="options">
				<Button variant="outline" onclick={startAudio}>
					{$t.nightNarration.audioMode}
				</Button>

				<Button variant="outline" onclick={startManual}>
					{$t.nightNarration.manualMode}
				</Button>
			</div>

		{:else if mode === 'audio'}
			<div class="audio-playing">
				<div class="audio-icon">🔊</div>
				<p class="audio-text">{$t.nightNarration.listening}</p>
				<div class="audio-progress">
					{#each audioPlaylist as _, i}
						<div
							class="progress-dot"
							class:active={i === currentAudioIndex}
							class:completed={i < currentAudioIndex}
						></div>
					{/each}
				</div>
			</div>

		{:else if mode === 'manual'}
			<h1 class="title">{$t.nightPhase.title}</h1>

			<div class="instructions-list">
				{#each instructions as instruction, i}
					<div class="instruction-item">
						<span class="instruction-number">{i + 1}.</span>
						<span class="instruction-text">{instruction}</span>
					</div>
				{/each}
			</div>

			<div class="action-section">
				<CornerButton team="neutral" onclick={handleManualComplete}>
					{$t.nightPhase.startGame}
				</CornerButton>
			</div>
		{/if}
	</div>
</div>

<style>
	.night-narration {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 10;
	}

	/* === BACKGROUND === */
	.bg-overlay {
		position: fixed;
		inset: 0;
		background: linear-gradient(
			180deg,
			#0a0a15 0%,
			#0f0f1f 40%,
			#1a1a2e 100%
		);
		z-index: 0;
	}

	/* === STARS === */
	.stars {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.star {
		position: absolute;
		width: 3px;
		height: 3px;
		background: white;
		border-radius: 50%;
		left: var(--x);
		top: var(--y);
		opacity: 0;
		animation: twinkle 2s ease-in-out infinite;
		animation-delay: var(--delay);
	}

	@keyframes twinkle {
		0%, 100% { opacity: 0.2; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.2); }
	}

	/* === CONTENT === */
	.content {
		position: relative;
		z-index: 2;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl);
		text-align: center;
	}

	/* === TITLE === */
	.title {
		font-family: var(--font-family);
		font-size: var(--text-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin: 0 0 var(--spacing-lg) 0;
	}

	.subtitle {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		margin: 0 0 var(--spacing-2xl) 0;
	}

	/* === OPTIONS === */
	.options {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		width: 100%;
		max-width: 280px;
	}

	/* === AUDIO PLAYING === */
	.audio-playing {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xl);
	}

	.audio-icon {
		font-size: 5rem;
		animation: pulse 1.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(1.1); opacity: 0.8; }
	}

	.audio-text {
		font-size: var(--text-xl);
		color: var(--color-text);
		margin: 0;
	}

	.audio-progress {
		display: flex;
		gap: var(--spacing-sm);
	}

	.progress-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		transition: all 300ms ease;
	}

	.progress-dot.active {
		background: var(--color-good);
		box-shadow: 0 0 10px var(--color-good);
		animation: pulse 1s ease-in-out infinite;
	}

	.progress-dot.completed {
		background: var(--color-text-muted);
	}

	/* === MANUAL INSTRUCTIONS === */
	.instructions-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		width: 100%;
		max-width: 320px;
		text-align: left;
		margin-bottom: var(--spacing-2xl);
	}

	.instruction-item {
		display: flex;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.instruction-number {
		font-weight: var(--font-weight-bold);
		color: var(--color-good);
		min-width: 1.5rem;
	}

	.instruction-text {
		color: var(--color-text);
		font-size: var(--text-base);
	}

	/* === ACTION SECTION === */
	.action-section {
		position: relative;
		z-index: 2;
		padding: var(--spacing-lg);
		padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
	}
</style>
