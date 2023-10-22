<script>
	import { page } from '$app/stores';
	import pokeball from '$lib/images/pokeball.png';
</script>

<header class="flex items-center justify-between bg-blue-800 text-white sticky top-0 z-50">
	<a href="/" class="w-[2.5%] h-1/12 block cursor-pointer ml-6">
		<img src={pokeball} alt="home" />
	</a>

	<nav class="">
		<ul class="flex gap-12 font-semibold text-lg">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Accueil</a>
			</li>
			|
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/pokemon-stats">Pokémon stats</a>
			</li>
			|
			<li aria-current={$page.url.pathname.startsWith('/iv-calculator') ? 'page' : undefined}>
				<a href="/iv-calculator">Iv calculator</a>
			</li>
		</ul>
	</nav>

	<div class="mr-6 text-lg font-semibold">Pokélab</div>
</header>
