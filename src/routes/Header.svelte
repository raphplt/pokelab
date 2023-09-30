<script>
	import { page } from '$app/stores';
</script>

<header class="flex items-center justify-between bg-blue-400">
	<div class="">
		<a href="/">
			HOME
		</a>
	</div>

	<nav class="">
		<ul class="flex gap-20 font-semibold text-lg">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Accueil</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/pokemon-stats">Pokémon stats</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/iv-calculator') ? 'page' : undefined}>
				<a href="/iv-calculator">Iv calculator</a>
			</li>	
		</ul>
	</nav>

	<div class="corner">
	</div>
</header>

