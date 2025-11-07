<script lang="ts">
	import { asset, resolve } from "$app/paths";
	import type { LText } from "$lib";
	import { curLang, lt, setLocale, lto } from "$lib/ltext";

	const {
		txt,
		user = { authed: false },
	}: {
		txt: {
			authors: LText;
			about: LText;
			contact: LText;
		};
		user?: { authed: boolean };
	} = $props();

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
				aria-label={$lt("открыть меню", "open menu")}
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
			<a href={resolve("/authors")} onclick={close}>
				{$lto(txt.authors)}
			</a>
			<a href={resolve("/about")} onclick={close}>
				{$lto(txt.about)}
			</a>
			<a href={resolve("/contact")} onclick={close}>
				{$lto(txt.contact)}
			</a>
			{#if user.authed}
				<a href={resolve("/adm")} onclick={close}>Админка</a>
			{/if}
		</nav>
		<div class="langSwitch">
			<button
				class={{ active: $curLang == "ru" }}
				onclick={() => setLocale("ru")}>ru</button
			>
			<button
				class={{ active: $curLang == "zh" }}
				onclick={() => setLocale("zh")}>zh</button
			>
			{#if user.authed}
				<a href={resolve("/adm/logout")} class="active">Выйти</a>
			{/if}
		</div>
	</div>
	<noscript>
		<style>
			.langSwitch {
				opacity: 0 !important;
				user-select: none !important;
				pointer-events: none !important;
			}
		</style>
	</noscript>
</header>

<style>
	header {
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
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
	.langSwitch * {
		padding: 0.25rem;
		opacity: 0.5;
	}
	.langSwitch *.active {
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
