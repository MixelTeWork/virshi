<script lang="ts">
	import { fade } from "svelte/transition";
	import { lt, lto } from "$lib/ltext";
	import { resolve } from "$app/paths";
	const { data } = $props();
</script>

<svelte:head>
	<title>{$lto(data.txt.contacts.title)}</title>
</svelte:head>

<div class="page" transition:fade={{ duration: 150 }}>
	<div class="content">
		<div>
			<h1>{$lto(data.txt.contacts.title)}</h1>
			{#each $lto(data.txt.contacts.text)?.split?.("\n") as p}
				<p>{p}</p>
			{/each}
		</div>
		<div class="items">
			{@render item(
				$lto(data.txt.contacts.mail.title),
				data.txt.contacts.mail.value,
			)}
			{@render item(
				$lto(data.txt.contacts.phone.title),
				data.txt.contacts.phone.value,
			)}
			{@render item(
				$lto(data.txt.contacts.address.title),
				$lto(data.txt.contacts.address.value),
			)}
		</div>
	</div>
	<div class="map">
		<img src={resolve(`/data/${data.txt.contacts.map}`)} alt={$lt("Карта", "Map")} />
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
