<script lang="ts">
	import { fade } from "svelte/transition";
	import map from "./map.jpg";
	import { lt } from "$lib/ltext";
</script>

<svelte:head>
	<title>{$lt("Контакты", "Contacts")}</title>
</svelte:head>

<div class="page" transition:fade={{ duration: 150 }}>
	<div class="content">
		<div>
			<h1>{$lt("Контакты", "Contacts")}</h1>
			<p>
				{$lt(
					"Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.",
					"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet assumenda impedit quae, vero eum minima quasi quis saepe veniam sapiente pariatur accusantium tempore. Repudiandae error, possimus architecto enim corporis optio?",
				)}
			</p>
			<p>
				{$lt(
					"Иус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.",
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, illum. Incidunt placeat quaerat quas beatae blanditiis excepturi cum, ad esse, assumenda saepe sunt similique eveniet tempora. Reiciendis inventore iure corporis.",
				)}
			</p>
		</div>
		<div class="items">
			{@render item($lt("Почта", "Mail"), "mail@domen.ru")}
			{@render item($lt("Телефон", "Phone"), "+7 (499) 343-33-32")}
			{@render item(
				$lt("Адрес", "Address"),
				$lt("г. Москва, проспект Вернадского, д. 76", "76 Vernadsky Avenue, Moscow"),
			)}
		</div>
	</div>
	<div class="map">
		<img src={map} alt={$lt("Карта", "Map")} />
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
