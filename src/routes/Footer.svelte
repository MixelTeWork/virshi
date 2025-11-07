<script lang="ts">
	import type { LText } from "$lib";
	import { lto } from "$lib/ltext";
	const {
		txt,
	}: {
		txt: {
			arrival: LText;
			city: LText;
			date: string;
			time: string;
		};
	} = $props();
</script>

<footer>
	<div class="marquee">
		{#each { length: 5 }}
			<span>{$lto(txt.arrival)}</span>
			<span class="vsep"></span>
			<span>{$lto(txt.city)}</span>
			<span class="vsep"></span>
			<span>{txt.date}</span>
			<span class="vsep"></span>
			<span>{txt.time}</span>
			<span class="hsep"></span>
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
		animation: marquee 16s linear infinite;
	}

	@keyframes marquee {
		from {
			transform: translateX(0%);
		}
		to {
			transform: translateX(-20%);
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
