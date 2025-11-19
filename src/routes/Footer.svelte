<script lang="ts">
	import type { LText } from "$lib";
	import { lto } from "$lib/ltext";
	const { txt }: { txt: { text: LText; speed: number } } = $props();
</script>

<footer>
	<div class="marquee" style="--_t: {$lto(txt.text).length / 5 / txt.speed}s">
		{#each { length: 4 }}
			{#each $lto(txt.text).split("\n") as item}
				{#each item.split("|") as el, i}
					{#if i > 0}
						<span class="vsep"></span>
					{/if}
					<span>{el}</span>
				{/each}
				<span class="hsep"></span>
			{/each}
		{/each}
	</div>
</footer>

<style>
	footer {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: 1.5rem;
		line-height: 1.2;
		font-weight: 400;
		padding-block: 1rem;
		background-color: #e8b200;
		text-transform: uppercase;
		overflow: hidden;
	}

	.marquee {
		width: max-content;
		display: flex;
		align-items: center;
		gap: 1rem;
		animation: marquee var(--_t, 16s) linear infinite;
	}

	@keyframes marquee {
		from {
			transform: translateX(0%);
		}
		to {
			transform: translateX(-25%);
		}
	}

	.vsep {
		height: 1em;
		width: 1px;
		background-color: currentColor;
	}

	.hsep {
		height: 1px;
		width: 5em;
		background-color: currentColor;
	}
</style>
