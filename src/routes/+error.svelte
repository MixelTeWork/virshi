<script>
	import { page } from "$app/state";
</script>

<div class="err">
	{#if page.status == 404}
		<h1>Такой страницы нет</h1>
	{:else}
		<h1>{page.error?.message}</h1>
	{/if}
</div>

<style>
	.err {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	h1 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: clamp(2rem, 5vw, 5rem);
		text-transform: uppercase;
	}
</style>
