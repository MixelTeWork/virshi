export function scrolling(node: HTMLElement, { speed = 1 })
{
	let scrolling = true;
	let paused = false;
	let x = 0;
	let dx = 1;
	function scroll()
	{
		if (!paused)
		{
			x += dx * speed;
			if (dx > 0 && x > node.scrollWidth - node.offsetWidth) dx = -1;
			if (dx < 0 && x < 0) dx = 1;
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
		scroll();
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
