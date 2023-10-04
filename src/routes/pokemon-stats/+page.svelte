<script>
	import { onMount } from 'svelte';
	import { apiData, pokemonNames, pokemonStats, pokemonMaxCp } from '../iv-calculator/store';

	import logo_sword from '$lib/images/logo_sword.png';
	import logo_pv from '$lib/images/logo_pv.png';
	import logo_stamina from '$lib/images/logo_stamina.png';
	import stats from '$lib/images/stats.png';
	import question_mark from '$lib/images/question_mark.png';

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
	const bestAttack = 300;
	const bestStamina = 278;
	const bestDefense = 487;

	// Nom du Pokémon sélectionné
	let choosenPokemon = 'Choisir un Pokémon';
</script>

<svelte:head>
	<title>Pokelab | Pokémon Stats</title>
	<meta name="description" content="Obtenir des informations sur vos Pokémon favoris" />
</svelte:head>

<section class="h-[100vh]">
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

			{#each $pokemonNames as pokemon}
				<option class="pl-2 text-slate-500 left-8">{pokemon.pokemonName}</option>
			{/each}
		</select>
		<div class="mt-12" />
		{#if choosenPokemon !== 'Choisir un Pokémon'}
			{#each $pokemonStats as pokemon}
				{#if pokemon.pokemonName === choosenPokemon}
					<div
						class="flex gap-5 w-3/4 mx-auto flex-col justify-center bg-slate-100 py-8 px-20 rounded-lg drop-shadow-md"
					>
						<div class="flex justify-center items-center gap-10">
							<h2 class="text-lg font-semibold">{choosenPokemon}</h2>
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
								alt="Pokémon logo"
								class="w-[10%]"
							/>
						</div>

						{#each $pokemonMaxCp as cp}
							{#if cp.pokemonName == choosenPokemon}
								<div
									class="flex gap-5 w-3/4 mx-auto flex-col justify-center bg-slate-100 py-8 px-20 rounded-lg drop-shadow-md"
								>
									cpMax : {cp.maxCp}
								</div>
							{/if}
						{/each}
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
				{/if}
			{/each}
		{/if}
		<!-- {/if} -->
		<div />
		<!-- {#if iv > 0} -->
	</div>
</section>
