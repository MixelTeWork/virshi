<script>
	import { login } from "../data.remote";
</script>

<svelte:head>
	<title>Вход</title>
</svelte:head>

<div class="page">
	<h1>Вход</h1>
	<form {...login}>
		<input {...login.fields.pwd.as("password")} />
		<button type="submit">Войти</button>
	</form>
	{#each login.fields.allIssues() as issue}
		<p>{issue.message}</p>
	{/each}
</div>

<style>
	.page {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: 2.25rem;
	}

	p {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: 1.25rem;
		color: #e63737;
	}

	form {
		display: flex;
		gap: 1rem;
	}

	input {
		min-width: 0;
		width: 20em;
		border: none;
		border-bottom: 1px solid currentColor;
		outline: none;
	}

	button {
		background-color: #00000011;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
	}
</style>
