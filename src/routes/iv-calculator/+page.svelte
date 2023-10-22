<script>
	import IvBar from '../../components/+iv_bar.svelte';
	import arrow_down from '$lib/images/arrow_down.png';
	import { onMount } from 'svelte';
	import { apiData, pokemonNames, pokemonStats } from './store';
	import logo_sword from '$lib/images/logo_sword.png';
	import logo_pv from '$lib/images/logo_pv.png';
	import logo_stamina from '$lib/images/logo_stamina.png';
	import stats from '$lib/images/stats.png';
	import question_mark from '$lib/images/question_mark.png';
	import Appraisal_Rating_0 from '$lib/images/Appraisal_Rating_0.webp';
	import Appraisal_Rating_1 from '$lib/images/Appraisal_Rating_1.webp';
	import Appraisal_Rating_2 from '$lib/images/Appraisal_Rating_2.webp';
	import Appraisal_Rating_3 from '$lib/images/Appraisal_Rating_3.webp';
	import Appraisal_Rating_4 from '$lib/images/Appraisal_Rating_4.webp';

	async function loadData() {
		const unsubscribe = apiData.subscribe(($apiData) => {
			if (Object.keys($apiData).length === 0) {
				return;
			}
			calculIV();
		});

		onMount(() => unsubscribe);
	}

	loadData();

	// Statistiques d'IV  d'attaque, défense et PV
	let attack = 0;
	let stamina = 0;
	let hp = 0;

	// IV du Pokémon
	let iv = 0;

	// Calcul des IV
	function calculIV() {
		iv = Math.floor(((attack + stamina + hp) / 45) * 100);
	}

	// Reset des IV
	function resetIV() {
		attack = stamina = hp = iv = 0;
	}
</script>

<svelte:head>
	<title>Pokelab | Calculateur d'IV</title>
	<meta name="description" content="Calculateur d'IV Pokémon GO" />
</svelte:head>

<section class="">
	<h1 class="text-2xl text-center mt-6 py-4">Bienvenue sur le calculateur d'IV pokémon !</h1>
	<h2 class="text-center text-xl py-3 pb-8">
		Vous pouvez ici calculer les IV de votre pokémon en fonction de ses statistiques.
	</h2>

	<div
		class="w-2/5 mx-auto flex gap-10 flex-col justify-center bg-slate-100 py-8 px-20 rounded-lg drop-shadow-md"
	>
		<div>
			<h3 class="mb-2">Attaque : {attack}</h3>
			<IvBar bind:attack stamina={null} hp={null} />
		</div>
		<div>
			<h3 class="mb-2">Défense : {stamina}</h3>
			<IvBar attack={null} bind:stamina hp={null} />
		</div>
		<div>
			<h3 class="mb-2">PV : {hp}</h3>
			<IvBar attack={null} stamina={null} bind:hp />
		</div>
	</div>
	<div class="flex mt-12 mb-6 justify-center">
		<button
			on:click={() => resetIV()}
			class="rounded-2xl bg-[#EF4444] hover:bg-[#a14242] text-white w-fit py-1 px-6 text-lg mr-4"
		>
			Effacer
		</button>
		<button
			on:click={() => {
				calculIV();
			}}
			class="rounded-2xl bg-[#06B6D4] hover:bg-[#3a8694] text-white w-fit py-1 px-6 text-lg"
		>
			Calculer les IV
		</button>
	</div>
	<div class="rounded-lg mx-auto w-fit px-4 py-2 h-[20vh]">
		{#if iv == 100}
			<div
				class=" bg-yellow-400 py-3 px-6 drop-shadow-md rounded-xl flex flex-col items-center justify-center"
			>
				<p class="font-semibold text-xl">
					{iv} %
				</p>
				<p class="text-lg text-center mb-1">Votre pokémon est parfait !</p>
				<img src={Appraisal_Rating_4} alt="Perfect IV" class="w-1/2" />
			</div>
		{/if}
		{#if iv >= 82 && iv < 98}
			<div
				class=" bg-green-400 py-3 px-6 drop-shadow-md rounded-xl flex flex-col items-center justify-center"
			>
				<p class="font-semibold text-xl">
					{iv} %
				</p>
				<p class="text-lg text-center mb-1">Votre pokémon est excellent !</p>
				<img src={Appraisal_Rating_3} alt="Excellent IV" class="w-1/2" />
			</div>
		{/if}
		{#if iv >= 67 && iv < 82}
			<div
				class=" bg-green-200 py-3 px-6 drop-shadow-md rounded-xl flex flex-col items-center justify-center"
			>
				<p class="font-semibold text-xl">
					{iv} %
				</p>
				<p class="text-lg text-center mb-1">Votre pokémon est bon !</p>
				<img src={Appraisal_Rating_2} alt="Good IV" class="w-1/2" />
			</div>
		{/if}
		{#if iv >= 51 && iv < 67}
			<div
				class=" bg-yellow-200 py-3 px-6 drop-shadow-md rounded-xl flex flex-col items-center justify-center"
			>
				<p class="font-semibold text-xl">
					{iv} %
				</p>
				<p class="text-lg text-center mb-1">Votre pokémon est correct !</p>
				<img src={Appraisal_Rating_1} alt="Correct IV" class="w-1/2" />
			</div>
		{/if}
		{#if iv >= 1 && iv < 51}
			<div
				class=" bg-red-200 py-3 px-6 drop-shadow-md rounded-xl flex flex-col items-center justify-center"
			>
				<p class="font-semibold text-xl">
					{iv} %
				</p>
				<p class="text-lg text-center mb-1">Votre pokémon est mauvais !</p>
				<img src={Appraisal_Rating_0} alt="Bad IV" class="w-1/2" />
			</div>
		{/if}
	</div>
</section>
<section class="w-2/3 mx-auto">
	<div
		class="text-2xl flex items-center gap-3 mb-6 mx-auto bg-blue-300 py-3 rounded-2xl text-left pl-8"
	>
		<img src={question_mark} alt="stats" class="w-[2%] inline-block" />
		Qu'est ce que les IV ?
	</div>
	<p class="mx-auto pb-6 text-justify">
		Dans Pokémon GO, les Individual Values, ou IV, sont similaires aux jeux principaux. Ils sont
		essentiels pour évaluer le potentiel de votre Pokémon. Contrairement aux jeux traditionnels, il
		existe seulement trois IV dans Pokémon GO, à savoir les Points de Vie (PV), l'Attaque et la
		Défense, chacun variant de 0 à 15 pour chaque statistique. Ces IV sont directement liés aux
		Points de Combat (PC) et reflètent toutes les caractéristiques de votre Pokémon. Par conséquent,
		un Pokémon peut présenter des IV de 0-0-0 ou 15-15-15. Lorsqu'un Pokémon a des IV parfaits
		(c'est-à-dire 15-15-15), cela signifie qu'il a atteint 100% de son potentiel en IV, avec un
		total de 45 pour ces trois statistiques combinées.
	</p>
	<p class="mx-auto text-justify">
		Tandis que les IVs jouent un rôle crucial pour rechercher un Pokémon compétitif, il est
		indéniable que les statistiques de base revêtent une importance plus objective. Chaque espèce de
		Pokémon possède des statistiques de base qui sont réparties dans les trois catégories
		mentionnées précédemment. Les statistiques de base demeurent constantes pour chaque espèce de
		Pokémon. Par exemple, prenons Pikachu, qui a une base de 112 en attaque, 96 en défense et 111 en
		endurance. Un Pikachu parfait aurait toutes ces statistiques augmentées de 15.
	</p>
</section>
<section class="w-2/3 mx-auto">
	<div id="base_stats" class="mt-23 text-center mb-24 mt-24">
		<div
			class="text-2xl flex items-center gap-3 mb-6 mx-auto bg-blue-300 py-3 rounded-2xl text-left pl-8"
		>
			<img src={stats} alt="stats" class="w-[2%] inline-block" />
			Statistiques de base
		</div>

		<p class="mx-auto pb-6 text-justify">
			Les statistiques de base dans Pokémon GO sont fondamentales pour comprendre la force
			intrinsèque de chaque espèce de Pokémon. Elles déterminent la manière dont un Pokémon évoluera
			et performera au combat. Ces statistiques sont réparties en trois catégories clés : l'Attaque,
			la Défense, et l'Endurance. L'Attaque est la statistique qui influence la puissance des
			attaques de votre Pokémon, la Défense réduit les dégâts subis lorsqu'il est attaqué, et
			l'Endurance détermine la quantité de points de vie (PV) du Pokémon. Ces valeurs de base sont
			spécifiques à chaque espèce de Pokémon et ne changent pas d'un individu à l'autre de la même
			espèce. Cela signifie que tous les Pikachu auront les mêmes statistiques de base, soit 112 en
			Attaque, 96 en Défense, et 111 en Endurance.
		</p>
		<p class="mx-auto pb-12 text-justify">
			Comprendre les statistiques de base est essentiel pour optimiser les performances de votre
			équipe Pokémon. Par exemple, si vous recherchez un Pokémon pour être votre attaquant
			principal, vous voudrez privilégier une espèce avec une statistique d'Attaque élevée. De même,
			si vous cherchez un défenseur robuste pour les arènes, les statistiques de Défense et
			d'Endurance seront cruciales. Les joueurs expérimentés en Pokémon GO cherchent à équilibrer
			ces statistiques de base avec les IV de leurs Pokémon pour créer une équipe de combat
			puissante et compétitive. En somme, les statistiques de base définissent la base de chaque
			Pokémon, tandis que les IV permettent de personnaliser davantage les capacités de chaque
			individu, ce qui en fait un aspect clé de la stratégie de jeu dans Pokémon GO.
		</p>

		<a class="mx-auto w-fit py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl" href="/pokemon-stats"
			>Voir les statistiques de base</a
		>
		<div />
	</div>
</section>