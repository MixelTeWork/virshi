import fs from "node:fs";
import fsp from "node:fs/promises";
import type { Data, IProject } from "$lib/types";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { building } from "$app/environment";

export const dataPath = "data/";
const dbPath = dataPath + "data.json";

let data: Data | null = null;

export async function getData()
{
	if (data) return data;
	return new Promise<Data>((res, rej) =>
	{
		fs.readFile(dbPath, "utf8", (err, json) =>
		{
			if (err) return rej(err);
			data = JSON.parse(json);
			res(data!);
		});
	});
}

export async function editData(fn: (data: Data) => void | Promise<void>)
{
	await fn(await getData());
	saveData();
}

type StringKeys<T> = {
	[K in keyof T]: T[K] extends string ? K : never
}[keyof T];
export async function updateImg<T>(obj: T, key: StringKeys<T>, file: File, nameForNew = "")
{
	// console.log("updateImg", key, file.name);
	const ext = file.name.split(".").at(-1) || "bin"
	const oldname = (obj[key] as string) || nameForNew + ".";
	const name = oldname.split(".").slice(0, -1).join(".").split("__");
	const newname = `${name.length > 1 ? name.slice(0, -1).join("__") : name[0]}__${randomUUID()}.${ext}`;
	(obj[key] as string) = newname;
	await fsp.writeFile(path.resolve(dataPath, newname), Buffer.from(await file.arrayBuffer()));
	await deleteImg(oldname);
}
export async function deleteImg(name: string)
{
	// console.log("deleteImg", name);
	const fname = path.resolve(dataPath, name);
	if (fs.existsSync(fname) && !fs.lstatSync(fname).isDirectory()) await fsp.rm(fname);
}


let saveTimeout: NodeJS.Timeout | null = null;
let saving = false;
function saveData(retries = 3)
{
	if (!data || saveTimeout || building) return;
	saveTimeout = setTimeout(() =>
	{
		if (saving) return saveData(retries);
		saveTimeout = null;
		saving = true;
		fs.writeFile(dbPath, JSON.stringify(data), "utf8", (err) =>
		{
			saving = false;
			if (!err) return;
			if (retries > 0) saveData(retries - 1);
			else console.error(err);
		});
	}, 500);
}


const _projects: IProject[] = [
	{
		id: "1",
		name: { ru: "Проект 1", zh: "Project 1" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: "project1.jpg",
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
	{
		id: "2",
		name: { ru: "Проект 2", zh: "Project 2" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: "project2.jpg",
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
	{
		id: "3",
		name: { ru: "Проект 3", zh: "Project 3" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: "project3.jpg",
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
	{
		id: "4",
		name: { ru: "Проект 4", zh: "Project 4" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: "project4.jpg",
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
];
const initial: Data = {
	txt: {
		header: {
			authors: { ru: "Авторы", zh: "Authors" },
			about: { ru: "О проекте", zh: "About project" },
			contact: { ru: "Контакты", zh: "Contacts" },
		},
		footer: {
			arrival: { ru: "Прибытие поезда «вирши»", zh: "Arrival of the train «Virshi»" },
			city: { ru: "г. москва", zh: "Moscow" },
			date: "28.12.2025",
			time: "10:00 — 21:00",
		},
		contacts: {
			title: { ru: "Контакты", zh: "Contacts" },
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet assumenda impedit quae, vero eum minima quasi quis saepe veniam sapiente pariatur accusantium tempore. Repudiandae error, possimus architecto enim corporis optio?\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, illum. Incidunt placeat quaerat quas beatae blanditiis excepturi cum, ad esse, assumenda saepe sunt similique eveniet tempora. Reiciendis inventore iure corporis." },
			mail: { title: { ru: "Почта", zh: "Mail" }, value: "mail@domen.ru" },
			phone: { title: { ru: "Телефон", zh: "Phone" }, value: "+7 (499) 343-33-32" },
			address: { title: { ru: "Адрес", zh: "Address" }, value: { ru: "г. Москва, проспект Вернадского, д. 76", zh: "76 Vernadsky Avenue, Moscow" } },
			map: "map.jpg",
		},
		authors: {
			title: { ru: "Авторы", zh: "Authors" },
		},
		author: {
			title: { ru: "Автор", zh: "Author" },
			bio: { ru: "Биография", zh: "Biography" },
			gallery: { ru: "Галерея", zh: "Gallery" },
			readmore: { ru: "Читать больше", zh: "Read more" },
		},
		about: {
			title: { ru: "О проекте", zh: "About proj" },
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet assumenda impedit quae, vero eum minima quasi quis saepe veniam sapiente pariatur accusantium tempore. Repudiandae error, possimus architecto enim corporis optio?\nLorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, illum. Incidunt placeat quaerat quas beatae blanditiis excepturi cum, ad esse, assumenda saepe sunt similique eveniet tempora. Reiciendis inventore iure corporis." },
			creators: { ru: "Создатели", zh: "Creators" },
			sponsors: { ru: "Спонсоры", zh: "Sponsors" },
			sponsorImgs: ["sponsor1.png", "sponsor2.png", "sponsor3.png", "sponsor4.png"],
			backImg: "about_bg.jpg",
		},
	},
	authors: [
		{
			id: "1",
			name: { ru: "Ли Цюнсы", zh: "Li Qiongsi" },
			subtitle: { ru: "Иммерсивный творец", zh: "Immersive Creator" },
			tags: [{ ru: "Спикер Брикс 2025", zh: "Brics Speaker 2025" }, { ru: "Художник", zh: "Artist" }, { ru: "Иммерсивный творец", zh: "Immersive Creator" }],
			img: "author1.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
			projects: _projects,
		},
		{
			id: "2",
			name: { ru: "Иванов Иван", zh: "Ivan Ivanov" },
			subtitle: { ru: "Красноречивый оратор", zh: "Eloquent speaker" },
			tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Красноречивый оратор", zh: "Eloquent speaker" }],
			img: "author2.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
			projects: [],
		},
		{
			id: "3",
			name: { ru: "София Марченко", zh: "Sofia Marchenko" },
			subtitle: { ru: "Цифровой художник", zh: "Digital Artist" },
			tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Цифровой художник", zh: "Digital Artist" }],
			img: "author3.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
			projects: [],
		},
		{
			id: "4",
			name: { ru: "Алексей Петров", zh: "Alexey Petrov" },
			subtitle: { ru: "Архитектор виртуальности", zh: "Architect of Virtuality" },
			tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Архитектор виртуальности", zh: "Architect of Virtuality" }],
			img: "author4.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
			projects: [],
		},
		{
			id: "5",
			name: { ru: "Томас Андерссон", zh: "Thomas Andersson" },
			subtitle: { ru: "Саунд-продюсер", zh: "Sound producer" },
			tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Саунд-продюсер", zh: "Sound producer" }],
			img: "author5.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
			projects: [],
		},
		{
			id: "6",
			name: { ru: "Анна Коваль", zh: "Anna Koval" },
			subtitle: { ru: "Сценограф-постановщик", zh: "Set designer" },
			tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Сценограф-постановщик", zh: "Set designer" }],
			img: "author6.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
			projects: [],
		},
	],
	creators: [
		{
			id: "1",
			name: { ru: "Иванов Иван", zh: "Ivan Ivanov" },
			subtitle: { ru: "Основатель проекта", zh: "Founder of the project" },
			tags: [],
			img: "creator1.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
			projects: [],
		},
		{
			id: "2",
			name: { ru: "Лю Сун цы", zh: "Liu Song ci" },
			subtitle: { ru: "Главный идеолог", zh: "Main ideologist" },
			tags: [],
			img: "creator2.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
			projects: [],
		},
		{
			id: "3",
			name: { ru: "Пётр Алексеевич", zh: "Peter Alekseevich" },
			subtitle: { ru: "Щедрый спонсор", zh: "Generous sponsor" },
			tags: [],
			img: "creator3.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
			projects: [],
		},
		{
			id: "4",
			name: { ru: "София Коваль", zh: "Sofia Koval" },
			subtitle: { ru: "Искусствовед", zh: "Art historian" },
			tags: [],
			img: "creator4.jpg",
			text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
			projects: [],
		},
	],
}

if (!building)
{
	if (!fs.existsSync(dbPath) || fs.readFileSync(dbPath, "utf8") == "")
	{
		fs.cpSync("data_initial", dataPath, { recursive: true, force: false });
		fs.writeFileSync(dbPath, JSON.stringify(initial), "utf8");
	}
}