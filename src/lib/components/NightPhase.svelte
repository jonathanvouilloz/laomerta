<script lang="ts">
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

	interface Props {
		useSpecialRoles: boolean;
		onComplete: () => void;
	}

	let { useSpecialRoles, onComplete }: Props = $props();

	interface Step {
		icon: string;
		text: string;
		subtext?: string;
	}

	const baseSteps: Step[] = $derived([
		{ icon: '😌', text: $t.nightPhase.everyoneCloseEyes },
		{ icon: '👁️', text: $t.nightPhase.policeOpenEyes, subtext: $t.nightPhase.policeIdentify },
		{ icon: '😌', text: $t.nightPhase.policeCloseEyes }
	]);

	const moleSteps: Step[] = $derived([
		{ icon: '👍', text: $t.nightPhase.policeThumbsUp },
		{ icon: '👁️', text: $t.nightPhase.moleOpenEyes, subtext: $t.nightPhase.moleSeePolice },
		{ icon: '😌', text: $t.nightPhase.moleCloseEyes, subtext: $t.nightPhase.policeThumbsDown }
	]);

	const finalStep: Step = $derived({
		icon: '🌙',
		text: $t.nightPhase.everyoneOpenEyes,
		subtext: $t.nightPhase.gameCanStart
	});

	const steps: Step[] = $derived(
		useSpecialRoles ? [...baseSteps, ...moleSteps, finalStep] : [...baseSteps, finalStep]
	);

	let currentStep = $state(0);

	const isLastStep = $derived(currentStep === steps.length - 1);
	const currentStepData = $derived(steps[currentStep]);

	function nextStep() {
		if (isLastStep) {
			onComplete();
		} else {
			currentStep++;
		}
	}
</script>

<div class="night-phase">
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

	<!-- Content -->
	<div class="content">
		<!-- Title -->
		<h1 class="title">{$t.nightPhase.title}</h1>

		<!-- Progress dots -->
		<div class="progress">
			{#each steps as _, i}
				<div class="dot" class:active={i === currentStep} class:completed={i < currentStep}></div>
			{/each}
		</div>

		<!-- Step content -->
		<div class="step-content" class:animate={true}>
			<div class="icon">{currentStepData.icon}</div>
			<p class="instruction">{currentStepData.text}</p>
			{#if currentStepData.subtext}
				<p class="subtext">{currentStepData.subtext}</p>
			{/if}
		</div>
	</div>

	<!-- Action button -->
	<div class="action-section">
		<CornerButton team="neutral" onclick={nextStep}>
			{isLastStep ? $t.nightPhase.startGame : $t.nightPhase.next}
		</CornerButton>
	</div>
</div>

<style>
	.night-phase {
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
		margin: 0 0 var(--spacing-xl) 0;
	}

	/* === PROGRESS DOTS === */
	.progress {
		display: flex;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-2xl);
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		transition: all 300ms ease;
	}

	.dot.active {
		background: var(--color-text);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
		transform: scale(1.2);
	}

	.dot.completed {
		background: var(--color-famiglia);
	}

	/* === STEP CONTENT === */
	.step-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-lg);
		animation: fadeSlideIn 400ms ease forwards;
	}

	@keyframes fadeSlideIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.icon {
		font-size: 5rem;
		line-height: 1;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.05); }
	}

	.instruction {
		font-size: var(--text-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		margin: 0;
		max-width: 300px;
		line-height: 1.3;
	}

	.subtext {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		margin: 0;
		max-width: 280px;
		line-height: 1.5;
	}

	/* === ACTION SECTION === */
	.action-section {
		position: relative;
		z-index: 2;
		padding: var(--spacing-lg);
		padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom));
	}
</style>
