<script>
	import IvBar from '../../components/+iv_bar.svelte';
	import arrow_down from '$lib/images/arrow_down.png';
	import { onMount } from 'svelte';
	import { apiData, pokemonNames, pokemonStats } from './store';
	import logo_sword from '$lib/images/logo_sword.png';
	import logo_pv from '$lib/images/logo_pv.png';
	import logo_stamina from '$lib/images/logo_stamina.png';
	import stats from '$lib/images/stats.png';


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


	// Bests base stats
	const bestAttack = 300;
	const bestStamina = 278;
	const bestDefense = 487;

	// Nom du Pokémon sélectionné
	let choosenPokemon = 'Choisir un Pokémon';
	// Eviter les doublons :
	let foundPokemon = false;

	function found() {
		foundPokemon = true;
	}

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
	<title>IV Calculator</title>
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
	<div class="mt-10 rounded-lg mx-auto w-fit h-96">
		{#if iv == 100}
			<div class="bg-yellow-400 py-3 px-6 drop-shadow-md rounded-xl border-yellow-600 border-2">
				<h2 class="text-2xl text-center mb-2">
					{iv}% IV
				</h2>
				<p class="text-lg text-center">Votre pokémon est parfait !</p>
			</div>
		{/if}
		{#if iv > 80 && iv < 100}
			<div class="bg-green-400 py-3 px-6 drop-shadow-md rounded-xl border-2">
				<h2 class="text-2xl text-center mb-2">
					{iv}% IV
				</h2>
				<p class="text-lg text-center">Votre pokémon est excellent !</p>
			</div>
		{/if}
		{#if iv > 60 && iv <= 80}
			<div class="bg-green-300 py-3 px-6 drop-shadow-md rounded-xl border-2">
				<h2 class="text-2xl text-center mb-2">
					{iv}% IV
				</h2>
				<p class="text-lg text-center">Votre pokémon est très bon !</p>
			</div>
		{/if}
		{#if iv > 40 && iv <= 60}
			<div class="bg-yellow-200 py-3 px-6 drop-shadow-md rounded-xl border-2">
				<h2 class="text-2xl text-center mb-2">
					{iv}% IV
				</h2>
				<p class="text-lg text-center">Votre pokémon est bon !</p>
			</div>
		{/if}
		{#if iv > 20 && iv <= 40}
			<div class="bg-orange-400 py-3 px-6 drop-shadow-md rounded-xl border-2">
				<h2 class="text-2xl text-center mb-2">
					{iv}% IV
				</h2>
				<p class="text-lg text-center">Votre pokémon est médiocre !</p>
			</div>
		{/if}
		{#if iv > 0 && iv <= 20}
			<div class="bg-red-400 py-3 px-6 drop-shadow-md rounded-xl border-2">
				<h2 class="text-2xl text-center mb-2">
					{iv}% IV
				</h2>
				<p class="text-lg text-center">Votre pokémon est mauvais !</p>
			</div>
		{/if}

		{#if iv > 0}
			<a
				href="#base_stats"
				class="flex items-center mt-32 mb-4 justify-center mx-auto flex-col gap-5"
			>
				<p class="text-center text-lg">Plus de statistiques</p>
				<img src={arrow_down} alt="arrow" class=" mx-auto w-[20%] animate-bounce" />
			</a>
		{/if}
	</div>
</section>
<section>
	<!-- {#if iv > 0} -->
	<div id="base_stats" class="mt-23 text-center mb-24 mt-24">
		<div
			class="text-2xl flex items-center gap-3 mb-6 w-10/12 mx-auto bg-blue-300 py-3 rounded-2xl text-left pl-8"
		>
			<img src={stats} alt="stats" class="w-[2%] inline-block" />
			Statistiques de base
		</div>
		<h3 class="text-left mx-auto w-2/3">Veuillez sélectionner un Pokémon</h3>
		<select
			id="underline_select"
			bind:value={choosenPokemon}
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 mx-auto mt-4 p-2.5"
		>
		      <option selected disabled>Choisir un Pokémon</option>

			<!-- <option selected disabled>Choisir un Pokémon</option> -->
			{#each $pokemonNames as pokemon}
				<option class="pl-2 text-slate-500 left-8">{pokemon.pokemonName}</option>
			{/each}
		</select>
		<div class="mt-12" />
		{#if choosenPokemon}
			{#each $pokemonStats as pokemon}
				{#if pokemon.pokemonName == choosenPokemon}
					<div
						class="flex gap-5 w-3/4 mx-auto flex-col justify-center bg-slate-100 py-8 px-20 rounded-lg drop-shadow-md"
					>
						<h2 class="text-lg font-semibold">{choosenPokemon}</h2>
						<div class="mx-auto w-fit">
							<h3 class="mb-2">Attaque :</h3>
							<div class="flex gap-5 justify-center items-center">
								<img src={logo_sword} alt="attack" class="w-[5%]" />
								<div class="w-48 h-2 bg-slate-200 rounded-lg">
									<div
										class={`h-2 w-fit bg-orange-500 rounded-lg`}
										style={`width: ${(pokemon.baseAttack / bestAttack) * 200}px`}
									/>
								</div>
								{pokemon.baseAttack}
							</div>
						</div>
						<div class="mx-auto w-fit">
							<h3 class="mb-2">PV :</h3>
							<div class="flex gap-5 justify-center items-center">
								<img src={logo_pv} alt="attack" class="w-[5%]" />
								<div class="w-48 h-2 bg-slate-200 rounded-lg">
									<div
										class={`h-2 w-fit bg-orange-500 rounded-lg`}
										style={`width: ${(pokemon.baseDefense / bestDefense) * 200}px`}
									/>
								</div>
								{pokemon.baseDefense}
							</div>
						</div>
						<div class="mx-auto w-fit">
							<h3 class="mb-2">Stamina :</h3>
							<div class="flex gap-5 justify-center items-center">
								<img src={logo_stamina} alt="attack" class="w-[5%]" />
								<div class="w-48 h-2 bg-slate-200 rounded-lg">
									<div
										class={`h-2 w-fit bg-orange-500 rounded-lg`}
										style={`width: ${(pokemon.baseStamina / bestStamina) * 200}px`}
									/>
								</div>
								{pokemon.baseStamina}
							</div>
						</div>
					</div>
					<!-- {#break} -->
				{/if}
			{/each}
		{/if}
		<!-- {/if} -->

		<div />
		<!-- {#if iv > 0} -->
	</div>
</section>
