import * as v from "valibot";

export type LText = v.InferOutput<typeof LTextScheme>;
export const LTextScheme = v.object({
	ru: v.string(),
	zh: v.string(),
});

export type IProject = v.InferOutput<typeof IProjectScheme>;
export const IProjectScheme = v.object({
	id: v.string(),
	name: LTextScheme,
	subtitle: LTextScheme,
	img: v.string(),
	text: LTextScheme,
});

export type IAuthorText = v.InferOutput<typeof IAuthorTextScheme>;
export const IAuthorTextScheme = v.object({
	id: v.string(),
	name: LTextScheme,
	subtitle: LTextScheme,
	text: LTextScheme,
	tags: LTextScheme,
});
export type ICreatorText = v.InferOutput<typeof ICreatorTextScheme>;
export const ICreatorTextScheme = v.object({
	id: v.string(),
	name: LTextScheme,
	subtitle: LTextScheme,
	text: LTextScheme,
});
export type IAuthor = v.InferOutput<typeof IAuthorScheme>;
export const IAuthorScheme = v.intersect([v.omit(IAuthorTextScheme, ["tags"]), v.object({
	img: v.string(),
	tags: v.array(LTextScheme),
	projects: v.array(IProjectScheme),
})]);

export type ItxtHeader = v.InferOutput<typeof ItxtHeaderScheme>;
export const ItxtHeaderScheme = v.object({
	authors: LTextScheme,
	about: LTextScheme,
	contact: LTextScheme,
});

export type ItxtFooter = v.InferOutput<typeof ItxtFooterScheme>;
export const ItxtFooterScheme = v.object({
	arrival: LTextScheme,
	city: LTextScheme,
	date: v.string(),
	time: v.string(),
});

export type ItxtContacts = v.InferOutput<typeof ItxtContactsScheme>;
export const ItxtContactsScheme = v.object({
	title: LTextScheme,
	text: LTextScheme,
	mail: v.object({ title: LTextScheme, value: v.string() }),
	phone: v.object({ title: LTextScheme, value: v.string() }),
	address: v.object({ title: LTextScheme, value: LTextScheme }),
});
export type ItxtContactsFull = v.InferOutput<typeof ItxtContactsFullScheme>;
export const ItxtContactsFullScheme = v.intersect([ItxtContactsScheme, v.object({
	map: v.string(),
})]);

export type ItxtAuthors = v.InferOutput<typeof ItxtAuthorsScheme>;
export const ItxtAuthorsScheme = v.object({
	title: LTextScheme,
});

export type ItxtAuthor = v.InferOutput<typeof ItxtAuthorScheme>;
export const ItxtAuthorScheme = v.object({
	title: LTextScheme,
	bio: LTextScheme,
	gallery: LTextScheme,
	readmore: LTextScheme,
});

export type ItxtAbout = v.InferOutput<typeof ItxtAboutScheme>;
export const ItxtAboutScheme = v.object({
	title: LTextScheme,
	text: LTextScheme,
	creators: LTextScheme,
	sponsors: LTextScheme,
});
export type ItxtAboutFull = v.InferOutput<typeof ItxtAboutFullScheme>;
export const ItxtAboutFullScheme = v.intersect([ItxtAboutScheme, v.object({
	sponsorImgs: v.array(v.string()),
	backImg: v.string(),
})]);

export interface Data
{
	authors: IAuthor[],
	creators: IAuthor[],
	txt: {
		header: ItxtHeader,
		footer: ItxtFooter,
		contacts: ItxtContactsFull,
		authors: ItxtAuthors,
		author: ItxtAuthor,
		about: ItxtAboutFull,
	}
}
