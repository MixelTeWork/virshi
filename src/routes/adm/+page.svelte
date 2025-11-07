<script lang="ts">
	import type { RemoteForm } from "@sveltejs/kit";
	import {
		updateHeader,
		updateFooter,
		updateContacts,
		updateAuthors,
		updateAuthor,
		updateAbout,
		modifyAuthor,
        modifyCreator,
	} from "./data.remote";

	const { data } = $props();
	updateHeader.fields.set(data.txt.header);
	updateFooter.fields.set(data.txt.footer);
	updateContacts.fields.set(data.txt.contacts);
	updateAuthors.fields.set(data.txt.authors);
	updateAuthor.fields.set(data.txt.author);
	updateAbout.fields.set(data.txt.about);

	const authorForms = data.authors.map((author) => {
		const form = modifyAuthor.for(author.id);
		form.fields.set({
			...author,
			tags: {
				ru: author.tags.map((t) => t.ru).join(";"),
				zh: author.tags.map((t) => t.zh).join(";"),
			},
		});
		return { id: author.id, form };
	});

	const creatorForms = data.creators.map((creator) => {
		const form = modifyCreator.for(creator.id);
		form.fields.set(creator);
		return { id: creator.id, form };
	});

	function enchance(
		f: RemoteForm<any, any> | Omit<RemoteForm<any, any>, "for">,
	) {
		return f.enhance(async ({ form, data, submit }) => {
			await submit();
			f.fields.set(data);
		});
	}

	type Page = "ui" | "pages" | "authors" | "creators";
	let page = $state("ui" as Page);
	function toPage(p: Page) {
		return () => (page = p);
	}
</script>

<svelte:head>
	<title>Управление</title>
</svelte:head>

<div class="page">
	<h1>Управление</h1>
	<nav>
		<button onclick={toPage("ui")}>UI</button>
		<button onclick={toPage("pages")}>Pages</button>
		<button onclick={toPage("authors")}>Authors</button>
		<button onclick={toPage("creators")}>Creators</button>
	</nav>
	{#if page == "ui"}
		<h2>Header</h2>
		<form {...enchance(updateHeader)}>
			{@render field("authors", updateHeader.fields.authors)}
			{@render field("about", updateHeader.fields.about)}
			{@render field("contact", updateHeader.fields.contact)}
			{@render fromEnd(updateHeader)}
		</form>
		<h2>Footer</h2>
		<form {...enchance(updateFooter)}>
			{@render field("arrival", updateFooter.fields.arrival)}
			{@render field("city", updateFooter.fields.city)}
			{@render fieldS("date", updateFooter.fields.date)}
			{@render fieldS("time", updateFooter.fields.time)}
			{@render fromEnd(updateFooter)}
		</form>
	{:else if page == "pages"}
		<h2>Authors</h2>
		<form {...enchance(updateAuthors)}>
			{@render field("title", updateAuthors.fields.title)}
			{@render fromEnd(updateAuthors)}
		</form>
		<h2>Author</h2>
		<form {...enchance(updateAuthor)}>
			{@render field("title", updateAuthor.fields.title)}
			{@render field("bio", updateAuthor.fields.bio)}
			{@render field("gallery", updateAuthor.fields.gallery)}
			{@render field("readmore", updateAuthor.fields.readmore)}
			{@render fromEnd(updateAuthor)}
		</form>
		<h2>Contacts</h2>
		<form {...enchance(updateContacts)}>
			{@render field("title", updateContacts.fields.title)}
			{@render fieldTA("text", updateContacts.fields.text)}
			{@render fieldD("mail", updateContacts.fields.mail)}
			{@render fieldD("phone", updateContacts.fields.phone)}
			{@render field("address", updateContacts.fields.address.title)}
			{@render field("", updateContacts.fields.address.value)}
			<div class="field"><h3>map</h3></div>
			{@render fromEnd(updateContacts)}
		</form>
		<h2>About</h2>
		<form {...enchance(updateAbout)}>
			{@render field("title", updateAbout.fields.title)}
			{@render fieldTA("text", updateAbout.fields.text)}
			{@render field("creators", updateAbout.fields.creators)}
			{@render field("sponsors", updateAbout.fields.sponsors)}
			<div class="field"><h3>sponsorImgs</h3></div>
			<div class="field"><h3>backImg</h3></div>
			{@render fromEnd(updateAbout)}
		</form>
	{:else if page == "authors"}
		{#each authorForms as { id, form }}
			<h2>Author {id}</h2>
			<form {...enchance(form)}>
				{@render field("name", form.fields.name)}
				{@render field("subtitle", form.fields.subtitle)}
				{@render fieldTA("text", form.fields.text)}
				{@render field("tags", form.fields.tags)}
				<div class="field"><h3>img</h3></div>
				<div class="field"><h3>projects</h3></div>
				{@render fromEnd(form)}
			</form>
		{/each}
	{:else if page == "creators"}
		{#each creatorForms as { id, form }}
			<h2>Creator {id}</h2>
			<form {...enchance(form)}>
				{@render field("name", form.fields.name)}
				{@render field("subtitle", form.fields.subtitle)}
				{@render fieldTA("text", form.fields.text)}
				<div class="field"><h3>img</h3></div>
				<div class="field"><h3>projects</h3></div>
				{@render fromEnd(form)}
			</form>
		{/each}
	{/if}
</div>

{#snippet fromEnd(
	form: RemoteForm<any, any> | Omit<RemoteForm<any, any>, "for">,
)}
	{#each form.fields.allIssues() as issue}
		<p class="error">
			{issue.path.length > 0
				? `${issue.path.join(".")}: `
				: ""}{issue.message}
		</p>
	{/each}
	<button disabled={!!form.pending} class="saveBtn">save</button>
{/snippet}

{#snippet field(title: string, fields: typeof updateHeader.fields.authors)}
	<div class="field">
		<h3>{title}</h3>
		<label>
			<span>ru:</span>
			<input {...fields.ru.as("text")} autocomplete="off" />
		</label>
		<label>
			<span>zh:</span>
			<input {...fields.zh.as("text")} autocomplete="off" />
		</label>
	</div>
{/snippet}

{#snippet fieldS(title: string, field: typeof updateFooter.fields.date)}
	<div class="field fieldS">
		<h3>{title}</h3>
		<input {...field.as("text")} autocomplete="off" />
	</div>
{/snippet}

{#snippet fieldD(title: string, fields: typeof updateContacts.fields.mail)}
	{@render field(title, fields.title)}
	<div class="field fieldS">
		<span></span>
		<input {...fields.value.as("text")} autocomplete="off" />
	</div>
{/snippet}

{#snippet fieldTA(title: string, fields: typeof updateHeader.fields.authors)}
	<div class="field">
		<h3>{title}</h3>
		<label>
			<span>ru:</span>
			<textarea {...fields.ru.as("text")} autocomplete="off"></textarea>
		</label>
		<label>
			<span>zh:</span>
			<textarea {...fields.zh.as("text")} autocomplete="off"></textarea>
		</label>
	</div>
{/snippet}

<style>
	.page {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	nav {
		display: flex;
		font-size: 1.25rem;
		padding: 0 1rem;
		border-bottom: 1px solid currentColor;
	}
	nav button {
		padding: 0.25rem 1rem;
		border-right: 1px solid currentColor;
	}
	nav button:last-child {
		border-right: none;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.error {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: 1.25rem;
		color: #e63737;
	}

	.field {
		display: grid;
		grid-template-columns: 5rem 1fr 1fr;
		align-items: center;
		gap: 1rem;
	}
	.fieldS {
		grid-template-columns: 5rem 1fr;
	}
	.field label {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.field input {
		flex-grow: 1;
		border: none;
		border-bottom: 1px solid currentColor;
		outline: none;
	}
	.field textarea {
		flex-grow: 1;
		height: 20em;
		resize: vertical;
		border: none;
		border-bottom: 1px solid currentColor;
		outline: none;
	}

	.saveBtn {
		background-color: #00000011;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
	}

	h1,
	h2,
	h3 {
		font-family: Manrope, Arial, Helvetica, sans-serif;
	}
	h1 {
		font-size: 2.25rem;
	}
	h2 {
		font-size: 1.75rem;
	}
	h3 {
		font-size: 1.25rem;
	}
</style>
