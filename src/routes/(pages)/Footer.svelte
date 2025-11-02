<footer>
	<div class="marquee">
		{#each { length: 5 }}
			<span>Прибытие поезда «вирши»</span>
			<span class="vsep"></span>
			<span>г. москва</span>
			<span class="vsep"></span>
			<span>28.12.2025</span>
			<span class="vsep"></span>
			<span>10:00 — 21:00</span>
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
