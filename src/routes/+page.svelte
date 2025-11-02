<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import Footer from "./(pages)/Footer.svelte";
	import { goto, preloadData } from "$app/navigation";

	let intro = $state(false);
	let outro = $state(false);

	onMount(() => {
		intro = true;
	});

	function go(this: HTMLAnchorElement, e: MouseEvent) {
		e.preventDefault();
		if (outro) return;
		outro = true;
		const url = this.href;
		preloadData(url);
		setTimeout(() => {
			goto(url);
		}, 1500);
	}
</script>

<main out:fade={{ duration: 1000 }} class={{ intro, outro }}>
	<img src="/intro_rails.png" alt="rails" class="rails" />
	<img src="/intro_train.png" alt="train" class="train" />
	<img src="/intro_train_door.png" alt="train_door" class="train_door" />
	<div class="main">
		<img src="/logo_white.svg" alt="logo" />
		<div class="links">
			<a href="/authors" onclick={go}>Авторы</a>
			<a href="/about" onclick={go}>О проекте</a>
			<a href="/contact" onclick={go}>Контакты</a>
			<div class="langSwitch">
				<a href="?lang=ru" class="active">ru</a>
				<a href="?lang=zh">zh</a>
			</div>
		</div>
	</div>
	<div class="footer">
		<Footer />
	</div>
</main>

<style>
	main {
		position: fixed;
		inset: 0;
		background: url("/intro_bg.jpg");
		background-size: cover;
	}

	.rails,
	.train,
	.train_door {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition:
			translate 1s,
			scale 1s;
	}
	.train,
	.train_door {
		translate: 100% 0%;
	}
	.intro .train,
	.intro .train_door {
		translate: 0% 0%;
	}
	.outro .rails,
	.outro .train,
	.outro .train_door {
		transition:
			translate 1.5s 0.5s,
			scale 1.5s 0.5s;
		scale: 2;
	}
	.outro .train_door {
		translate: 100% 0%;
	}

	.main {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;
		opacity: 0;
		transition: opacity 1.5s 1s;
		background-color: #000000bf;
	}
	.intro .main {
		opacity: 1;
	}
	.outro .main {
		opacity: 0;
		transition: opacity 500ms;
	}

	.main img {
		width: min(900px, 80vw);
	}

	.links {
		display: flex;
		font-family: Inter, Arial, Helvetica, sans-serif;
		font-weight: 500;
		font-size: 0.75rem;
		text-transform: uppercase;
	}
	.links > * {
		background-color: white;
		padding: 0.75rem 1rem;
		border-radius: 2rem;
	}
	.langSwitch {
		display: flex;
		gap: 0.5rem;
		color: #767676;
	}

	.active {
		color: black;
	}

	.footer {
		position: fixed;
		bottom: 0;
		transform: translateY(100%);
		transition: transform 1s 1s;
		z-index: 2;
	}
	.intro .footer {
		transform: translateY(0%);
	}
	.outro .footer {
		transition: transform 500ms;
		transform: translateY(100%);
	}
</style>
