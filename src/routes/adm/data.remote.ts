import * as v from "valibot";
import { error, redirect, type Invalid } from "@sveltejs/kit";
import { form, getRequestEvent } from "$app/server";
import { IAuthorTextScheme, ICreatorTextScheme, ItxtAboutScheme, ItxtAuthorScheme, ItxtAuthorsScheme, ItxtContactsScheme, ItxtFooterFormScheme, ItxtFooterScheme, ItxtHeaderScheme, type Data, type IProject } from "$lib/types";
import { deleteImg, editData, updateImg } from "$lib/server/database";
import { env } from '$env/dynamic/private';
import { createSession } from "$lib/server/auth";
import { resolve } from "$app/paths";
import { randomUUID } from "crypto";

export const login = form(
	v.object({ pwd: v.string() }),
	async (data, invalid) =>
	{
		const { url } = getRequestEvent();
		if (data.pwd != env.PASSWORD)
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
export const updateFooter = form(ItxtFooterFormScheme, update((D, data) => D.txt.footer = { ...data, speed: parseFloat(data.speed) }));
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
	console.log(data.sponsorImgs);
	const newImages = [] as string[];
	for (const file of data.sponsorImgs || [])
	{
		if (file.size > 0)
			await updateImg(newImages, newImages.length, file, "sponsor");
		else
		{
			const imgI = D.txt.about.sponsorImgs.indexOf(file.name);
			if (imgI < 0) continue;
			newImages.push(D.txt.about.sponsorImgs[imgI]);
			D.txt.about.sponsorImgs.splice(imgI, 1);
		}
	}
	for (const img of D.txt.about.sponsorImgs)
		await deleteImg(img);
	D.txt.about.sponsorImgs = newImages;
}));

export const modifyAuthor = form(IAuthorTextScheme, update(async (D, data, invalid) =>
{
	const authorI = D.authors.findIndex(v => v.id == data.id);
	if (authorI < 0) invalid("Wrong id");
	const old_author = D.authors[authorI];
	D.authors[authorI] = {
		...data,
		img: old_author.img,
		tags: zip(data.tags.ru.split(";"), data.tags.zh.split(";")).map(([ru, zh]) => ({ ru, zh })),
		projects: old_author.projects,
	};
	const author = D.authors[authorI];
	if (data.img) await updateImg(author, "img", data.img);
	const newProjects = [] as IProject[];
	for (const proj of data.projects || [])
	{
		if (proj.img.size > 0)
		{
			const newProj: IProject = { ...proj, img: "", id: randomUUID() };
			await updateImg(newProj, "img", proj.img, `project_a${author.id}`);
			newProjects.push(newProj);
		}
		else
		{
			const oldProjI = author.projects.findIndex(a => a.img == proj.img.name);
			if (oldProjI < 0) continue;
			const oldProj = author.projects[oldProjI];
			newProjects.push({ ...proj, img: oldProj.img, id: oldProj.id });
			author.projects.splice(oldProjI, 1);
		}
	}
	for (const proj of author.projects)
		await deleteImg(proj.img);
	author.projects = newProjects;
}));

export const addAuthor = form("unchecked", update(async (D, data, invalid) =>
{
	let nextId = 1;
	while (D.authors.some(a => a.id == `${nextId}`)) nextId++;
	D.authors.push({
		id: `${nextId}`,
		name: { ru: "", zh: "" },
		subtitle: { ru: "", zh: "" },
		tags: [],
		text: { ru: "", zh: "" },
		img: "",
		projects: [],
	})
}));
export const deleteAuthor = form(v.object({ id: v.string() }), update(async (D, data, invalid) =>
{
	const a = D.authors.findIndex(a => a.id == data.id);
	if (a < 0) invalid("Author not found");
	const author = D.authors.splice(a, 1)[0];
	await deleteImg(author.img);
	for (const proj of author.projects)
		await deleteImg(proj.img);
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

export const addCreator = form("unchecked", update(async (D, data, invalid) =>
{
	let nextId = 1;
	while (D.creators.some(a => a.id == `${nextId}`)) nextId++;
	D.creators.push({
		id: `${nextId}`,
		name: { ru: "", zh: "" },
		subtitle: { ru: "", zh: "" },
		tags: [],
		text: { ru: "", zh: "" },
		img: "",
		projects: [],
	})
}));
export const deleteCreator = form(v.object({ id: v.string() }), update(async (D, data, invalid) =>
{
	const a = D.creators.findIndex(a => a.id == data.id);
	if (a < 0) invalid("Creator not found");
	const creator = D.creators.splice(a, 1)[0];
	await deleteImg(creator.img);
}));

function update<T>(fn: (D: Data, data: T, invalid: Invalid) => any | Promise<any>)
{
	return async (data: T, invalid: Invalid) =>
	{
		const { locals } = getRequestEvent();
		if (!locals.user?.authed) error(401, "Unauthorized");
		await editData(D => fn(D, data, invalid));
		return "ok";
	}
}

const zip = <T>(...arr: T[][]) => Array(Math.max(...arr.map(a => a.length))).fill(undefined).map((_, i) => arr.map(a => a[i]));