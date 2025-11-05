<script lang="ts">
	import { resolve } from "$app/paths";
	import arrow from "$lib/arrow.svg";
	import { authors } from "$lib/data";
	import { fade } from "svelte/transition";

	interface ICard {
		isEmpty: boolean;
		name?: string;
		subtitle?: string;
		text?: string;
		img?: string;
		url?: string;
	}
	const authorsCards = authors.map((author) => ({
		isEmpty: false,
		url: resolve(`/author/${author.id}`),
		...author,
	}));
	const cards: ICard[] = [
		authorsCards[0],
		authorsCards[1],
		{ isEmpty: true },
		{ isEmpty: true },
		authorsCards[2],
		{ isEmpty: true },
		{ isEmpty: true },
		authorsCards[3],
		authorsCards[4],
		authorsCards[5],
		{ isEmpty: true },
	];
</script>

<svelte:head>
	<title>Авторы</title>
</svelte:head>

<div class="grid" transition:fade={{ duration: 150 }}>
	{#each cards as card}
		<div class={["card", { empty: card.isEmpty }]}>
			{#if card.isEmpty}
				<div class="cross"></div>
			{:else}
				<img src={card.img} alt="фото автора" />
				<div class="card__content">
					<a href={card.url}><img src={arrow} alt="перейти" /></a>
					<div class="card__text">
						<h2>{card.name}</h2>
						<h3>{card.subtitle}</h3>
						<p>{card.text}</p>
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
	.empty:nth-child(3),
	.empty:nth-child(4),
	.empty:nth-child(11) {
		display: none;
	}

	@media screen and (max-width: 1200px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.empty {
			display: none;
		}
		.empty:nth-child(3),
		.empty:nth-child(4),
		.empty:nth-child(11) {
			display: flex;
		}
	}
	@media screen and (max-width: 800px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
		.empty {
			display: none !important;
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
