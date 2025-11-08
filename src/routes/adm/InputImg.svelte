<script lang="ts">
	import { resolve } from "$app/paths";
	import type { RemoteFormField } from "@sveltejs/kit";

	const {
		field,
		current,
		aspectRatio = 1,
	}: {
		field: RemoteFormField<File>;
		current: string;
		aspectRatio?: number;
	} = $props();
	let img = $state("");
	$effect(() => {
		if (field.value()?.size > 0) {
			img = URL.createObjectURL(field.value());
		} else {
			if (current) img = resolve(`/data/${current}`);
		}
	});
</script>

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

<style>
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
		width: 0;
		height: 0;
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
