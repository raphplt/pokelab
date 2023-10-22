<script>
	import iv_calculator from '$lib/images/iv_calculator.jpg';
	import pokemon_stats from '$lib/images/pokemon_stats.jpg';
	import Typewriter, { loop } from 'svelte-typewriter';
</script>

<svelte:head>
	<title>Accueil</title>
	<meta name="description" content="Pokélab Pokémon GO" />
</svelte:head>

<section
	class="bg-gradient-to-r from-blue-400 to-blue-600 flex flex-col sm:flex-row justify-center items-center w-full pt-12 pb-36 sm:h-[100vh]"
>
	<div class="sm:w-[20vw] w-2/3 h-[20vh] sm:-h-unset ml-3 sm:ml-28 mt-24 sm:mt-0">
		<h1 class="text-5xl sm:text-7xl font-roboto">Poké Lab</h1>
		<Typewriter mode="loop">
			<h1 class="text-xl sm:text-2xl">Maximisez votre aventure Pokémon GO avec nos outils</h1>
		</Typewriter>
	</div>
	<div class="flex flex-col items-center gap-10 mt-6">
		<h2 class="text-2xl">Découvrir :</h2>
		<a rel="stylesheet" href="/iv-calculator">
			<picture class="">
				<img
					src={iv_calculator}
					alt="Welcome"
					class=" mx-auto sm:w-2/5 w-3/4 h-1/2 rounded-xl border-2 border-black"
				/>
			</picture>
		</a>
		<a rel="stylesheet" href="/pokemon-stats">
			<picture class="">
				<img
					src={pokemon_stats}
					alt="Welcome"
					class=" mx-auto sm:w-2/5 w-3/4 h-1/2 rounded-xl border-2 border-black"
				/>
			</picture>
		</a>
	</div>
</section>
