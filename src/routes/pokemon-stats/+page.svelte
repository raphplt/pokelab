<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import Icon from '@iconify/svelte';
	import Candy from '$lib/images/Candy.png';
	import {
		apiData,
		pokemonStats,
		pokemonMaxCp,
		pokeDataFR,
		pokemonMovesList,
		fastMovesList,
		chargedMovesList,
		typesList,
		candyToEvolveList,
		encounterDataList
	} from '../iv-calculator/store';

	async function loadData() {
		const unsubscribe = apiData.subscribe(($apiData) => {
			if (Object.keys($apiData).length === 0) {
				return;
			}
		});

		onMount(() => unsubscribe);
	}

	loadData();

	const bestAttack = 450;
	const bestStamina = 450;
	const bestDefense = 450;

	let choosenPokemon = writable({
		pokemonId: Math.floor(Math.random() * 900) + 1,
		pokemonName: 'Choisir un Pokémon'
	});

	let searchQuery = writable('');
	let selectedTypes = writable([]);

	function handleChange(event) {
		choosenPokemon.set(JSON.parse(event.target.value));
	}

	function handleSearch(event) {
		searchQuery.set(event.target.value);
	}

	function selectPokemon(pokemon) {
		choosenPokemon.set({
			pokemonId: pokemon.id,
			pokemonName: pokemon.frenchName
		});
		searchQuery.set(''); // Réinitialise la barre de recherche
	}
</script>

<svelte:head>
	<title>Pokelab | Pokémon Stats</title>
	<meta name="description" content="Obtenir des informations sur vos Pokémon favoris" />
</svelte:head>

<section class="w-full mx-auto p-6">
	<div id="base_stats" class="mb-20 mt-6">
		<div class="flex flex-row items-center gap-x-4 justify-center w-11/12 mx-auto">
			 <div class="w-10/12 mx-auto flex flex-row items-center justify-start gap-x-2 py-2 relative">
    <input
        type="text"
        placeholder="Rechercher un Pokémon"
        on:input={handleSearch}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mx-auto p-2.5 shadow-md"
    />

    <!-- Liste des suggestions -->
    {#if $searchQuery.length > 0}
        <ul
            class="bg-white border border-gray-300 rounded-lg w-full max-h-40 overflow-auto absolute top-full left-0 mt-1 z-10 shadow-lg"
        >
            {#each $pokeDataFR.filter((pokemon) => pokemon.frenchName
                    .toLowerCase()
                    .includes($searchQuery.toLowerCase())) as pokemon}
                <li
                    class="p-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                    on:click={() => selectPokemon(pokemon)}
                    on:keypress={() => selectPokemon(pokemon)}
                >
                    <img src={pokemon.regularSprite} alt={pokemon.frenchName} class="w-8 h-8" />
                    {pokemon.frenchName}
                </li>
            {/each}
        </ul>
    {/if}
</div>


			<select
				id="underline_select"
				title="Choisir un Pokémon"
				bind:value={$choosenPokemon}
				on:change={handleChange}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 mx-auto p-2.5 shadow-md"
			>
				<option disabled selected value>Choisir un Pokémon</option>
				{#each $pokeDataFR.filter((pokemon) => pokemon.frenchName
							.toLowerCase()
							.includes($searchQuery.toLowerCase()) && ($selectedTypes.length === 0 || pokemon.types.some( (type) => $selectedTypes.includes(type.name.en) ))) as pokemon}
					<option
						class="pl-2 text-slate-500 left-8"
						value={{ pokemonId: pokemon.id, pokemonName: pokemon.frenchName }}
					>
						<img src={pokemon.regularSprite} alt={pokemon.frenchName} class="w-8 h-8" />
						{pokemon.frenchName}
					</option>
				{/each}
			</select>
		</div>

		<div class="mt-5" />
		{#each $pokemonStats as pokemon}
			{#if pokemon.id === $choosenPokemon.pokemonId}
				<div
					class="flex gap-5 w-11/12 mx-auto flex-col justify-center bg-slate-100 sm:py-8 sm:px-10 rounded-lg drop-shadow-md transition-transform transform"
				>
					<h2 class="text-2xl font-semibold text-center">
						{#each $pokeDataFR as poke}
							{#if poke.id == $choosenPokemon.pokemonId}
								{poke.frenchName}
							{/if}
						{/each}
					</h2>
					<div class="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-3 sm:gap-10">
						<div class="px-5 py-3 bg-white rounded-lg shadow-md">
							<h2 class="font-semibold text-center mb-4">Informations principales</h2>
							<div class="text-sm">
								{#each $pokeDataFR as pokemon}
									{#if pokemon.id == $choosenPokemon.pokemonId}
										<div class="flex flex-col gap-2">
											<span class="py-1 flex justify-between border-b">
												<p>Nom</p>
												<h2>{pokemon.frenchName}</h2>
											</span>
											<span class="py-1 flex justify-between border-b">
												<p>CP Max</p>
												{#each $pokemonMaxCp as cp}
													{#if cp.pokemonId == $choosenPokemon.pokemonId}
														<div>{cp.maxCp}</div>
													{/if}
												{/each}
											</span>
											<span class="py-1 flex justify-between border-b">
												<p>Catégorie</p>
												<span>{pokemon.category}</span>
											</span>
											<span class="py-1 flex justify-between border-b">
												<p>Génération</p>
												<span>Génération {pokemon.generation}</span>
											</span>

											{#each $candyToEvolveList as candy}
												{#if candy.pokemon_id == $choosenPokemon.pokemonId}
													<span class="py-1 flex justify-between items-center border-b">
														<p>Bonbons pour évoluer</p>
														<div class="flex items-center gap-1">
															<div>{candy.candy_required}</div>
															<img src={Candy} alt="Candy" width="32" />
														</div>
													</span>
												{/if}
											{/each}
										</div>

										<span>
											<h3 class="font-semibold text-center mt-2 my-3">Types</h3>
											<div class="flex gap-3 items-center justify-start">
												{#each pokemon.types as type}
													<span
														class="border-[1px] py-1 my-1 flex justify-between items-center gap-2 rounded-lg px-2"
													>
														<p>{type.name}</p>
														<img src={type.image} alt="Type" width="24" class="rounded-md" />
													</span>
												{/each}
											</div>
										</span>
									{/if}
								{/each}
							</div>
						</div>

						<div class="px-5 py-3 bg-white rounded-lg shadow-md">
							<h2 class="text-lg font-semibold text-center">Attaques</h2>
							{#each $pokemonMovesList as move}
								{#if move.pokemon_id == $choosenPokemon.pokemonId}
									<div class="grid items-start text-sm">
										<h3 class="font-semibold mb-1 mt-2">Attaques rapides :</h3>
										<table class="table-auto border-collapse border border-black w-full">
											<thead>
												<tr class="bg-gray-200">
													<th class="border border-black px-2 py-1">Type</th>
													<th class="border border-black px-2 py-1">Nom</th>
													<th class="border border-black px-2 py-1">Puissance</th>
												</tr>
											</thead>
											<tbody>
												{#each move.fast_moves as fastMove}
													{#each $fastMovesList as fast}
														{#if fast.name == fastMove}
															<tr class="bg-white">
																<td class="border border-black px-2 py-1">
																	{#each $typesList as type}
																		{#if type.name.en == fast.type}
																			<img
																				src={type.sprites}
																				alt="Type"
																				class="w-5 h-5 inline-block rounded-md"
																			/>
																		{/if}
																	{/each}
																</td>
																<td class="border border-black px-2 py-1">{fast.name}</td>
																<td class="border border-black px-2 py-1">{fast.power}</td>
															</tr>
														{/if}
													{/each}
												{/each}
											</tbody>
										</table>
									</div>
									<div class="grid items-start text-sm">
										<h3 class="font-semibold mb-1 mt-2">Attaques chargées :</h3>
										<table class="table-auto border-collapse border border-black w-full">
											<thead>
												<tr class="bg-gray-200">
													<th class="border border-black px-2 py-1">Type</th>
													<th class="border border-black px-2 py-1">Nom</th>
													<th class="border border-black px-2 py-1">Puissance</th>
												</tr>
											</thead>
											<tbody>
												{#each move.charged_moves as chargedMove}
													{#each $chargedMovesList as charged}
														{#if charged.name == chargedMove}
															<tr class="bg-white">
																<td class="border border-black px-2 py-1">
																	{#each $typesList as type}
																		{#if type.name.en == charged.type}
																			<img
																				src={type.sprites}
																				alt="Type"
																				class="w-5 h-5 inline-block rounded-md"
																			/>
																		{/if}
																	{/each}
																</td>
																<td class="border border-black px-2 py-1">{charged.name}</td>
																<td class="border border-black px-2 py-1">{charged.power}</td>
															</tr>
														{/if}
													{/each}
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							{/each}
						</div>
						<div class="">
							{#each $pokeDataFR as pokemon}
								{#if pokemon.id == $choosenPokemon.pokemonId}
									<div class="px-5 py-3 bg-white rounded-lg shadow-md">
										<div class="flex-col flex justify-center items-center">
											<h2 class="text-lg font-semibold text-center">Sprites</h2>
											<span class="text-sm">Forme normale : </span>
											<div class="h-40 w-40">
												<img src={pokemon.regularSprite} alt="regular sprite" class="w-40 h-40" />
											</div>
										</div>
										<div class="flex-col flex justify-center items-center">
											<span class="textsm">Forme shiny : </span>
											<div class="h-40 w-40">
												<img src={pokemon.shinySprite} alt="shiny sprite" class="w-40 h-40" />
											</div>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
					<div class="grid grid-rows-3 sm:grid-rows-none sm:grid-cols-3 sm:gap-10">
						{#each $pokeDataFR as pokemon}
							{#if pokemon.id == $choosenPokemon.pokemonId}
								<div class="px-5 py-3 bg-white rounded-lg shadow-md">
									{#if pokemon.evolution !== null}
										{#if pokemon.evolution.pre !== null}
											<h4 class="font-semibold text-center mb-4">Pré-évolutions</h4>
											<div class="flex flex-wrap justify-center gap-4">
												{#each pokemon.evolution.pre as pre}
													<div class="flex flex-col items-center">
														{#each $pokeDataFR as poke}
															{#if poke.id == pre.pokedexId}
																<img
																	src={poke.regularSprite}
																	alt="regular sprite"
																	class="w-20 h-20"
																/>
															{/if}
														{/each}
														<span class="text-sm mt-2">{pre.name}</span>
														<p class="text-xs text-gray-500">Conditions : {pre.condition}</p>
													</div>
												{/each}
											</div>
										{/if}
										{#if pokemon.evolution.next !== null}
											<h4 class="font-semibold text-center mt-6 mb-4">Évolutions</h4>
											<div class="flex flex-wrap justify-center gap-4">
												{#each pokemon.evolution.next as next}
													<div class="flex flex-col items-center">
														{#each $pokeDataFR as poke}
															{#if poke.id == next.pokedexId}
																<img
																	src={poke.regularSprite}
																	alt="regular sprite"
																	class="w-20 h-20"
																/>
															{/if}
														{/each}
														<span class="text-sm mt-2">{next.name}</span>
														<p class="text-xs text-gray-500">Conditions : {next.condition}</p>
													</div>
												{/each}
											</div>
										{/if}
									{/if}
								</div>
							{/if}
						{/each}
						<div class="px-5 py-3 bg-white rounded-lg shadow-md">
							<h2 class="text-lg font-semibold text-center">Données de rencontre</h2>
							{#each $encounterDataList as encounter}
								{#if encounter.pokemon_id == $choosenPokemon.pokemonId}
									<div class="text-sm">
										<div class="flex flex-col gap-2">
											<span class="py-1 flex justify-between border-b">
												<p>Probabilité d'attaque</p>
												<h2>{encounter.attack_probability}</h2>
											</span>
											<span class="py-1 flex justify-between border-b">
												<p>Probabilité de fuite</p>
												<h2>{encounter.base_flee_rate}</h2>
											</span>
											<span class="py-1 flex justify-between border-b">
												<p>Probabilité d'esquive</p>
												<h2>{encounter.dodge_probability}</h2>
											</span>
											<span class="py-1 flex justify-between border-b">
												<p>Fréquence d'action max</p>
												<h2>{encounter.max_pokemon_action_frequency}</h2>
											</span>
											<span class="py-1 flex justify-between border-b">
												<p>Fréquence d'action min</p>
												<h2>{encounter.min_pokemon_action_frequency}</h2>
											</span>
										</div>
									</div>
								{/if}
							{/each}
						</div>
						<div class="px-5 py-3 bg-white rounded-lg shadow-md">
							<h2 class="text-lg font-semibold text-center">Statistiques de base</h2>
							<div class="mx-auto w-fit py-2">
								<h3 class="mb-1 text-sm text-gray-800">Attaque</h3>
								<div class="flex gap-5 justify-center items-center">
									<Icon icon="mdi:sword" width={24} />
									<div class="w-48 h-2 bg-gray-200 rounded-lg">
										<div
											class="h-2 w-fit bg-red-500 rounded-lg"
											style={`width: ${(pokemon.baseAttack / bestAttack) * 200}px`}
										/>
									</div>
									{pokemon.baseAttack}
								</div>
							</div>
							<div class="mx-auto w-fit py-2">
								<h3 class="mb-1 text-sm text-gray-800">PV</h3>
								<div class="flex gap-5 justify-center items-center">
									<Icon icon="mdi:heart" width={24} />
									<div class="w-48 h-2 bg-gray-200 rounded-lg">
										<div
											class="h-2 w-fit bg-green-500 rounded-lg"
											style={`width: ${(pokemon.baseDefense / bestDefense) * 200}px`}
										/>
									</div>
									{pokemon.baseDefense}
								</div>
							</div>
							<div class="mx-auto w-fit py-2">
								<h3 class="mb-1 text-sm text-gray-800">Stamina</h3>
								<div class="flex gap-5 justify-center items-center">
									<Icon icon="mdi:shield" width={24} />
									<div class="w-48 h-2 bg-gray-200 rounded-lg">
										<div
											class="h-2 w-fit bg-blue-500 rounded-lg"
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
		<div />
	</div>
</section>
