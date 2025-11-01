<script lang="ts">
	let { children } = $props();
</script>

<header>
	<a href="/" class="logo">Logo</a>
	<div class="links">
		<a href="./authors">Авторы</a>
		<a href="./about">О проекте</a>
		<a href="./contact">Контакты</a>
	</div>
	<div class="langSwitch">
		<a href="?lang=ru">ru</a>
		<a href="?lang=zh">zh</a>
	</div>
</header>

<main>
	{@render children()}
</main>


<footer>
	<div class="marquee">
		<span>Прибытие поезда «вирши»</span>
		<span class="vsep"></span>
		<span>г. москва</span>
		<span class="vsep"></span>
		<span>28.12.2025</span>
		<span class="vsep"></span>
		<span>10:00 — 21:00</span>
		<span class="hsep"></span>
	</div>
</footer>

<style>
	main {
		flex-grow: 1;
		background: linear-gradient(45deg, #5bc3ff, #5b81ff);
	}
</style>