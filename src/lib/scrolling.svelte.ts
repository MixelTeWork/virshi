export function scrolling(node: HTMLElement, { speed = 1, delay = 500 })
{
	let scrolling = true;
	let paused = false;
	let x = 0;
	let dx = 1;
	let delayCur = 0;
	let pt = 0;
	function scroll(t: number)
	{
		if (pt <= 0) pt = t;
		const dt = t - pt;
		pt = t;
		if (delayCur > 0)
		{
			delayCur -= dt;
		}
		else if (!paused)
		{
			x += dx * speed * dt / 30;
			if (dx > 0 && x > node.scrollWidth - node.offsetWidth) { dx = -1; delayCur = delay; }
			if (dx < 0 && x < 0) { dx = 1; delayCur = delay; }
			node.scrollTo(x, 0);
		}
		if (scrolling) requestAnimationFrame(scroll);
	}
	function onenter()
	{
		paused = true;
	}
	function onleave()
	{
		x = node.scrollLeft;
		paused = false;
	}
	$effect(() =>
	{
		scroll(0);
		node.addEventListener("mouseenter", onenter);
		node.addEventListener("mouseleave", onleave);
		node.addEventListener("touchstart", onenter);
		node.addEventListener("touchend", onleave);
		return () =>
		{
			scrolling = false;
			node.removeEventListener("mouseenter", onenter);
			node.removeEventListener("mouseleave", onleave);
			node.removeEventListener("touchstart", onenter);
			node.removeEventListener("touchend", onleave);
		}
	});
}
