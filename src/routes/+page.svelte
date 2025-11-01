<script>
	import { fade } from 'svelte/transition';
</script>

<div class="links" out:fade>
	<a href="./authors">Авторы</a>
	<a href="./about">О проекте</a>
	<a href="./contact">Контакты</a>
</div>

<style>
	.links {
		position: fixed;
		inset: 0;
		background: linear-gradient(45deg, #ffc55b, #ffbd43);
	}
</style>