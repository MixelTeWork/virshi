<script lang="ts">
	import { resolve } from "$app/paths";
	import type { LText } from "$lib";
	import arrow from "$lib/arrow.svg";
	import { lto, lt } from "$lib/ltext";
	import { fade } from "svelte/transition";

	const { data } = $props();

	interface ICard {
		isEmpty: boolean;
		showOn?: "lg" | "md";
		w?: number;
		name?: LText;
		subtitle?: LText;
		text?: LText;
		img?: string;
		url?: string;
	}
	const cards: ICard[] = [];
	for (let i = 0; i < data.authors.length; i++) {
		const author = data.authors[i];
		let pushAfter: ICard | null = null;
		switch (Math.floor(i / 3) % 4) {
			case 0:
				if (i % 3 == 2) pushAfter = { isEmpty: true, showOn: "lg" };
				break;
			case 1:
				if (i % 3 == 0) cards.push({ isEmpty: true, showOn: "lg" });
				break;
			case 2:
				if (i % 3 == 2) cards.push({ isEmpty: true, showOn: "lg" });
				break;
			case 3:
				if (i % 3 == 1) cards.push({ isEmpty: true, showOn: "lg" });
				break;
		}
		if (i % 4 == 2) {
			cards.push({
				isEmpty: true,
				showOn: "md",
			});
			cards.push({
				isEmpty: true,
				showOn: "md",
			});
		}
		cards.push({
			isEmpty: false,
			url: resolve(`/author/${author.id}`),
			...author,
		});
		if (pushAfter) cards.push(pushAfter);
	}
	const lgL = cards.filter((c) => !c.isEmpty || c.showOn == "lg").length;
	if (lgL % 4 > 0) {
		cards.push({ isEmpty: true, showOn: "lg", w: 4 - (lgL % 4) });
	}
	const mdL = cards.filter((c) => !c.isEmpty || c.showOn == "md").length;
	if (mdL % 3 > 0) {
		cards.push({ isEmpty: true, showOn: "md", w: 3 - (mdL % 3) });
	}
</script>

<svelte:head>
	<title>{$lto(data.txt.authors.title)}</title>
</svelte:head>
<div class="grid" transition:fade={{ duration: 150 }}>
	{#each cards as card}
		<div
			class={["card", { empty: card.isEmpty, empty_lg: card.showOn == "lg", empty_md: card.showOn == "md" }]}
			style="--w:{card.w || 1};"
		>
			{#if card.isEmpty}
				<div class="cross"></div>
			{:else}
				<img src={resolve(`/data/${card.img}`)} alt={$lto(card.name)} />
				<div class="card__content">
					<a href={card.url}><img src={arrow} alt={$lt("перейти", "go to")} /></a>
					<div class="card__text">
						<h2>{$lto(card.name)}</h2>
						<h3>{$lto(card.subtitle)}</h3>
						<p>{$lto(card.text)}</p>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	.card {
		position: relative;
		aspect-ratio: 4/5;
		display: flex;
		flex-direction: column;
		justify-content: end;
	}
	.empty {
		display: none;
		grid-column: span var(--w, 1);
		aspect-ratio: unset;
	}
	.empty_lg {
		display: flex;
	}

	@media screen and (max-width: 1200px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.empty_lg {
			display: none;
		}
		.empty_md {
			display: flex;
		}
	}
	@media screen and (max-width: 800px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
		.empty_md {
			display: none;
		}
	}
	@media screen and (max-width: 500px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.card > img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -1;
	}

	.card__content {
		background: linear-gradient(180deg, #00000000, #000000);
		color: white;
		padding: 1.25rem;
		line-height: 1.5;
		opacity: 0;
		transition: opacity 300ms;
	}
	.card:hover .card__content,
	.card:focus-within .card__content {
		opacity: 1;
	}
	.card__text {
		transform: translateY(1rem);
		transition:
			opacity 300ms,
			transform 300ms;
	}
	.card:hover .card__text,
	.card:focus-within .card__text {
		transform: translateY(0rem);
	}

	@media screen and (max-width: 500px) {
		.card__content {
			opacity: 1;
		}
		.card__text {
			transform: translateY(0rem);
		}
	}

	h2,
	h3 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		text-transform: uppercase;
	}

	h2 {
		font-size: 1.5rem;
	}

	p {
		font-weight: 300;
		font-size: 0.875rem;
		padding: 0.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.card a {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		width: 1.5rem;
		height: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
	}

	.cross {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.cross::before,
	.cross::after {
		content: "";
		position: absolute;
		background-color: currentColor;
	}
	.cross::before {
		width: 80%;
		height: 1px;
	}
	.cross::after {
		width: 1px;
		height: 80%;
	}
</style>
