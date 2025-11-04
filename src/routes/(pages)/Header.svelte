<script lang="ts">
	import { asset, resolve } from "$app/paths";

	let open = $state(false);
	function close() {
		open = false;
	}
</script>

<header class={{ open }}>
	<div class="container">
		<div class="logo">
			<a href={resolve("/")}>
				<img src={asset("/logo.svg")} alt="logo" />
			</a>
			<button
				class="burgerBtn"
				aria-label="open menu"
				onclick={() => {
					open = !open;
				}}
			>
				<div></div>
				<div></div>
				<div></div>
			</button>
		</div>
		<nav class="links">
			<a href={resolve("/authors")} onclick={close}>Авторы</a>
			<a href={resolve("/about")} onclick={close}>О проекте</a>
			<a href={resolve("/contact")} onclick={close}>Контакты</a>
		</nav>
		<div class="langSwitch">
			<a href="?lang=ru" class="active">ru</a>
			<a href="?lang=zh">zh</a>
		</div>
	</div>
</header>

<style>
	header {
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		line-height: 1;
	}
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 4rem;
	}

	.logo {
		display: flex;
		justify-content: space-between;
	}

	.logo a {
		display: flex;
		align-items: center;
	}

	.burgerBtn {
		position: relative;
		display: none;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
	}
	.burgerBtn div {
		position: absolute;
		width: 2rem;
		height: 1px;
		background-color: currentColor;
		transition-property: translate, scale, rotate;
		transition-duration: 250ms;
	}
	.burgerBtn div:first-child {
		translate: 0 -0.5rem;
	}
	.burgerBtn div:last-child {
		translate: 0 0.5rem;
	}

	.links {
		display: flex;
		gap: 1.6rem;
	}

	.links a {
		padding: 0.2rem;
	}

	.langSwitch {
		display: flex;
	}
	.langSwitch a {
		padding: 0.25rem;
		opacity: 0.5;
	}
	.langSwitch a.active {
		opacity: 1;
	}

	@media screen and (max-width: 600px) {
		.container {
			padding: 2rem;
		}
	}

	@media screen and (max-width: 500px) {
		header {
			font-family: Manrope, Arial, Helvetica, sans-serif;
			font-weight: 400;
			font-size: 2.25rem;
		}
		.container {
			flex-direction: column;
			align-items: stretch;
			justify-content: flex-start;
			padding: 0.75rem 1rem;
			gap: 2rem;
		}
		.open .container {
			position: fixed;
			inset: 0;
			bottom: 3.8rem;
			z-index: 10;
			background-color: white;
		}

		.burgerBtn {
			display: flex;
		}
		.open .burgerBtn :nth-child(2) {
			scale: 0;
		}
		.open .burgerBtn :first-child {
			translate: 0 0;
			rotate: 45deg;
		}
		.open .burgerBtn :last-child {
			translate: 0 0;
			rotate: -45deg;
		}

		.links {
			display: none;
			flex-direction: column;
			gap: 1.5rem;
		}
		.langSwitch {
			display: none;
			margin-top: auto;
		}
		.open .links {
			display: flex;
		}
		.open .langSwitch {
			display: flex;
		}
	}
</style>
