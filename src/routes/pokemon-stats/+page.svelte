<script>
	import { onMount } from 'svelte';
	// @ts-ignore
	import {
		apiData,
		pokemonStats,
		pokemonMaxCp,
		pokeDataFR,
		pokemonMovesList
	} from '../iv-calculator/store';
	import logo_sword from '$lib/images/logo_sword.png';
	import logo_pv from '$lib/images/logo_pv.png';
	import logo_stamina from '$lib/images/logo_stamina.png';
	import stats from '$lib/images/stats.png';
	import { writable } from 'svelte/store';
	import dice from '$lib/images/dice.png';

	async function loadData() {
		const unsubscribe = apiData.subscribe(($apiData) => {
			if (Object.keys($apiData).length === 0) {
				return;
			}
		});

		onMount(() => unsubscribe);
	}

	loadData();

	// Bests base stats
	const bestAttack = 450;
	const bestStamina = 450;
	const bestDefense = 450;

	// Random Pokemon
	let randomPokemon = writable(Math.floor(Math.random() * $pokemonStats.length) + 1);

	function setRandomPokemon() {
		randomPokemon.set(Math.floor(Math.random() * $pokemonStats.length) + 1);
	}

	// Créez un store pour le Pokémon sélectionné
	let choosenPokemon = writable({
		pokemonId: Math.floor(Math.random() * 900) + 1,
		pokemonName: 'Choisir un Pokémon'
	});

	// Fonction de gestion de l'événement change
	// @ts-ignore
	function handleChange(event) {
		choosenPokemon.set(JSON.parse(event.target.value));
	}
</script>

<svelte:head>
	<title>Pokelab | Pokémon Stats</title>
	<meta name="description" content="Obtenir des informations sur vos Pokémon favoris" />
</svelte:head>

<section class="h-[100vh] w-3/4 mx-auto">
	<div id="base_stats" class="mt-23 text-center mb-24 mt-24">
		<div
			class="text-2xl flex items-center gap-3 mb-6 w-10/12 mx-auto bg-blue-300 py-3 rounded-2xl text-left pl-8"
		>
			<img src={stats} alt="stats" class="w-[2%] inline-block" />
			Statistiques de base
		</div>
		<h3 class="text-left mx-auto w-2/3">
			Veuillez sélectionner un Pokémon parmi les {$pokemonStats.length} disponibles :
		</h3>

		<select
			id="underline_select"
			bind:value={$choosenPokemon}
			on:change={handleChange}
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 mx-auto mt-4 p-2.5"
		>
			<option selected disabled>Choisir un Pokémon</option>

			{#each $pokeDataFR as pokemon}
				<option
					class="pl-2 text-slate-500 left-8"
					value={{ pokemonId: pokemon.id, pokemonName: pokemon.frenchName }}
				>
					{pokemon.id} -
					{pokemon.frenchName}
				</option>
			{/each}
		</select>

		<div class="mt-12" />
		<!-- {#if $choosenPokemon.pokemonName !== 'Choisir un Pokémon'} -->
		{#each $pokemonStats as pokemon}
			{#if pokemon.id === $choosenPokemon.pokemonId}
				<div
					class="flex gap-5 w-3/4 mx-auto flex-col justify-center bg-slate-100 py-8 px-20 rounded-lg drop-shadow-md"
				>
					<div class="grid grid-cols-3 gap-10">
						<div class="grid px-5 py-3 bg-white rounded-lg">
							<h2 class="text-lg font-semibold">{$choosenPokemon.pokemonName}</h2>
							{#each $pokemonMaxCp as cp}
								{#if cp.pokemonId == $choosenPokemon.pokemonId}
									<div class="">
										CP Max : {cp.maxCp}
									</div>
								{/if}
							{/each}

							{#each $pokeDataFR as pokemon}
								{#if pokemon.id == $choosenPokemon.pokemonId}
									<span class="text-orange-500">{pokemon.category}</span>
									<span>Génération {pokemon.generation}</span>
									<span class="">
										<h3>Types :</h3>
										<div class="flex gap-3 items-center justify-center">
											{#each pokemon.types as type}
												<div class="">
													<p class="mb-1">
														{type.name}
													</p>
													<img src={type.image} alt="Type" />
												</div>
											{/each}
										</div>
									</span>
								{/if}
							{/each}
						</div>
						<div class=" px-5 py-3 bg-white rounded-lg">
							{#each $pokemonMovesList as move}
								{#if move.pokemon_id == $choosenPokemon.pokemonId}
									<div class="grid items-start">
										<h3 class="font-semibold mb-2">Attaques rapides :</h3>
										{#each move.fast_moves as fastMove}
											<span class="border-[1px] py-1 my-1 rounded-lg border-black w-full">
												{fastMove}
											</span>
										{/each}
									</div>
									<div class="grid items-start">
										<h3 class="font-semibold mb-2">Attaques chargées :</h3>
										{#each move.charged_moves as chargedMove}
											<span class="border-[1px] py-1 my-1 rounded-lg border-black w-full">
												{chargedMove}
											</span>
										{/each}
									</div>
								{/if}
							{/each}
						</div>
						<div class="w-fit">
							{#each $pokeDataFR as pokemon}
								{#if pokemon.id == $choosenPokemon.pokemonId}
									<div
										class="flex flex-col justify-center w-fit items-start gap-3 px-5 py-3 bg-white rounded-lg"
									>
										<div class=" flex-col flex justify-center items-center">
											<span>Forme normale : </span>
											<img src={pokemon.regularSprite} alt="regular sprite" class="w-1/3 h-1/3" />
										</div>
										<div class="flex-col flex justify-center items-center">
											<span>Forme shiny : </span>
											<img src={pokemon.shinySprite} alt="shiny sprite" class="w-1/3 h-1/3" />
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
					<div class="bg-white rounded-lg py-3 px-10 w-fit mx-auto">
						<div class="mx-auto w-fit">
							<h3 class="mb-2">Attaque :</h3>
							<div class="flex gap-5 justify-center items-center">
								<img src={logo_sword} alt="attack" class="w-[5%]" />
								<div class="w-48 h-2 bg-slate-200 rounded-lg">
									<div
										class={`h-2 w-fit bg-red-500 rounded-lg`}
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
										class={`h-2 w-fit bg-green-500 rounded-lg`}
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
										class={`h-2 w-fit bg-blue-500 rounded-lg`}
										style={`width: ${(pokemon.baseStamina / bestStamina) * 200}px`}
									/>
								</div>
								{pokemon.baseStamina}
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
		<button on:click={() => setRandomPokemon()} class="w-1/12 mx-auto mt-8">
			<img src={dice} alt="random" />
		</button>

		<div />
	</div>
</section>
