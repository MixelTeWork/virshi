import { deleteSession } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';

export async function GET({ locals, cookies })
{
	if (locals.user.authed)
	{
		deleteSession(cookies.get("sessionid"));
		cookies.delete("sessionid", { path: "/" });
	}
	redirect(303, "/");
}