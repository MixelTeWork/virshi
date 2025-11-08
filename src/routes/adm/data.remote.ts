import * as v from "valibot";
import { error, redirect, type Invalid } from "@sveltejs/kit";
import { form, getRequestEvent } from "$app/server";
import { IAuthorTextScheme, ICreatorTextScheme, ItxtAboutScheme, ItxtAuthorScheme, ItxtAuthorsScheme, ItxtContactsScheme, ItxtFooterScheme, ItxtHeaderScheme, type Data } from "$lib/types";
import { editData, updateImg } from "$lib/server/database";
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
export const updateContacts = form(ItxtContactsScheme, update(async (D, data) =>
{
	D.txt.contacts = { ...data, map: D.txt.contacts.map }
	if (data.map) await updateImg(D.txt.contacts, "map", data.map);
}));
export const updateAuthors = form(ItxtAuthorsScheme, update((D, data) => D.txt.authors = data));
export const updateAuthor = form(ItxtAuthorScheme, update((D, data) => D.txt.author = data));
export const updateAbout = form(ItxtAboutScheme, update(async (D, data) =>
{
	D.txt.about = { ...data, sponsorImgs: D.txt.about.sponsorImgs, backImg: D.txt.about.backImg };
	if (data.backImg) await updateImg(D.txt.about, "backImg", data.backImg);
}));

export const modifyAuthor = form(IAuthorTextScheme, update(async (D, data, invalid) =>
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
	if (data.img) await updateImg(D.authors[authorI], "img", data.img);
}));

export const modifyCreator = form(ICreatorTextScheme, update(async (D, data, invalid) =>
{
	const creatorI = D.creators.findIndex(v => v.id == data.id);
	if (creatorI < 0) invalid("Wrong id");
	const creator = D.creators[creatorI];
	D.creators[creatorI] = {
		...data,
		img: creator.img,
		tags: creator.tags,
		projects: creator.projects,
	};
	if (data.img) await updateImg(D.creators[creatorI], "img", data.img);
}));

function update<T>(fn: (D: Data, data: T, invalid: Invalid) => void)
{
	return (data: T, invalid: Invalid) =>
	{
		const { locals } = getRequestEvent();
		if (!locals.user?.authed) error(401, "Unauthorized");
		editData(D => fn(D, data, invalid));
		return "ok";
	}
}

const zip = <T>(...arr: T[][]) => Array(Math.max(...arr.map(a => a.length))).fill(undefined).map((_, i) => arr.map(a => a[i]));