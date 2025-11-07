<script lang="ts">
	import arrowD from "./arrow.svg";
	import arrow from "$lib/arrow.svg";
	import Popup from "$lib/Popup/Popup.svelte";
	import { lt, lto } from "$lib/ltext";
	import type { IProject, LText } from "$lib";
	import { resolve } from "$app/paths";

	interface Props {
		projects: IProject[];
		title: LText;
	}
	const { projects, title }: Props = $props();
	const cards = $state([] as HTMLElement[]);
	let galleryEl: HTMLElement;
	let selected = $state(0);
	export function select(i: number, onlyHor = false) {
		selected = (i + projects.length) % projects.length;
		cards[selected].scrollIntoView({
			// @ts-ignore
			container: onlyHor ? "nearest" : "all",
			behavior: "smooth",
		});
	}
	export function selectNext() {
		select(selected + 1, true);
	}
	export function selectPrev() {
		select(selected - 1, true);
	}
	export function scrollIntoView() {
		galleryEl.scrollIntoView({ behavior: "smooth" });
	}

	let openedProject = $state(-1);
</script>

<Popup
	item={projects[openedProject]}
	close={() => {
		openedProject = -1;
	}}
	selectNext={() => {
		openedProject = (openedProject + 1 + projects.length) % projects.length;
	}}
	selectPrev={() => {
		openedProject = (openedProject - 1 + projects.length) % projects.length;
	}}
/>

<div class="gallery" bind:this={galleryEl}>
	<div class="title">
		<h2>{$lto(title)}</h2>
		<div class="pager">
			<span>{selected < 9 ? "0" : ""}{selected + 1}</span>
			<span> — </span>
			<span>{projects.length < 10 ? "0" : ""}{projects.length}</span>
		</div>
		<div class="btns">
			<button
				aria-label={$lt("предыдущее", "previous")}
				onclick={selectPrev}
			>
				<img src={arrow} alt={$lt("предыдущее", "previous")} />
			</button>
			<button aria-label={$lt("следующее", "next")} onclick={selectNext}>
				<img src={arrow} alt={$lt("следующее", "next")} />
			</button>
		</div>
	</div>
	<div class="carousel">
		<div class="carousel__content">
			{#each projects as proj, i}
				<div
					class={["project", { selected: i == selected }]}
					bind:this={cards[i]}
				>
					<div class="project__img">
						<img
							src={resolve(`/data/${proj.img}`)}
							alt={$lto(proj.name)}
						/>
					</div>
					<div class="project__subtitle">
						{$lto(proj.subtitle)}
					</div>
					<h3 class="project__title">{$lto(proj.name)}</h3>
					<button
						class="project__btn"
						onclick={() => {
							openedProject = i;
						}}
					>
						<span>{$lt("Читать больше", "Read more")}</span>
						<img src={arrowD} alt="" />
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.gallery {
		display: flex;
		flex-direction: column;
		gap: 2.25rem;
		margin-bottom: 6rem;
	}
	.title {
		align-self: flex-end;
		display: flex;
		align-items: flex-end;
		gap: 7rem;
	}
	@media screen and (max-width: 600px) {
		.gallery {
			margin-bottom: 3rem;
		}
		.title {
			align-self: stretch;
			justify-content: space-between;
			gap: 1rem;
		}
	}
	.title h2 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 3.75rem;
		text-transform: uppercase;
	}
	@media screen and (max-width: 1250px) {
		.title h2 {
			font-size: 3rem;
		}
	}
	@media screen and (max-width: 1000px) {
		.title h2 {
			font-size: 2.5rem;
		}
	}
	@media screen and (max-width: 600px) {
		.title h2 {
			font-size: 1.5rem;
		}
	}
	.pager {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		line-height: 1.5;
		text-transform: uppercase;
		color: #00000080;
		margin-right: 5rem;
		width: 4rem;
	}
	@media screen and (max-width: 1000px) {
		.pager {
			margin-right: 0rem;
		}
	}
	.btns {
		display: flex;
		gap: 1rem;
	}
	.btns button {
		width: 1.5rem;
		height: 1.5rem;
	}
	.btns img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.btns button:first-child img {
		rotate: 180deg;
	}
	.carousel {
		overflow: auto hidden;
	}
	.carousel::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
	.carousel__content {
		width: max-content;
		display: flex;
		gap: 1.5rem;
	}

	.project {
		--_w: max(280px, calc((min(100vw, 1600px) - 10rem) / 4));
		width: var(--_w);
		max-width: calc(100vw - 2rem);
		transition: width 250ms;
	}

	.selected {
		width: calc(var(--_w) * 2);
	}
	.project__img {
		height: 425px;
	}
	.project__img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.project__subtitle {
		margin-top: 1rem;
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.5;
		color: #00000080;
	}
	.project__title {
		margin-top: 0.25rem;
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 1.5rem;
		text-transform: uppercase;
	}
	.project__btn {
		display: flex;
		gap: 0.25rem;
		margin-top: 0.875rem;
		font-weight: 500;
		font-size: 0.75rem;
		text-transform: uppercase;
		color: #e63737;
	}
</style>
