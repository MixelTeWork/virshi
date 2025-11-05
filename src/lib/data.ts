import { asset } from "$app/paths";

export interface IAuthor
{
	id: string;
	name: string;
	subtitle: string;
	tags: string[];
	img: string;
	text: string;
	projects: IProject[];
}

export interface IProject
{
	id: string;
	name: string;
	subtitle: string;
	img: string;
	text: string;
}

export const projects: IProject[] = [
	{
		id: "1",
		name: "Проект 1",
		subtitle: "Цифровое пространство · 2025",
		img: asset("/project1.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
	},
	{
		id: "2",
		name: "Проект 2",
		subtitle: "Цифровое пространство · 2025",
		img: asset("/project2.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
	},
	{
		id: "3",
		name: "Проект 3",
		subtitle: "Цифровое пространство · 2025",
		img: asset("/project3.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
	},
	{
		id: "4",
		name: "Проект 4",
		subtitle: "Цифровое пространство · 2025",
		img: asset("/project4.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
	},
]


export const authors: IAuthor[] = [
	{
		id: "li",
		name: "Ли Цюнсы",
		subtitle: "Иммерсивный творец",
		tags: ["Спикер Брикс 2025", "Художник", "Иммерсивный творец"],
		img: asset("/author1.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto.",
		projects,
	},
	{
		id: "ivan",
		name: "Иванов Иван",
		subtitle: "Красноречивый оратор",
		tags: ["Lorem ipsum", "dolor sit", "Красноречивый оратор"],
		img: asset("/author2.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto.",
		projects,
	},
	{
		id: "sofia",
		name: "София Марченко",
		subtitle: "Цифровой художник",
		tags: ["Lorem ipsum", "dolor sit", "Цифровой художник"],
		img: asset("/author3.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto.",
		projects,
	},
	{
		id: "petrov",
		name: "Алексей Петров",
		subtitle: "Архитектор виртуальности",
		tags: ["Lorem ipsum", "dolor sit", "Архитектор виртуальности"],
		img: asset("/author4.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto.",
		projects,
	},
	{
		id: "tomas",
		name: "Томас Андерссон",
		subtitle: "Саунд-продюсер",
		tags: ["Lorem ipsum", "dolor sit", "Саунд-продюсер"],
		img: asset("/author5.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto.",
		projects,
	},
	{
		id: "anna",
		name: "Анна Коваль",
		subtitle: "Сценограф-постановщик",
		tags: ["Lorem ipsum", "dolor sit", "Сценограф-постановщик"],
		img: asset("/author6.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae ex natus quasi dolorem voluptate aspernatur illum nulla culpa molestiae fuga. Neque repudiandae ipsam voluptatem amet consectetur vel, harum ab architecto.",
		projects,
	},
];

export const creators: IAuthor[] = [
	{
		id: "ivan",
		name: "Иванов Иван",
		subtitle: "Основатель проекта",
		tags: [],
		img: asset("/creator1.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
		projects: [],
	},
	{
		id: "lu",
		name: "Лю Цунсы",
		subtitle: "Главный идеолог",
		tags: [],
		img: asset("/creator2.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
		projects: [],
	},
	{
		id: "petr",
		name: "Пётр Алексеевич",
		subtitle: "Щедрый спонсор",
		tags: [],
		img: asset("/creator3.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
		projects: [],
	},
	{
		id: "koval",
		name: "София Коваль",
		subtitle: "Искусствовед",
		tags: [],
		img: asset("/creator4.jpg"),
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fuga accusantium et hic! Architecto ipsam laborum doloribus dolorum numquam ut magnam commodi fuga dolores, ducimus sapiente, labore, minima cupiditate natus!",
		projects: [],
	},
]