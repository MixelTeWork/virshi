import { error } from '@sveltejs/kit';

export async function load({ parent, params })
{
	const data = await parent();
	let slug = params.slug;
	const author = data.authors.find((v) => v.id == slug);
	if (!author) error(404);
}
