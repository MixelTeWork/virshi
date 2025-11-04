<script lang="ts">
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<div class="layout">
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
	}
	.content {
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
	}
</style>
