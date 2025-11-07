import { getData } from "$lib/server/database";

export async function load({ locals })
{
	return { ...await getData(), user: locals.user };
}
