<script lang="ts">
	import { goto } from '$app/navigation';
	import { gameStore } from '$lib/stores/gameStore';
	import { t, locale } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';

	interface Props {
		onShowHelp?: () => void;
	}

	let { onShowHelp }: Props = $props();

	function handleStartGame() {
		gameStore.goToSetup();
	}

	function handleToggleLocale() {
		locale.toggle();
	}
</script>

<div class="home-cinematic">
	<!-- Film effects layer -->
	<div class="film-effects" aria-hidden="true">
		<div class="vignette"></div>
		<div class="film-grain"></div>
	</div>

	<!-- Decorative role silhouettes -->
	<div class="role-silhouettes" aria-hidden="true">
		<img src="/omerta/the-mafioso.png" alt="" class="silhouette s1" />
		<img src="/omerta/the-agent.png" alt="" class="silhouette s2" />
		<img src="/omerta/the-mole.png" alt="" class="silhouette s3" />
		<img src="/omerta/the-investigator.png" alt="" class="silhouette s4" />
	</div>

	<!-- Hero Scene -->
	<section class="hero-scene">
		<!-- Spotlight effect -->
		<div class="spotlight" aria-hidden="true"></div>

		<!-- Logo stage with smoke -->
		<div class="logo-stage">
			<div class="smoke smoke-left" aria-hidden="true"></div>
			<div class="smoke smoke-right" aria-hidden="true"></div>

			<div class="logo-wrapper anim-logo-reveal">
				<img src="/logo.png" alt="Omerta" class="logo-img" />
				<div class="logo-glow"></div>
				<div class="logo-shadow"></div>
			</div>
		</div>

		<!-- Title -->
		<h1 class="title-cinematic anim-title-glow">
			<span class="title-text">OMERTA</span>
		</h1>
		<div class="title-underline anim-underline"></div>
		<p class="tagline anim-fade-in" style="--delay: 1200ms">{$t.home.subtitle}</p>
	</section>

	<!-- Navigation Panel (fixed bottom) -->
	<nav class="nav-panel anim-slide-up" style="--delay: 1500ms">
		<div class="cta-zone">
			<CornerButton team="neutral" onclick={handleStartGame}>
				{$t.home.newGame}
			</CornerButton>
			<p class="info">
				{$t.home.playerCount} · {$t.home.singlePhone}
			</p>
		</div>

		<div class="nav-icons">
			{#if onShowHelp}
				<button class="nav-btn" onclick={onShowHelp} aria-label={$t.settings.help}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
						<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
					</svg>
					<span class="nav-label">{$t.settings.help}</span>
				</button>
			{/if}

			<button class="nav-btn" onclick={() => goto('/credits')} aria-label="Credits">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="16" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12.01" y2="8" />
				</svg>
				<span class="nav-label">Credits</span>
			</button>

			<button class="nav-btn" onclick={handleToggleLocale} aria-label={$t.settings.language}>
				<span class="lang-badge">{$locale.toUpperCase()}</span>
				<span class="nav-label">{$t.settings.language}</span>
			</button>
		</div>
	</nav>
</div>

<style>
	.home-cinematic {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		overflow: hidden;
	}

	/* === FILM EFFECTS === */
	.film-effects {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 10;
	}

	.vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at center,
			transparent 30%,
			rgba(0, 0, 0, 0.5) 100%
		);
	}

	.film-grain {
		position: absolute;
		inset: 0;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		animation: grainShift 0.3s steps(1) infinite;
	}

	@keyframes grainShift {
		0%, 100% { transform: translate(0, 0); }
		25% { transform: translate(-2%, -2%); }
		50% { transform: translate(2%, 2%); }
		75% { transform: translate(-1%, 1%); }
	}

	/* === ROLE SILHOUETTES === */
	.role-silhouettes {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		z-index: 0;
	}

	.silhouette {
		position: absolute;
		width: 100px;
		height: 100px;
		object-fit: contain;
		opacity: 0.04;
		filter: blur(1px) grayscale(100%);
		animation: silhouetteFloat 20s ease-in-out infinite;
	}

	.s1 {
		top: 8%;
		left: -15px;
		animation-delay: 0s;
	}

	.s2 {
		top: 12%;
		right: -20px;
		animation-delay: -5s;
	}

	.s3 {
		bottom: 35%;
		left: -10px;
		animation-delay: -10s;
	}

	.s4 {
		bottom: 40%;
		right: -15px;
		animation-delay: -15s;
	}

	@keyframes silhouetteFloat {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
			opacity: 0.04;
		}
		50% {
			transform: translateY(-15px) rotate(3deg);
			opacity: 0.06;
		}
	}

	/* === HERO SCENE === */
	.hero-scene {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl);
		padding-bottom: 0;
		z-index: 1;
		animation: fadeFromBlack 1.5s ease-out forwards;
	}

	@keyframes fadeFromBlack {
		0% {
			opacity: 0;
			filter: brightness(0);
		}
		50% {
			opacity: 1;
			filter: brightness(0.6);
		}
		100% {
			opacity: 1;
			filter: brightness(1);
		}
	}

	/* === SPOTLIGHT === */
	.spotlight {
		position: absolute;
		top: -60%;
		left: 50%;
		transform: translateX(-50%);
		width: 350px;
		height: 250%;
		background: conic-gradient(
			from 180deg at 50% 0%,
			transparent 55deg,
			rgba(233, 69, 96, 0.06) 85deg,
			rgba(233, 69, 96, 0.12) 90deg,
			rgba(233, 69, 96, 0.06) 95deg,
			transparent 125deg
		);
		filter: blur(40px);
		animation: spotlightSway 10s ease-in-out infinite;
	}

	@keyframes spotlightSway {
		0%, 100% { transform: translateX(-50%) rotate(-4deg); }
		50% { transform: translateX(-50%) rotate(4deg); }
	}

	/* === LOGO STAGE === */
	.logo-stage {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--spacing-lg);
	}

	.smoke {
		position: absolute;
		width: 180px;
		height: 250px;
		background: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0.04) 0%,
			transparent 70%
		);
		filter: blur(25px);
		animation: smokeDrift 15s ease-in-out infinite;
	}

	.smoke-left {
		left: -80px;
		top: -30px;
		animation-delay: -4s;
	}

	.smoke-right {
		right: -80px;
		top: -30px;
		animation-delay: -10s;
	}

	@keyframes smokeDrift {
		0%, 100% {
			transform: translateY(0) scale(1);
			opacity: 0.4;
		}
		50% {
			transform: translateY(-25px) scale(1.15);
			opacity: 0.7;
		}
	}

	/* === LOGO === */
	.logo-wrapper {
		position: relative;
		width: 260px;
		height: 260px;
	}

	.logo-img {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 0 30px rgba(233, 69, 96, 0.5));
	}

	.logo-glow {
		position: absolute;
		inset: -30px;
		z-index: 1;
		background: radial-gradient(
			circle at center,
			rgba(233, 69, 96, 0.35) 0%,
			rgba(233, 69, 96, 0.15) 40%,
			transparent 70%
		);
		border-radius: 50%;
		animation: logoGlow 4s ease-in-out infinite;
	}

	.logo-shadow {
		position: absolute;
		bottom: -20px;
		left: 50%;
		transform: translateX(-50%);
		width: 160px;
		height: 24px;
		background: radial-gradient(
			ellipse at center,
			rgba(0, 0, 0, 0.4) 0%,
			transparent 70%
		);
		filter: blur(8px);
	}

	@keyframes logoGlow {
		0%, 100% {
			opacity: 0.7;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.08);
		}
	}

	.anim-logo-reveal {
		animation: logoReveal 1.2s ease-out 0.4s both;
	}

	@keyframes logoReveal {
		0% {
			opacity: 0;
			transform: scale(0.85);
			filter: blur(15px);
		}
		100% {
			opacity: 1;
			transform: scale(1);
			filter: blur(0);
		}
	}

	/* === TITLE === */
	.title-cinematic {
		margin: 0;
		margin-bottom: var(--spacing-xs);
	}

	.title-text {
		font-family: var(--font-family);
		font-size: clamp(3rem, 15vw, 4.5rem);
		font-weight: var(--font-weight-extrabold);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-text);
		text-shadow:
			0 0 60px rgba(233, 69, 96, 0.7),
			0 0 120px rgba(233, 69, 96, 0.4),
			0 4px 8px rgba(0, 0, 0, 0.6);
	}

	.anim-title-glow {
		animation: titleGlow 2s ease-out 0.8s both;
	}

	@keyframes titleGlow {
		0% {
			opacity: 0;
			text-shadow: none;
		}
		40% {
			text-shadow: 0 0 100px rgba(233, 69, 96, 1);
		}
		100% {
			opacity: 1;
			text-shadow:
				0 0 60px rgba(233, 69, 96, 0.7),
				0 0 120px rgba(233, 69, 96, 0.4),
				0 4px 8px rgba(0, 0, 0, 0.6);
		}
	}

	.title-underline {
		width: 80px;
		height: 3px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--color-accent) 50%,
			transparent 100%
		);
		border-radius: 2px;
		margin-bottom: var(--spacing-md);
	}

	.anim-underline {
		animation: underlineReveal 0.8s ease-out 1s both;
	}

	@keyframes underlineReveal {
		0% {
			width: 0;
			opacity: 0;
		}
		100% {
			width: 80px;
			opacity: 1;
		}
	}

	.tagline {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
		font-style: italic;
		letter-spacing: 0.08em;
		margin: 0;
	}

	/* === NAVIGATION PANEL === */
	.nav-panel {
		position: relative;
		z-index: 5;
		padding: var(--spacing-lg);
		padding-bottom: max(var(--spacing-xl), env(safe-area-inset-bottom));
		background: linear-gradient(
			to top,
			rgba(26, 26, 46, 0.98) 0%,
			rgba(26, 26, 46, 0.85) 60%,
			transparent 100%
		);
	}

	.cta-zone {
		max-width: 320px;
		margin: 0 auto var(--spacing-2xl);
		text-align: center;
	}

	.info {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: var(--spacing-sm) 0 0 0;
		opacity: 0.9;
	}

	.nav-icons {
		display: flex;
		justify-content: center;
		gap: var(--spacing-2xl);
	}

	.nav-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm);
		min-width: 56px;
		background: transparent;
		border: none;
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.nav-btn:hover,
	.nav-btn:focus-visible {
		color: var(--color-accent);
		transform: translateY(-3px);
	}

	.nav-btn:active {
		transform: translateY(-1px);
	}

	.nav-btn svg {
		width: 26px;
		height: 26px;
	}

	.nav-label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		white-space: nowrap;
	}

	.lang-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		font-size: var(--text-xs);
		font-weight: var(--font-weight-bold);
		border: 2px solid currentColor;
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
	}

	.nav-btn:hover .lang-badge {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-bg);
	}

	/* === ANIMATIONS === */
	.anim-fade-in {
		animation: fadeIn 600ms ease forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	.anim-slide-up {
		animation: slideUp 600ms var(--ease-out-expo) forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}

	@keyframes slideUp {
		0% {
			opacity: 0;
			transform: translateY(30px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* === REDUCED MOTION === */
	@media (prefers-reduced-motion: reduce) {
		.spotlight,
		.smoke,
		.silhouette,
		.film-grain,
		.logo-glow {
			animation: none;
		}

		.hero-scene,
		.anim-logo-reveal,
		.anim-title-glow,
		.anim-underline,
		.anim-fade-in,
		.anim-slide-up {
			animation-duration: 0.3s;
		}
	}
</style>
