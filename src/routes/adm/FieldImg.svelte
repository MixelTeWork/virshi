<script lang="ts">
	import { resolve } from "$app/paths";
	import type { RemoteFormField } from "@sveltejs/kit";

	const {
		title,
		field,
		current,
		aspectRatio = 1,
	}: {
		title: string;
		field: RemoteFormField<File>;
		current: string;
		aspectRatio?: number;
	} = $props();
	let img = $state("");
	$effect(() => {
		img = resolve(`/data/${current}`);
	});
</script>

<div class="field">
	<h3>{title}</h3>
	<label class="img" style:aspect-ratio={aspectRatio}>
		{#if img}
			<img src={img} alt="Картинка" />
		{/if}
		<input
			{...field.as("file")}
			onchange={async (e) => {
				const file = (e.target as HTMLInputElement)?.files?.[0];
				if (!file) return;
				img = URL.createObjectURL(file);
			}}
		/>
	</label>
</div>

<style>
	.field {
		display: grid;
		grid-template-columns: 6rem 1fr 1fr;
		grid-template-columns: 6rem 1fr;
		align-items: center;
		gap: 1rem;
	}
	h3 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: 1.25rem;
	}

	.img {
		position: relative;
		display: flex;
		width: 10rem;
		aspect-ratio: 1;
		border-radius: 0.5rem;
		flex-shrink: 0;
		padding: 0;
		background: linear-gradient(135deg, #090938, #111129);
		border: none;
		cursor: pointer;
	}
	.img:has(input:focus-visible) {
		outline: auto;
	}
	.img input {
		position: absolute;
		opacity: 0 !important;
		user-select: none !important;
		pointer-events: none !important;
	}
	.img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0.5rem;
	}
</style>
