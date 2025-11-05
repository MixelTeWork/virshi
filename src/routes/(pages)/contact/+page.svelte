<script lang="ts">
    import { fade } from "svelte/transition";
	import map from "./map.jpg";
</script>

<svelte:head>
	<title>Контакты</title>
</svelte:head>

<div class="page" transition:fade={{ duration: 150 }}>
	<div class="content">
		<div>
			<h1>Контакты</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
				nulla hic similique quasi pariatur, voluptates ad doloribus quia
				deleniti id aut qui, ducimus quo? Ex amet consequuntur
				accusantium accusamus sint?
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
				sint voluptates dolor a illum eaque, deleniti exercitationem
				dolorum maiores, nesciunt possimus natus odio modi non, hic
				commodi fugiat blanditiis quibusdam?
			</p>
		</div>
		<div class="items">
			{@render item("Почта", "mail@domen.ru")}
			{@render item("Телефон", "+7 (499) 343-33-32")}
			{@render item("Адрес", "г. Москва, проспект Вернадского, д. 76")}
		</div>
	</div>
	<div class="map">
		<img src={map} alt="Карта" />
	</div>
</div>

{#snippet item(name: string, value: string)}
	<div class="item">
		<h3>{name}</h3>
		<span>{value}</span>
	</div>
{/snippet}

<style>
	.page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		padding: 1.5rem 4rem 4rem;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
	}
	.content h1 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 6rem;
		text-transform: uppercase;
	}
	.content p {
		margin-top: 1rem;
		font-weight: 300;
		line-height: 1.5;
		max-width: 575px;
		text-wrap-style: pretty;
	}
	.items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.item h3 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		line-height: 1.5;
		text-transform: uppercase;
		opacity: 0.5;
	}
	.item span {
		font-weight: 300;
		line-height: 1.5;
	}
	.map img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 0.95;
	}

	@media screen and (max-width: 1300px) {
		.content h1 {
			font-size: 5rem;
		}
	}
	@media screen and (max-width: 1100px) {
		.content h1 {
			font-size: 4rem;
		}
	}
	@media screen and (max-width: 1000px) {
		.page {
			grid-template-columns: 1fr;
		}
	}
	@media screen and (max-width: 700px) {
		.page {
			padding: 1.5rem 2rem 2rem;
		}
		.content h1 {
			font-size: 3rem;
		}
	}
	@media screen and (max-width: 500px) {
		.page {
			padding: 1.5rem 1rem;
		}
	}
</style>
