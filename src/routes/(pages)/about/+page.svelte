<script lang="ts">
	import { asset } from "$app/paths";
	import logo from "$lib/logo.svg";
	import { creators } from "$lib/data";
	import image from "./image.jpg";
	import { fade } from "svelte/transition";
	import Popup from "$lib/Popup/Popup.svelte";
	import { scrolling } from "$lib/scrolling.svelte";

	let selectedI = $state(-1);
	const selected = $derived(creators[selectedI]);
	let windowWidth = $state(0);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:head>
	<title>О проекте</title>
</svelte:head>

<Popup
	project={windowWidth < 900 ? selected : null}
	close={() => {
		selectedI = -1;
	}}
	selectNext={() => {
		selectedI = (selectedI + 1 + creators.length) % creators.length;
	}}
	selectPrev={() => {
		selectedI = (selectedI - 1 + creators.length) % creators.length;
	}}
/>

<div class="page">
	<div class="content">
		<div>
			<h1>О проекте</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit.
				Eveniet assumenda impedit quae, vero eum minima quasi quis saepe
				veniam sapiente pariatur accusantium tempore. Repudiandae error,
				possimus architecto enim corporis optio?
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Maiores, illum. Incidunt placeat quaerat quas beatae blanditiis
				excepturi cum, ad esse, assumenda saepe sunt similique eveniet
				tempora. Reiciendis inventore iure corporis.
			</p>
		</div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="creators"
			onmouseleave={() => {
				if (windowWidth < 900) return;
				selectedI = -1;
			}}
		>
			<h2>Создатели</h2>
			<div class="creators__items">
				{#each creators as creator, i}
					<button
						class={[
							"creator",
							{ dimmed: selectedI >= 0 && i != selectedI },
						]}
						onclick={() => {
							selectedI = i;
						}}
						onmouseenter={() => {
							if (windowWidth < 900) return;
							selectedI = i;
						}}
					>
						<img src={creator.img} alt={creator.name} />
					</button>
				{/each}
			</div>
		</div>
		<div class="sponsors">
			<h2>Спонсоры</h2>
			<div class="sponsors__items" use:scrolling={{ speed: 2 }}>
				<img src={asset("/sponsor.png")} alt="Спонсор 1" />
				<img src={asset("/sponsor.png")} alt="Спонсор 2" />
				<img src={asset("/sponsor.png")} alt="Спонсор 3" />
				<img src={asset("/sponsor.png")} alt="Спонсор 4" />
			</div>
		</div>
	</div>
	<div class="img">
		<div class="logo">
			<img src={logo} alt="" />
		</div>
		<img src={image} alt="Картинка" class="img__bg" />
		{#if selected}
			<img
				transition:fade={{ duration: 250 }}
				src={selected.img}
				alt={selected.name}
				class="img__creator"
			/>
			<div class="img__content" transition:fade={{ duration: 250 }}>
				<h2>{selected.name}</h2>
				<h3>{selected.subtitle}</h3>
				<p>{selected.text}</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		padding: 1.5rem 4rem 4rem;
	}

	.content {
		min-width: 320px;
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}

	@media screen and (max-width: 1100px) {
		.page {
			padding: 1.5rem 2rem 2rem;
			gap: 2rem;
		}
		.content {
			gap: 3rem;
		}
	}
	@media screen and (max-width: 900px) {
		.page {
			grid-template-columns: 1fr;
			padding: 0;
			--_imgH: clamp(200px, 35vw, 300px);
			padding-top: var(--_imgH);
		}
		.content {
			background-color: white;
			padding: 1.5rem 1rem;
			gap: 3rem;
		}
	}
	.content h1 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 6rem;
		text-transform: uppercase;
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
	@media screen and (max-width: 500px) {
		.content h1 {
			font-size: 3rem;
		}
	}
	.content p {
		margin-top: 1rem;
		font-weight: 300;
		line-height: 1.5;
		max-width: 575px;
		text-wrap-style: pretty;
	}

	.creators {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.creators h2 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 1.5rem;
		text-transform: uppercase;
	}
	.creators__items {
		display: flex;
		gap: 0.5rem;
		overflow: auto hidden;
	}
	.creator {
		min-width: 128px;
		aspect-ratio: 1;
		transition: opacity 250ms;
	}
	.creator img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.dimmed {
		opacity: 0.5;
	}

	.sponsors {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.sponsors h2 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 1.5rem;
		text-transform: uppercase;
	}
	.sponsors__items {
		display: flex;
		gap: 0.5rem;
		overflow: auto hidden;
	}
	.sponsors__items::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.img {
		position: relative;
	}
	.logo {
		position: absolute;
		bottom: 0;
		right: 0;
		contain: layout;
	}
	.logo img {
		position: absolute;
		bottom: -270px;
		right: -300px;
		opacity: 0.1;
		z-index: -1;
		scale: 1.25;
	}
	.img__bg,
	.img__creator {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}
	.img__content {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.5rem;
		z-index: 2;
		padding: 1.5rem;
		color: white;
	}
	@media screen and (max-width: 900px) {
		.img {
			position: fixed;
			top: 6.25rem;
			left: 0;
			width: 100%;
			height: var(--_imgH);
			z-index: -1;
		}
		.logo,
		.img__creator,
		.img__content {
			display: none;
		}
	}
	@media screen and (max-width: 500px) {
		.img {
			top: 4.5rem;
		}
	}
	.img__content h2 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 2.5rem;
		text-transform: uppercase;
	}
	.img__content h3 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 1.25rem;
		line-height: 1.5;
		text-transform: uppercase;
	}
	.img__content p {
		margin-top: 0.25rem;
		font-weight: 300;
		line-height: 1.5;
		max-width: 475px;
		text-wrap-style: pretty;
	}
</style>
