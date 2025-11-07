import { randomUUID } from "crypto";

const sessions: {
	[_: string]: number,
} = {};

export function getUser(sessionid: string | undefined)
{
	const sessEnd = sessions[sessionid || ""];
	if (sessEnd && Date.now() < sessEnd)
		return { authed: true };
	return { authed: false };
}

export function createSession()
{
	removeOutdated();
	const uuid = randomUUID();
	sessions[uuid] = Date.now() + 1000 * 60 * 60 * 24 * 7;
	return uuid;
}

export function deleteSession(sessionid: string | undefined)
{
	delete sessions[sessionid || ""];
}

function removeOutdated()
{
	const now = Date.now();
	Object.keys(sessions).forEach(key =>
	{
		if (sessions[key] < now)
			delete sessions[key];
	});
}