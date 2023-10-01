<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import iv_calculator from '$lib/images/iv_calculator.jpg';
	import pokemon_stats from '$lib/images/pokemon_stats.jpg';
</script>

<svelte:head>
	<title>Accueil</title>
	<meta name="description" content="Pokélab Pokémon GO" />
</svelte:head>

<section class=" bg-blue-400 flex flex-row justify-center items-center w-full pt-12 pb-36">
	<div class="w-1/2 ml-24">
		<h1 class="text-6xl">Poké Lab</h1>
		<h2 class="text-xl mt-2">Maximisez votre aventure Pokémon GO avec nos outils</h2>
	</div>
	<div class="flex flex-col gap-20">
		<a rel="stylesheet" href="/iv-calculator">
			<picture class="">
				<img src={iv_calculator} alt="Welcome" class=" mx-auto w-1/2 h-1/2 rounded-xl" />
			</picture>
		</a>
		<a rel="stylesheet" href="/pokemon-stats">
			<picture class="">
				<img src={pokemon_stats} alt="Welcome" class=" mx-auto w-1/2 h-1/2 rounded-xl" />
			</picture>
		</a>
	</div>
</section>
