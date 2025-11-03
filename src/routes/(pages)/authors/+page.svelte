<script lang="ts">
	import { asset, resolve } from "$app/paths";
	import arrow from "./arrow.svg";

	interface ICard {
		isEmpty: boolean;
		title?: string;
		subtitle?: string;
		text?: string;
		img?: string;
		url?: string;
	}
	const cards: ICard[] = [
		{
			isEmpty: false,
			title: "Ли Цюнсы",
			subtitle: "иммерсивный творец",
			text: "Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed. Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed.",
			img: asset("/author1.jpg"),
			url: resolve("/author/1"),
		},
		{
			isEmpty: false,
			title: "Иванов Иван",
			subtitle: "красноречивый оратор",
			text: "Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed. Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed.",
			img: asset("/author2.jpg"),
			url: resolve("/author/2"),
		},
		{
			isEmpty: false,
			title: "София Марченко",
			subtitle: "цифровой художник",
			text: "Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed. Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed.",
			img: asset("/author3.jpg"),
			url: resolve("/author/3"),
		},
		{ isEmpty: true },
		{ isEmpty: true },
		{
			isEmpty: false,
			title: "Алексей Петров",
			subtitle: "архитектор виртуальности",
			text: "Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed. Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed.",
			img: asset("/author4.jpg"),
			url: resolve("/author/4"),
		},
		{
			isEmpty: false,
			title: "Томас Андерссон",
			subtitle: "саунд-продюсер",
			text: "Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed. Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed.",
			img: asset("/author5.jpg"),
			url: resolve("/author/5"),
		},
		{
			isEmpty: false,
			title: "Анна Коваль",
			subtitle: "сценограф-постановщик",
			text: "Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed. Lorem ipsum dolor sit amet consectetur. Et felis vitae nunc at. Urna tincidunt morbi interdum sed.",
			img: asset("/author6.jpg"),
			url: resolve("/author/6"),
		},
	];
</script>

<svelte:head>
	<title>Авторы</title>
</svelte:head>

<div class="grid">
	{#each cards as card}
		<div class="card">
			{#if card.isEmpty}
				<div class="cross"></div>
			{:else}
				<img src={card.img} alt="фото автора" />
				<div class="card__content">
					<a href={card.url}><img src={arrow} alt="перейти" /></a>
					<div class="card__text">
						<h2>{card.title}</h2>
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

	@media screen and (max-width: 500px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.card {
		position: relative;
		aspect-ratio: 4/5;
		display: flex;
		flex-direction: column;
		justify-content: end;
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
