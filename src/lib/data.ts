import { asset } from "$app/paths";

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

export const projects: IProject[] = [
	{
		id: "1",
		name: { ru: "Проект 1", zh: "Project 1" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: asset("/project1.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
	{
		id: "2",
		name: { ru: "Проект 2", zh: "Project 2" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: asset("/project2.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
	{
		id: "3",
		name: { ru: "Проект 3", zh: "Project 3" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: asset("/project3.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
	{
		id: "4",
		name: { ru: "Проект 4", zh: "Project 4" },
		subtitle: { ru: "Цифровое пространство · 2025", zh: "Digital space · 2025" },
		img: asset("/project4.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
	},
]


export const authors: IAuthor[] = [
	{
		id: "li",
		name: { ru: "Ли Цюнсы", zh: "Li Qiongsi" },
		subtitle: { ru: "Иммерсивный творец", zh: "Immersive Creator" },
		tags: [{ ru: "Спикер Брикс 2025", zh: "Brics Speaker 2025" }, { ru: "Художник", zh: "Artist" }, { ru: "Иммерсивный творец", zh: "Immersive Creator" }],
		img: asset("/author1.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
		projects,
	},
	{
		id: "ivan",
		name: { ru: "Иванов Иван", zh: "Ivan Ivanov" },
		subtitle: { ru: "Красноречивый оратор", zh: "Eloquent speaker" },
		tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Красноречивый оратор", zh: "Eloquent speaker" }],
		img: asset("/author2.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
		projects,
	},
	{
		id: "sofia",
		name: { ru: "София Марченко", zh: "Sofia Marchenko" },
		subtitle: { ru: "Цифровой художник", zh: "Digital Artist" },
		tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Цифровой художник", zh: "Digital Artist" }],
		img: asset("/author3.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
		projects,
	},
	{
		id: "petrov",
		name: { ru: "Алексей Петров", zh: "Alexey Petrov" },
		subtitle: { ru: "Архитектор виртуальности", zh: "Architect of Virtuality" },
		tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Архитектор виртуальности", zh: "Architect of Virtuality" }],
		img: asset("/author4.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
		projects,
	},
	{
		id: "tomas",
		name: { ru: "Томас Андерссон", zh: "Thomas Andersson" },
		subtitle: { ru: "Саунд-продюсер", zh: "Sound producer" },
		tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Саунд-продюсер", zh: "Sound producer" }],
		img: asset("/author5.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
		projects,
	},
	{
		id: "anna",
		name: { ru: "Анна Коваль", zh: "Anna Koval" },
		subtitle: { ru: "Сценограф-постановщик", zh: "Set designer" },
		tags: [{ ru: "Лорем ипсум", zh: "Lorem ipsum" }, { ru: "долор сит", zh: "dolor sit" }, { ru: "Сценограф-постановщик", zh: "Set designer" }],
		img: asset("/author6.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.\nИус ех идяуе темпорибус, хас цу нострум маиестатис, симул персиус вис те. Торяуатос цомпрехенсам не еос. Хис ат меис десеруиссе, нумяуам темпорибус меи еа, детрацто делецтус сингулис ан яуо. Оптион регионе лаборес иус но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto." },
		projects,
	},
];

export const creators: IAuthor[] = [
	{
		id: "ivan",
		name: { ru: "Иванов Иван", zh: "Ivan Ivanov" },
		subtitle: { ru: "Основатель проекта", zh: "Founder of the project" },
		tags: [],
		img: asset("/creator1.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
		projects: [],
	},
	{
		id: "lu",
		name: { ru: "Лю Сун цы", zh: "Liu Song ci" },
		subtitle: { ru: "Главный идеолог", zh: "Main ideologist" },
		tags: [],
		img: asset("/creator2.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
		projects: [],
	},
	{
		id: "petr",
		name: { ru: "Пётр Алексеевич", zh: "Peter Alekseevich" },
		subtitle: { ru: "Щедрый спонсор", zh: "Generous sponsor" },
		tags: [],
		img: asset("/creator3.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
		projects: [],
	},
	{
		id: "koval",
		name: { ru: "София Коваль", zh: "Sofia Koval" },
		subtitle: { ru: "Искусствовед", zh: "Art historian" },
		tags: [],
		img: asset("/creator4.jpg"),
		text: { ru: "Лорем ипсум долор сит амет, ад сед яуем вирис сплендиде. Сит ребум ириуре цонцлудатуряуе еи, пертинах интеллегам еум еа. Цаусае вивендум ад цум, аццумсан репрехендунт хас не, иллум индоцтум сеа но.", zh: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!" },
		projects: [],
	},
]