<script lang="ts">
	import { page } from "$app/state";
	import arrow from "$lib/arrow.svg";
	import logo from "$lib/logo.svg";
	import Gallery from "./Gallery.svelte";
	import { fade } from "svelte/transition";
	import { lt, lto } from "$lib/ltext";
	import { resolve } from "$app/paths";

	const { data } = $props();

	const slug = page.params.slug;
	const author = data.authors.find((v) => v.id == slug);
	let gallery: Gallery;
</script>

<svelte:head>
	<title>{$lto(data.txt.author.title)} - {$lto(author?.name)}</title>
</svelte:head>

<div class="page" transition:fade={{ duration: 150 }}>
	<div class="main">
		<img src={logo} alt="" class="logo" />
		<div class="breadcrumbs">
			<div>
				<span>{$lto(data.txt.authors.title)}</span>
				<span class="hline"></span>
				<span>{$lto(author?.name)}</span>
			</div>
		</div>
		<div class="img">
			<img
				src={resolve(`/data/${author?.img}`)}
				alt={$lto(author?.name)}
			/>
		</div>
		<div class="content">
			<h1 class="title">{$lto(author?.name)}</h1>
			<div class="tags">
				{#each author?.tags as tag}
					<span>{$lto(tag)}</span>
				{/each}
			</div>
			<div class="bio">
				<h2>{$lto(data.txt.author.bio)}</h2>
				{#each $lto(author?.text)?.split?.("\n") as p}
					<p>{p}</p>
				{/each}
			</div>
			<div class="gallery">
				<div class="gallery__title">
					<h2>{$lto(data.txt.author.gallery)}</h2>
					<button
						aria-label={$lt("к галерее", "to gallery")}
						onclick={() => gallery.scrollIntoView()}
					>
						<img src={arrow} alt={$lt("перейти", "go to")} />
					</button>
				</div>
				<div class="gallery__imgs">
					{#each author?.projects as proj, i}
						<button onclick={() => gallery.select(i)}>
							<img
								src={resolve(`/data/${proj.img}`)}
								alt={$lto(proj.name)}
							/>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<Gallery
		bind:this={gallery}
		projects={author?.projects || []}
		title={data.txt.author.gallery}
		readmore={data.txt.author.readmore}
	/>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		padding: 0 4rem;
		gap: 9rem;
	}

	.main {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem 3rem;
	}
	@media screen and (max-width: 1250px) {
		.page {
			gap: 5rem;
		}
	}
	@media screen and (max-width: 700px) {
		.page {
			padding: 0 1rem;
			background: linear-gradient(
				180deg,
				white,
				white 1.8rem,
				transparent 1.8rem,
				transparent calc(1.8rem + 360px),
				white calc(1.8rem + 360px)
			);
		}
		.main {
			grid-template-columns: 1fr;
		}
	}
	.logo {
		position: absolute;
		bottom: -200px;
		left: -190px;
		opacity: 0.1;
		z-index: -1;
	}
	@media screen and (max-width: 1000px) {
		.logo {
			scale: 0.8;
		}
	}
	@media screen and (max-width: 800px) {
		.logo {
			scale: 0.7;
		}
	}
	@media screen and (max-width: 700px) {
		.logo {
			display: none;
		}
	}

	.breadcrumbs {
		grid-column: span 2;
		font-weight: 500;
		font-size: 0.75rem;
		text-transform: uppercase;
	}
	.breadcrumbs div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	@media screen and (max-width: 700px) {
		.breadcrumbs {
			position: relative;
			grid-column: span 1;
			height: calc(2rem + 360px);
		}
		.breadcrumbs div {
			position: sticky;
			top: 0;
		}
	}

	.hline {
		display: inline-block;
		width: 2rem;
		height: 1px;
		background-color: currentColor;
	}

	.img {
		display: flex;
		min-width: 0;
		aspect-ratio: 0.93;
	}
	@media screen and (max-width: 1000px) {
		.img {
			aspect-ratio: 0.85;
		}
	}
	@media screen and (max-width: 700px) {
		.img {
			position: fixed;
			top: 8.1rem;
			left: 0;
			aspect-ratio: unset;
			width: 100%;
			height: 360px;
			z-index: -1;
		}
	}
	@media screen and (max-width: 500px) {
		.img {
			top: 6.3rem;
		}
	}

	.img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.title {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 6rem;
		text-transform: uppercase;
	}
	@media screen and (max-width: 1250px) {
		.title {
			font-size: 4rem;
		}
	}
	@media screen and (max-width: 1000px) {
		.title {
			font-size: 3rem;
		}
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 0;
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 0.875rem;
		line-height: 1.1;
		text-transform: uppercase;
	}
	.tags span {
		padding: 0.75rem 1rem;
		background-color: #f3f3f3;
		border-radius: 2rem;
	}

	.bio {
		flex-grow: 1;
	}
	.bio h2 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		line-height: 1.5;
		text-transform: uppercase;
		color: #00000080;
	}
	.bio p {
		max-width: 575px;
		font-weight: 300;
		line-height: 1.5;
		text-wrap-style: pretty;
	}
	.bio p + p {
		margin-top: 0.5rem;
	}

	.gallery {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	@media screen and (max-width: 1100px) {
		.gallery {
			display: none;
		}
	}
	.gallery__title {
		display: flex;
		justify-content: space-between;
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 1.5rem;
		text-transform: uppercase;
	}
	.gallery__title button {
		width: 1.5rem;
		height: 1.5rem;
	}
	.gallery__title button img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		rotate: 90deg;
	}
	.gallery__imgs {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
	}
	.gallery__imgs button {
		aspect-ratio: 1;
	}
	.gallery__imgs img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
