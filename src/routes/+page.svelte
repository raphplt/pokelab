<script>
	import background from '$lib/images/background.jpg';
	import Icon from '@iconify/svelte';
	import Typewriter from 'svelte-typewriter';
</script>

<svelte:head>
	<title>Accueil</title>
	<meta name="description" content="Pokélab Pokémon GO" />
</svelte:head>

<section
	class="bg-gradient-to-r flex flex-col sm:flex-row justify-center items-center w-full pt-12 h-screen"
	style="background-image: url({background}); background-size: cover; background-position: center;"
>
	<div class="flex flex-col items-center flex-1 w-1/2">
		<div
			class="w-10/12 mx-auto flex flex-col items-center p-6 rounded-xl overflow-hidden"
			style="background-color: rgba(255, 255, 255, 0.5); backdrop-filter: blur(8px);"
		>
			<h1 class="text-5xl sm:text-6xl font-roboto">PokéLab</h1>
			<Typewriter mode="loop">
				<h1 class="text-md sm:text-lg mt-4">Maximisez votre aventure Pokémon GO avec nos outils</h1>
			</Typewriter>
		</div>
		
	</div>
	<div class="flex flex-col items-center flex-1 w-1/2 gap-y-5">
		<a rel="stylesheet" href="/pokemon-stats">
			<div
				class="w-96 mx-auto flex flex-col items-center p-5 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
				style="background-color: rgba(255, 255, 255, 0.5); backdrop-filter: blur(8px);"
			>
				<Icon icon="mdi:pokeball" width={50} />
				<h2 class="text-xl font-bold py-1">Statistiques des Pokémon</h2>
				<p class="py-2 mb-4">Découvrez les statistiques de tous les Pokémon</p>
				<Icon icon="mdi:arrow-right" width={24} class="absolute bottom-3 right-3" />
			</div>
		</a>
		<a rel="stylesheet" href="/iv-calculator">
			<div
				class="w-96 mx-auto flex flex-col items-center p-5 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
				style="background-color: rgba(255, 255, 255, 0.5); backdrop-filter: blur(8px);"
			>
				<Icon icon="mdi:calculator-variant" width={50} />
				<h2 class="text-xl font-bold py-1">Calculateur d'IV</h2>
				<p class="py-2">Calculer les IV de vos Pokémon</p>
				<Icon icon="mdi:arrow-right" width={24} class="absolute bottom-3 right-3" />
			</div>
		</a>
	</div>
</section>
