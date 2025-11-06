<script lang="ts">
	import { locale } from "$lib/ltext";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<div class="layout" use:locale>
	<Header />

	<main>
		<div class="content">
			{@render children()}
		</div>
	</main>

	<Footer />
</div>

<style>
	.layout {
		display: grid;
		grid-template-rows: auto 1fr 3.8rem;
		height: 100vh;
		height: 100dvh;
	}

	main {
		overflow: auto;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex-grow: 1;
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
	}
</style>
