<script lang="ts">
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<div class="layout">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.layout {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100vh;
		height: 100dvh;
	}

	main {
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		overflow: auto;
	}

	main::-webkit-scrollbar {
		width: 4px;
	}

	main::-webkit-scrollbar-thumb {
		background-color: #999;
		border-radius: 4px;
	}
</style>
