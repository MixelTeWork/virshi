export interface LText
{
	ru: string;
	zh: string;
}

export interface IAuthor
{
	id: string;
	name: LText;
	subtitle: LText;
	tags: LText[];
	img: string;
	text: LText;
	projects: IProject[];
}

export interface IProject
{
	id: string;
	name: LText;
	subtitle: LText;
	img: string;
	text: LText;
}