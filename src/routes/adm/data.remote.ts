import * as v from "valibot";
import { error, redirect, type Invalid } from "@sveltejs/kit";
import { form, getRequestEvent } from "$app/server";
import { IAuthorTextScheme, ICreatorTextScheme, ItxtAboutScheme, ItxtAuthorScheme, ItxtAuthorsScheme, ItxtContactsScheme, ItxtFooterScheme, ItxtHeaderScheme, type Data } from "$lib/types";
import { editData } from "$lib/server/database";
import { env } from '$env/dynamic/private';
import { createSession } from "$lib/server/auth";
import { resolve } from "$app/paths";

export const login = form(
	v.object({ pwd: v.string() }),
	async (data, invalid) =>
	{
		const { url } = getRequestEvent();
		if (data.pwd != env.PWD)
		{
			invalid(invalid.pwd("Wrong pwd"));
			return;
		}
		const { cookies } = getRequestEvent();
		cookies.set("sessionid", createSession(), { path: "/", httpOnly: true, secure: true, sameSite: true });
		redirect(303, url.searchParams.get("fwd") || resolve("/adm"));
	}
);

export const updateHeader = form(ItxtHeaderScheme, update((D, data) => D.txt.header = data));
export const updateFooter = form(ItxtFooterScheme, update((D, data) => D.txt.footer = data));
export const updateContacts = form(ItxtContactsScheme, update((D, data) => D.txt.contacts = { ...data, map: D.txt.contacts.map }));
export const updateAuthors = form(ItxtAuthorsScheme, update((D, data) => D.txt.authors = data));
export const updateAuthor = form(ItxtAuthorScheme, update((D, data) => D.txt.author = data));
export const updateAbout = form(ItxtAboutScheme, update((D, data) => D.txt.about = { ...data, sponsorImgs: D.txt.about.sponsorImgs, backImg: D.txt.about.backImg }));

export const modifyAuthor = form(IAuthorTextScheme, update((D, data, invalid) =>
{
	const authorI = D.authors.findIndex(v => v.id == data.id);
	if (authorI < 0) invalid("Wrong id");
	const author = D.authors[authorI];
	D.authors[authorI] = {
		...data,
		img: author.img,
		tags: zip(data.tags.ru.split(";"), data.tags.zh.split(";")).map(([ru, zh]) => ({ ru, zh })),
		projects: author.projects,
	};
}));

export const modifyCreator = form(ICreatorTextScheme, update((D, data, invalid) =>
{
	const authorI = D.creators.findIndex(v => v.id == data.id);
	if (authorI < 0) invalid("Wrong id");
	const author = D.creators[authorI];
	D.creators[authorI] = {
		...data,
		img: author.img,
		tags: author.tags,
		projects: author.projects,
	};
}));

function update<T>(fn: (D: Data, data: T, invalid: Invalid) => void)
{
	return (data: T, invalid: Invalid) =>
	{
		const { locals } = getRequestEvent();
		if (!locals.user?.authed) error(401, "Unauthorized");
		editData(D => fn(D, data, invalid));
	}
}

const zip = <T>(...arr: T[][]) => Array(Math.max(...arr.map(a => a.length))).fill(undefined).map((_, i) => arr.map(a => a[i]));