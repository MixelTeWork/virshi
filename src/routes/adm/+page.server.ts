import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export async function load({ locals })
{
	if (!locals.user?.authed)
		redirect(303, resolve("/adm/login") + "?fwd=/adm");
}
