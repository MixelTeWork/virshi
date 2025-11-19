<script lang="ts">
	import type { RemoteForm, RemoteFormField } from "@sveltejs/kit";
	import {
		addAuthor,
		addCreator,
		deleteAuthor,
		deleteCreator,
		updateHeader,
		updateFooter,
		updateContacts,
		updateAuthors,
		updateAuthor,
		updateAbout,
		modifyAuthor,
		modifyCreator,
	} from "./data.remote";
	import FieldImg from "./InputImg.svelte";
	import { onMount } from "svelte";
	import AreYouSurePopup, { ask } from "./AreYouSurePopup.svelte";

	const { data } = $props();
	updateHeader.fields.set(data.txt.header);
	updateFooter.fields.set({ ...data.txt.footer, speed: `${data.txt.footer.speed}` });
	updateContacts.fields.set({ ...data.txt.contacts, map: undefined });
	updateAuthors.fields.set(data.txt.authors);
	updateAuthor.fields.set(data.txt.author);
	updateAbout.fields.set({
		...data.txt.about,
		backImg: undefined,
		sponsorImgs: [],
	});
	let sponsorImgs = $state(data.txt.about.sponsorImgs);
	onMount(() => {
		$effect(() => {
			const imgs = data.txt.about.sponsorImgs;
			sponsorImgs = imgs;
			updateAbout.fields.sponsorImgs.set(imgs.map((v) => new File([], v)));
			while (authorForms.length < data.authors.length) {
				const authorId = data.authors[authorForms.length].id;
				authorProjs.push([]);
				authorForms.push({ authorId, form: modifyAuthor.for(authorId) });
				authorCur = data.authors.length - 1;
			}
			authorForms.forEach((f, i) => {
				const author = data.authors.find((a) => a.id == f.authorId)!;
				f.form.fields.projects.set(author.projects.map((p) => ({ ...p, img: new File([], p.img) })));
				authorProjs[i] = author.projects.map((p) => p.img);
			});
			while (creatorForms.length < data.creators.length) {
				const creatorId = data.creators[creatorForms.length].id;
				creatorForms.push({ creatorId, form: modifyCreator.for(creatorId) });
				creatorCur = data.creators.length - 1;
			}
		});
	});

	const authorProjs = $state([] as string[][]);
	const authorForms = data.authors.map((author, i) => {
		const form = modifyAuthor.for(author.id);
		form.fields.set({
			...author,
			tags: {
				ru: author.tags.map((t) => t.ru).join(";"),
				zh: author.tags.map((t) => t.zh).join(";"),
			},
			img: undefined,
			projects: [],
		});
		authorProjs[i] = author.projects.map((p) => p.img);
		return { authorId: author.id, form };
	});

	const creatorForms = data.creators.map((creator, i) => {
		const form = modifyCreator.for(creator.id);
		form.fields.set({ ...creator, img: undefined });
		return { creatorId: creator.id, form };
	});

	function enchance<T extends RemoteForm<any, any> | Omit<RemoteForm<any, any>, "for">, K extends keyof T["fields"]>(
		f: T,
		resetFields: (K | [K, () => any])[] = [],
	) {
		return f.enhance(async ({ form, data, submit }) => {
			await submit();
			form.reset();
			await new Promise((r) => setTimeout(r));
			f.fields.set(data);
			resetFields.forEach((key: any) =>
				typeof key == "string" ? f.fields[key].set(null) : f.fields[key[0]].set(key[1]()),
			);
		});
	}

	type Page = "ui" | "pages" | "authors" | "creators";
	let page = $state("ui" as Page);
	const toPage = (p: Page) => () => (page = p);
	let authorCur = $state(0);
	const toAuthor = (a: number) => () => (authorCur = a);
	let creatorCur = $state(0);
	const toCreator = (a: number) => () => (creatorCur = a);
</script>

<svelte:head>
	<title>Управление</title>
</svelte:head>

<AreYouSurePopup />

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
			{@render fieldS("speed", updateFooter.fields.speed, "Множитель скорости прокрутки")}
			{@render fieldTA(
				"text",
				updateFooter.fields.text,
				false,
				"Текст разбивается на блоки по переносам строк, каждая строка делится по вертикальной черте |",
			)}
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
		<form {...enchance(updateContacts, ["map"])} enctype="multipart/form-data">
			{@render field("title", updateContacts.fields.title)}
			{@render fieldTA(
				"text",
				updateContacts.fields.text,
				false,
				"Текст разбивается на несколько <p> тегов по переносам строк",
			)}
			{@render fieldD("mail", updateContacts.fields.mail)}
			{@render fieldD("phone", updateContacts.fields.phone)}
			{@render field("address", updateContacts.fields.address.title)}
			{@render field("", updateContacts.fields.address.value)}
			{@render fieldImg("imapmg", updateContacts.fields.map, data.txt.contacts.map)}
			{@render fromEnd(updateContacts)}
		</form>
		<h2>About</h2>
		<form
			{...enchance(updateAbout, ["backImg", ["sponsorImgs", () => sponsorImgs.map((v) => new File([], v))]])}
			enctype="multipart/form-data"
		>
			{@render field("title", updateAbout.fields.title)}
			{@render fieldTA(
				"text",
				updateAbout.fields.text,
				false,
				"Текст разбивается на несколько <p> тегов по переносам строк",
			)}
			{@render field("creators", updateAbout.fields.creators)}
			{@render field("sponsors", updateAbout.fields.sponsors)}
			<div class="field fieldS">
				<h3>sponsors</h3>
				<div class="sponsors">
					<div class="sponsors__items">
						{#each sponsorImgs as img, i}
							<div>
								<FieldImg field={updateAbout.fields.sponsorImgs[i]} current={img} aspectRatio={2} />
								<button
									class="sponsors__remove"
									type="button"
									onclick={() => {
										for (let j = i; j < sponsorImgs.length - 1; j++) {
											updateAbout.fields.sponsorImgs[j].set(updateAbout.fields.sponsorImgs[j + 1].value());
										}
										updateAbout.fields.sponsorImgs[sponsorImgs.length - 1].set(new File([], ""));
										sponsorImgs.splice(i, 1);
									}}
								>
									Удалить
								</button>
							</div>
						{/each}
					</div>
					<button class="btnAdd" type="button" onclick={() => sponsorImgs.push("")}>Добавить</button>
				</div>
			</div>
			{@render fieldImg("backImg", updateAbout.fields.backImg, data.txt.about.backImg)}
			{@render fromEnd(updateAbout)}
		</form>
	{:else if page == "authors"}
		<nav>
			{#each data.authors as _, i}
				<button onclick={toAuthor(i)}>{i + 1}</button>
			{/each}
			<form {...addAuthor}>
				<button class="nav__addBtn" aria-label="add" type="submit"></button>
			</form>
		</nav>
		{@const { authorId, form } = authorForms[authorCur] || { authorId: null, form: null }}
		{@const prjs = authorProjs[authorCur]}
		{@const authorI = data.authors.findIndex((a) => a.id == authorId)}
		{@const author = data.authors[authorI]}
		{#if author}
			<div class="heading">
				<h2>Author {authorI + 1}</h2>
				<form
					{...deleteAuthor.enhance(async ({ form, data, submit }) => {
						if (!(await ask())) return;
						submit();
						const i = authorForms.findIndex((v) => v.authorId == data.id);
						if (i < 0) return;
						authorCur = i == 0 ? authorForms.length - 1 : 0;
						authorProjs.splice(i, 1);
						authorForms.splice(i, 1);
						authorCur = Math.min(i, authorForms.length - 1);
					})}
				>
					<input name="id" value={author.id} hidden />
					<button class="deleteBtn" type="submit">Удалить</button>
				</form>
			</div>
			{#key author.id}
				<form {...enchance(form, ["img"])} enctype="multipart/form-data">
					{@render field("name", form.fields.name)}
					{@render field("subtitle", form.fields.subtitle)}
					{@render fieldTA(
						"text",
						form.fields.text,
						false,
						"Текст разбивается на несколько <p> тегов по переносам строк",
					)}
					{@render field("tags", form.fields.tags, "Строка делится на теги по точке с запятой (;)")}
					{@render fieldImg("img", form.fields.img, author.img, 4 / 5)}
					<div class="field fieldS">
						<h3 style:align-self="flex-start">projects</h3>
						<div class="projects">
							{#each prjs as proj, i}
								<div>
									{@render field("name", form.fields.projects[i].name)}
									{@render field("subtitle", form.fields.projects[i].subtitle)}
									{@render fieldTA(
										"text",
										form.fields.projects[i].text,
										true,
										"Текст разбивается на несколько <p> тегов по переносам строк",
									)}
									{@render fieldImg("img", form.fields.projects[i].img, proj)}
									<button
										class="projects__remove"
										type="button"
										onclick={() => {
											for (let j = i; j < prjs.length - 1; j++) {
												form.fields.projects[j].set(form.fields.projects[j + 1].value());
											}
											form.fields.projects[prjs.length - 1].set({} as any);
											prjs.splice(i, 1);
										}}
									>
										Удалить
									</button>
								</div>
							{/each}
							<button class="btnAdd" type="button" onclick={() => prjs.push("")}>Добавить</button>
						</div>
					</div>
					{@render fromEnd(form)}
				</form>
			{/key}
		{/if}
	{:else if page == "creators"}
		<nav>
			{#each data.creators as _, i}
				<button onclick={toCreator(i)}>{i + 1}</button>
			{/each}
			<form {...addCreator}>
				<button class="nav__addBtn" aria-label="add" type="submit"></button>
			</form>
		</nav>
		{@const { creatorId, form } = creatorForms[creatorCur]}
		{@const creatorI = data.creators.findIndex((a) => a.id == creatorId)}
		{@const creator = data.creators[creatorI]}
		{#if creator}
			<div class="heading">
				<h2>Creator {creatorI + 1}</h2>
				<form
					{...deleteCreator.enhance(async ({ form, data, submit }) => {
						if (!(await ask())) return;
						submit();
						const i = creatorForms.findIndex((v) => v.creatorId == data.id);
						if (i < 0) return;
						creatorCur = i == 0 ? creatorForms.length - 1 : 0;
						creatorForms.splice(i, 1);
						creatorCur = Math.min(i, creatorForms.length - 1);
					})}
				>
					<input name="id" value={creator.id} hidden />
					<button class="deleteBtn" type="submit">Удалить</button>
				</form>
			</div>
			{#key creator.id}
				<form {...enchance(form, ["img"])} enctype="multipart/form-data">
					{@render field("name", form.fields.name)}
					{@render field("subtitle", form.fields.subtitle)}
					{@render fieldTA(
						"text",
						form.fields.text,
						true,
						"Текст разбивается на несколько <p> тегов по переносам строк",
					)}
					{@render fieldImg("img", form.fields.img, creator.img)}
					{@render fromEnd(form)}
				</form>
			{/key}
		{/if}
	{/if}
</div>

{#snippet fromEnd(form: RemoteForm<any, any> | Omit<RemoteForm<any, any>, "for">)}
	{#each form.fields.allIssues() as issue}
		<p class="error">
			{issue.path.length > 0 ? `${issue.path.join(".")}: ` : ""}{issue.message}
		</p>
	{/each}
	{#if !!form.pending || !!form.result}
		<p class={["result", { result_end: !form.pending }]}>
			{#if !!form.pending}
				Отправка...
			{:else}
				Сохранено
			{/if}
		</p>
	{/if}
	<button disabled={!!form.pending} class="saveBtn">Сохранить</button>
{/snippet}

{#snippet helpIco(text?: string)}
	{#if text}
		<span class="help">
			<span class="help__text">{text}</span>
		</span>
	{/if}
{/snippet}

{#snippet field(title: string, fields: typeof updateHeader.fields.authors, text?: string)}
	<div class="field">
		<h3>
			<span>{title}</span>
			{@render helpIco(text)}
		</h3>
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

{#snippet fieldS(title: string, field: typeof updateFooter.fields.speed, text?: string)}
	<div class="field fieldS">
		<h3>
			<span>{title}</span>
			{@render helpIco(text)}
		</h3>
		<input {...field.as("text")} autocomplete="off" />
	</div>
{/snippet}

{#snippet fieldD(title: string, fields: typeof updateContacts.fields.mail, text?: string)}
	{@render field(title, fields.title, text)}
	<div class="field fieldS">
		<span></span>
		<input {...fields.value.as("text")} autocomplete="off" />
	</div>
{/snippet}

{#snippet fieldTA(title: string, fields: typeof updateHeader.fields.authors, small: boolean = false, text?: string)}
	<div class={["field", { smallTA: small }]}>
		<h3>
			<span>{title}</span>
			{@render helpIco(text)}
		</h3>
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

{#snippet fieldImg(title: string, field: RemoteFormField<File>, current: string, aspectRatio?: number)}
	<div class="field fieldS">
		<h3>{title}</h3>
		<FieldImg {field} {current} {aspectRatio} />
	</div>
{/snippet}

<style>
	.page {
		max-width: 900px;
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

	.nav__addBtn::before {
		content: "+";
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: #1dbe4e;
		border: 1px solid currentColor;
		width: 0.9em;
		height: 0.9em;
		border-radius: 0.2em;
		padding-bottom: 2px;
		transition: background-color 150ms;
	}
	.nav__addBtn:hover::before {
		background-color: #1dbe4e22;
	}
	.nav__addBtn:active::before {
		background-color: #1dbe4e11;
	}
	.deleteBtn {
		color: #e63737;
		background-color: #e6373711;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		transition: background-color 150ms;
	}
	.deleteBtn:hover {
		background-color: #e6373722;
	}
	.deleteBtn:active {
		background-color: #e6373708;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.sponsors {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.sponsors__items {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.sponsors__items > div {
		position: relative;
	}
	.sponsors__remove {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #e63737bb;
		color: white;
		padding: 0.2rem 0.4rem;
		border-radius: 0 0 0.5rem 0.5rem;
		opacity: 0.5;
		transition: opacity 150ms;
	}
	.sponsors__items > div:hover .sponsors__remove {
		opacity: 1;
	}
	.btnAdd {
		background-color: #00000011;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		transition: background-color 150ms;
	}
	.btnAdd:hover {
		background-color: #00000022;
	}
	.btnAdd:active {
		background-color: #00000008;
	}

	.heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.projects > div {
		display: flex;
		flex-direction: column;
		border-top: 1px solid currentColor;
		padding: 0.5rem;
		gap: 1rem;
	}
	.projects > div:first-child {
		border: none;
	}
	.projects__remove {
		background-color: #e6373722;
		color: black;
		padding: 0.2rem 0.4rem;
		border-radius: 0.5rem;
		transition: background-color 150ms;
	}
	.projects__remove:hover {
		background-color: #e6373733;
	}
	.projects__remove:active {
		background-color: #e6373715;
	}

	.error {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: 1.25rem;
		color: #e63737;
	}
	.result {
		font-family: Manrope, Arial, Helvetica, sans-serif;
		font-size: 1.25rem;
		color: #1dbe4e;
		transition: display 500ms allow-discrete;
	}
	.result_end {
		display: none;
	}

	.field {
		display: grid;
		grid-template-columns: 6rem 1fr 1fr;
		align-items: center;
		gap: 1rem;
	}
	.fieldS {
		grid-template-columns: 6rem 1fr;
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
	.smallTA textarea {
		height: 10em;
	}

	.help {
		position: relative;
		padding: 0.15rem;
	}
	.help::before {
		content: "?";
		display: inline-flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		border-radius: 1em;
		font-size: 0.75rem;
		width: 1em;
		height: 1em;
		background-color: #00ff0022;
	}
	.help__text {
		position: absolute;
		bottom: 100%;
		left: 50%;
		width: 200px;
		max-width: max-content;
		translate: -50% 0;
		font-size: 0.95rem;
		background-color: white;
		border: 1px solid black;
		padding: 0.25rem 0.5rem;
		display: none;
	}
	.help:hover .help__text {
		display: block;
	}

	.saveBtn {
		background-color: #00000011;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		transition: background-color 150ms;
	}
	.saveBtn:hover {
		background-color: #00000022;
	}
	.saveBtn:active {
		background-color: #00000008;
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
