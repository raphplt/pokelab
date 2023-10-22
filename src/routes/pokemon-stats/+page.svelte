<script>
	import { onMount } from 'svelte';
	// @ts-ignore
	import {
		apiData,
		pokemonStats,
		pokemonMaxCp,
		pokeDataFR,
		pokemonMovesList,
		fastMovesList,
		chargedMovesList,
		fastMoves,
		typesList
	} from '../iv-calculator/store';
	import logo_sword from '$lib/images/logo_sword.png';
	import logo_pv from '$lib/images/logo_pv.png';
	import logo_stamina from '$lib/images/logo_stamina.png';
	import stats from '$lib/images/stats.png';
	import { writable } from 'svelte/store';

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

	// function setRandomPokemon() {
	// 	randomPokemon.set(Math.floor(Math.random() * $pokemonStats.length) + 1);
	// }

	// Création d'un store pour le Pokémon sélectionné
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

<section class="w-full sm:w-3/4 mx-auto">
	<div id="base_stats" class="mb-24 mt-24">
		<div
			class="text-xl sm:text-2xl flex items-center gap-3 mb-6 w-11/12 mx-auto bg-blue-300 py-3 rounded-2xl text-left pl-8"
		>
			<img src={stats} alt="stats" class="w-[7%] sm:w-[2%] inline-block" />
			Statistiques de base
		</div>
		<h3 class="text-left mx-auto w-10/12 sm:w-2/3">
			Veuillez sélectionner un Pokémon parmi les {$pokemonStats.length} disponibles :
		</h3>

		<select
			id="underline_select"
			bind:value={$choosenPokemon}
			on:change={handleChange}
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 sm:w-2/3 mx-auto mt-4 p-2.5"
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
					class="flex gap-5 w-11/12 sm:w-3/4 mx-auto flex-col justify-center bg-slate-100 sm:py-8 sm:px-20 rounded-lg drop-shadow-md"
				>
					<div class="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-3 sm:gap-10">
						<div
							class=" px-5 py-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border-gray-500"
						>
							<h2 class="text-lg font-semibold text-center">Informations principales</h2>
							<div>
								<div />
								{#each $pokeDataFR as pokemon}
									{#if pokemon.id == $choosenPokemon.pokemonId}
										<div class="flex flex-col gap-2">
											<span
												class="border-[1px] py-1 my-1 flex justify-between rounded-lg border-black px-2 bg-white drop-shadow-sm"
											>
												<p>Nom</p>
												<h2 class="">{pokemon.frenchName}</h2>
											</span>
											<span
												class="border-[1px] py-1 my-1 flex justify-between rounded-lg border-black px-2 bg-white"
											>
												<p>CP Max</p>
												{#each $pokemonMaxCp as cp}
													{#if cp.pokemonId == $choosenPokemon.pokemonId}
														<div class="">
															{cp.maxCp}
														</div>
													{/if}
												{/each}
											</span>
											<span
												class="border-[1px] py-1 my-1 flex justify-between rounded-lg border-black px-2 bg-white"
											>
												<p>Catégorie</p>
												<span class="">{pokemon.category}</span>
											</span>
											<span
												class="border-[1px] py-1 my-1 flex justify-between rounded-lg border-black px-2 bg-white"
											>
												<p>Génération</p>

												<span>Génération {pokemon.generation}</span>
											</span>
										</div>
										<span class="">
											<h3 class="font-semibold text-center mt-2">Types</h3>
											<div class="flex gap-3 items-center justify-start">
												{#each pokemon.types as type}
													<span
														class="border-[1px] py-1 my-1 flex justify-between items-center rounded-lg border-black px-2 bg-white"
													>
														<p class="">
															{type.name}
														</p>
														<img src={type.image} alt="Type" class="w-1/3 h-1/3" />
													</span>
												{/each}
											</div>
										</span>
									{/if}
								{/each}
							</div>
						</div>
						<div
							class=" px-5 py-3 bg-gradient-to-r from-red-100 to-red-200 rounded-lg border-gray-500"
						>
							<h2 class="text-lg font-semibold text-center">Attaques</h2>
							{#each $pokemonMovesList as move}
								{#if move.pokemon_id == $choosenPokemon.pokemonId}
									<div class="grid items-start">
										<h3 class="font-semibold mb-1 mt-2">Attaques rapides :</h3>
										<span class=" py-1 my-1 flex justify-between rounded-lg border-black px-2">
											<p>Type</p>
											<p>Nom</p>
											<p>Puissance</p>
										</span>
										{#each move.fast_moves as fastMove}
											{#each $fastMovesList as fast}
												{#if fast.name == fastMove}
													<span
														class="border-[1px] py-1 my-1 flex justify-between rounded-lg border-black px-2 bg-white"
													>
														{#each $typesList as type}
															{#if type.name.en == fast.type}
																<img src={type.sprites} alt="Type" class="w-5 h-5 inline-block" />
															{/if}
														{/each}
														<p>
															{fast.name}
														</p>
														<p>
															{fast.power}
														</p>
													</span>
												{/if}
											{/each}
										{/each}
									</div>
									<div class="grid items-start">
										<h3 class="font-semibold mb-1 mt-2">Attaques chargées :</h3>
										<span class=" py-1 my-1 flex justify-between rounded-lg border-black px-2">
											<p>Type</p>
											<p>Nom</p>
											<p>Puissance</p>
										</span>
										{#each move.charged_moves as chargedMove}
											{#each $chargedMovesList as charged}
												{#if charged.name == chargedMove}
													<span
														class="border-[1px] py-1 my-1 flex justify-between rounded-lg border-black px-2 bg-white"
													>
														{#each $typesList as type}
															{#if type.name.en == charged.type}
																<img src={type.sprites} alt="Type" class="w-5 h-5 inline-block" />
															{/if}
														{/each}
														<p>
															{charged.name}
														</p>
														<p>
															{charged.power}
														</p>
													</span>
												{/if}
											{/each}
										{/each}
									</div>
								{/if}
							{/each}
						</div>
						<div class="w-fit">
							{#each $pokeDataFR as pokemon}
								{#if pokemon.id == $choosenPokemon.pokemonId}
									<div
										class="flex flex-col justify-center w-fit items-start gap-3 px-5 py-3 bg-gradient-to-r from-green-100 to-green-200 border-gray-500 rounded-lg"
									>
										<div class=" flex-col flex justify-center items-center">
											<h2 class="text-lg font-semibold text-center">Sprites</h2>
											<span>Forme normale : </span>
											<img src={pokemon.regularSprite} alt="regular sprite" class="w-2/5 h-2/5" />
										</div>
										<div class="flex-col flex justify-center items-center">
											<span>Forme shiny : </span>
											<img src={pokemon.shinySprite} alt="shiny sprite" class="w-2/5 h-2/5" />
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
					<div class="flex items-center flex-row sm:flex-col justify-between">
						<div class="">
							{#each $pokeDataFR as pokemon}
								{#if pokemon.id == $choosenPokemon.pokemonId}
									<span class="">
										<div
											class="bg-gradient-to-r from-blue-100 to-blue-200 border-gray-500 mt-3 rounded-lg"
										>
											{#if pokemon.evolution !== null}
												{#if pokemon.evolution.pre !== null}
													<h4 class="font-semibold text-center">Pré-évolutions</h4>
													{#each pokemon.evolution.pre as pre}
														<div class="flex items-center justify-center flex-col">
															{#each $pokeDataFR as pokemon}
																{#if pokemon.id == pre.pokedexId}
																	<img
																		src={pokemon.regularSprite}
																		alt="regular sprite"
																		class="w-1/4 h-1/4"
																	/>
																{/if}
															{/each}

															{pre.name}
															<p>
																Conditions : {pre.condition}
															</p>
														</div>
													{/each}
												{/if}

												{#if pokemon.evolution.next !== null}
													<h4 class="font-semibold text-center">Évolutions</h4>
													{#each pokemon.evolution.next as next}
														<div class="flex items-center justify-center flex-col">
															{#each $pokeDataFR as pokemon}
																{#if pokemon.id == next.pokedexId}
																	<img
																		src={pokemon.regularSprite}
																		alt="regular sprite"
																		class="w-1/4 h-1/4"
																	/>
																{/if}
															{/each}

															{next.name}
															<p>
																Conditions : {next.condition}
															</p>
														</div>
													{/each}
												{/if}
											{/if}
										</div>
									</span>
								{/if}
							{/each}
						</div>
						<div
							class="bg-gradient-to-r from-purple-100 to-purple-200 border-gray-500 rounded-lg py-3 sm:px-10 w-fit mx-auto text-center"
						>
							<h2 class="text-lg font-semibold text-center">Statistiques de base</h2>
							<div class="mx-auto w-fit">
								<h3 class="mb-2">Attaque :</h3>
								<div class="flex gap-5 justify-center items-center">
									<img src={logo_sword} alt="attack" class="w-[5%]" />
									<div class="w-48 h-2 bg-white rounded-lg">
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
									<div class="w-48 h-2 bg-white rounded-lg">
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
									<div class="w-48 h-2 bg-white rounded-lg">
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
				</div>
			{/if}
		{/each}
		<!-- <button on:click={() => setRandomPokemon()} class="w-1/12 mx-auto mt-8">
			<img src={dice} alt="random" />
		</button> -->

		<div />
	</div>
</section>
