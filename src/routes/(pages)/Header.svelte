<header>
	<a href="/" class="logo">
		<img src="/logo.svg" alt="logo" />
	</a>
	<div class="links">
		<a href="/authors">Авторы</a>
		<a href="/about">О проекте</a>
		<a href="/contact">Контакты</a>
	</div>
	<div class="langSwitch">
		<a href="?lang=ru" class="active">ru</a>
		<a href="?lang=zh">zh</a>
	</div>
</header>

<style>
	header {
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 4rem;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
	}

	.links {
		display: flex;
		gap: 2rem;
	}

	.langSwitch {
		display: flex;
		gap: 0.5rem;
		color: #767676;
	}

	.active {
		color: black;
	}
</style>