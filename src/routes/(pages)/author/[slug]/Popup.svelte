<script lang="ts">
	import type { IProject } from "$lib/data";
	import cross from "./cross.svg";
	import arrow from "./arrow_white.svg";
	import { trapFocus } from "$lib/trapFocus.svelte";
	import { fade } from "svelte/transition";

	interface Props {
		project: IProject | null;
		close: () => void;
		selectNext: () => void;
		selectPrev: () => void;
	}
	let { project, close, selectNext, selectPrev }: Props = $props();
</script>

{#if project}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		use:trapFocus
		transition:fade
		class="popup"
		onclick={(e) => {
			if (e.target == e.currentTarget) close();
		}}
	>
		<div class="container">
			{#key project}
				<img
					class="img"
					src={project.img}
					alt={project.name}
					transition:fade={{ duration: 250 }}
				/>
			{/key}
			<div class="content">
				<div class="header">
					<div class="btns">
						<button onclick={selectPrev}>
							<img src={arrow} alt="предыдущее" />
						</button>
						<button onclick={selectNext}>
							<img src={arrow} alt="следующее" />
						</button>
					</div>
					<button onclick={close}>
						<img src={cross} alt="закрыть" />
					</button>
				</div>
				<div class="body">
					<h2>{project.name}</h2>
					<h3>{project.subtitle}</h3>
					<p>{project.text}</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.popup {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
		background: #000000e6;
	}

	.container {
		position: relative;
		display: flex;
		width: 85vw;
		height: 85vh;
	}

	@media screen and (max-width: 600px) {
		.container {
			width: 100%;
			height: 100%;
		}
	}

	.img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1.5rem;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.4) 0%,
			rgba(0, 0, 0, 0.645082) 62%,
			rgba(0, 0, 0, 0.8) 100%
		);
		z-index: 1;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}
	@media screen and (max-width: 600px) {
		.header {
			flex-direction: row-reverse;
		}
	}

	.btns {
		display: flex;
		gap: 1.1rem;
	}
	.btns button {
		width: 2.25rem;
		height: 2.25rem;
	}
	.btns button:first-child img {
		rotate: 180deg;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: white;
	}

	.body h2 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 300;
		font-size: 2.5rem;
		text-transform: uppercase;
	}
	@media screen and (max-width: 600px) {
		.body h2 {
			font-size: 2rem;
		}
	}
	.body h3 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 1.25rem;
		line-height: 1.5;
		text-transform: uppercase;
	}
	.body p {
		max-width: 470px;
		font-weight: 300;
		line-height: 1.5;
		text-wrap-style: pretty;
	}
</style>
