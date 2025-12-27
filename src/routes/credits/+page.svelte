<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';
	import CornerButton from '$lib/components/ui/CornerButton.svelte';
</script>

<svelte:head>
	<title>Omertà - {$t.credits.title}</title>
</svelte:head>

<div class="credits-page">
	<!-- Film effects -->
	<div class="film-effects" aria-hidden="true">
		<div class="vignette"></div>
		<div class="film-grain"></div>
	</div>

	<!-- Back button -->
	<button class="back-btn" onclick={() => goto('/')} aria-label={$t.credits.back}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
	</button>

	<!-- Content -->
	<div class="credits-content">
		<h1 class="credits-title anim-fade-in">{$t.credits.title}</h1>

		<div class="credits-sections">
			<!-- Created by -->
			<section class="credit-section anim-fade-in" style="--delay: 100ms">
				<h2 class="section-label">{$t.credits.createdBy}</h2>
				<p class="section-value creator">Jonathan</p>
				<a href="https://jonlabs.ch" target="_blank" rel="noopener noreferrer" class="website-link">
					jonlabs.ch
				</a>
			</section>

			<div class="divider anim-fade-in" style="--delay: 200ms"></div>

			<!-- Inspired by -->
			<section class="credit-section anim-fade-in" style="--delay: 300ms">
				<h2 class="section-label">{$t.credits.inspiredBy}</h2>
				<p class="section-value">{$t.credits.originalGame}</p>
				<p class="section-author">{$t.credits.originalAuthor}</p>
			</section>

			<div class="divider anim-fade-in" style="--delay: 400ms"></div>

			<!-- Technologies -->
			<section class="credit-section anim-fade-in" style="--delay: 500ms">
				<h2 class="section-label">{$t.credits.technologies}</h2>
				<div class="tech-list">
					<span class="tech-badge">SvelteKit</span>
					<span class="tech-badge">TypeScript</span>
					<span class="tech-badge">CSS</span>
				</div>
			</section>
		</div>

		<!-- Version & Copyright -->
		<footer class="credits-footer anim-fade-in" style="--delay: 600ms">
			<p class="version">v1.0.0</p>
			<p class="copyright">© 2025</p>
		</footer>
	</div>

	<!-- Back button bottom -->
	<div class="back-zone anim-fade-in" style="--delay: 700ms">
		<CornerButton team="neutral" size="small" onclick={() => goto('/')}>
			{$t.credits.back}
		</CornerButton>
	</div>
</div>

<style>
	.credits-page {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: var(--spacing-xl);
		padding-bottom: max(var(--spacing-xl), env(safe-area-inset-bottom));
	}

	/* Film effects */
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

	/* Back button */
	.back-btn {
		position: absolute;
		top: var(--spacing-md);
		left: var(--spacing-md);
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: none;
		border-radius: var(--radius-full);
		background-color: rgba(22, 33, 62, 0.8);
		backdrop-filter: blur(8px);
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: var(--shadow-sm);
	}

	.back-btn:hover {
		background-color: var(--color-surface-light);
		color: var(--color-text);
		transform: translateX(-3px);
	}

	/* Content */
	.credits-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}

	.credits-title {
		font-size: var(--text-3xl);
		font-weight: var(--font-weight-extrabold);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		margin-bottom: var(--spacing-2xl);
		text-shadow: 0 0 40px rgba(233, 69, 96, 0.5);
	}

	.credits-sections {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		width: 100%;
		max-width: 320px;
	}

	.credit-section {
		text-align: center;
	}

	.section-label {
		font-size: var(--text-xs);
		font-weight: var(--font-weight-medium);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-xs);
	}

	.section-value {
		font-size: var(--text-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin: 0;
	}

	.section-value.creator {
		font-size: var(--text-xl);
		color: var(--color-accent);
	}

	.section-author {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-style: italic;
		margin: var(--spacing-xs) 0 0 0;
	}

	.website-link {
		display: inline-block;
		margin-top: var(--spacing-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.website-link:hover {
		color: var(--color-accent);
	}

	.divider {
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-border), transparent);
	}

	/* Tech badges */
	.tech-list {
		display: flex;
		justify-content: center;
		gap: var(--spacing-sm);
		flex-wrap: wrap;
		margin-top: var(--spacing-xs);
	}

	.tech-badge {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: rgba(233, 69, 96, 0.15);
		border: 1px solid rgba(233, 69, 96, 0.3);
		border-radius: var(--radius-sm);
		font-size: var(--text-xs);
		font-weight: var(--font-weight-medium);
		color: var(--color-text);
	}

	/* Footer */
	.credits-footer {
		margin-top: var(--spacing-2xl);
		text-align: center;
	}

	.version {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.copyright {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		opacity: 0.6;
		margin: var(--spacing-xs) 0 0 0;
	}

	/* Back zone */
	.back-zone {
		z-index: 1;
		max-width: 200px;
		margin: var(--spacing-xl) auto 0;
	}

	/* Animations */
	.anim-fade-in {
		animation: fadeIn 500ms ease forwards;
		animation-delay: var(--delay, 0ms);
		opacity: 0;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(10px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.film-grain {
			animation: none;
		}

		.anim-fade-in {
			animation-duration: 0.1s;
		}
	}
</style>
