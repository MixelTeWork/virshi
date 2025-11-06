import { getAuthors, getCreators } from "$lib/server/database";

export async function load()
{
	const [authors, creators] = await Promise.all([getAuthors(), getCreators()]);
	return { authors, creators };
}
