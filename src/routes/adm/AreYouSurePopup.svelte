<script module lang="ts">
	let shown = $state(false);
	let resolve: ((r: boolean) => void) | null = null;
	export async function ask() {
		return new Promise<boolean>((res) => {
			resolve = res;
			shown = true;
		});
	}

	function close(r = false) {
		shown = false;
		if (resolve) {
			const res = resolve;
			resolve = null;
			res(r);
		}
	}
</script>

<script lang="ts">
	import { trapFocus } from "$lib/trapFocus.svelte";
	import { fade } from "svelte/transition";
</script>

{#if shown}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		use:trapFocus
		transition:fade={{ duration: 150 }}
		class="popup"
		onclick={(e) => {
			if (e.target == e.currentTarget) close();
		}}
	>
		<div>
			<h2>Вы уверены?</h2>
			<div class="btns">
				<button
					class="btn"
					onclick={() => {
						close(true);
					}}>Удалить</button
				>
				<button
					class="btn"
					onclick={() => {
						close();
					}}>Отмена</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.popup {
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #00000022;
		z-index: 99;
	}
	.popup > div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		background-color: #fff;
		border: 1px solid #ccc;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.btn {
		--_c: #e63737;
		color: var(--_c);
		background-color: color-mix(in srgb, var(--_c), transparent 90%);
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		transition: background-color 150ms;
	}
	.btn:nth-child(2) {
		--_c: #1dbe4e;
	}
	.btn:hover {
		background-color: color-mix(in srgb, var(--_c), transparent 85%);
	}
	.btn:active {
		background-color: color-mix(in srgb, var(--_c), transparent 95%);
	}
</style>
