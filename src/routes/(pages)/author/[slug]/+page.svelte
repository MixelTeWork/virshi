<script>
    import { page } from "$app/state";

	let slug = page.params.slug;
</script>

<svelte:head>
	<title>Автор</title>
</svelte:head>

<h1>Author {slug}</h1>