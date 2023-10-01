import { writable, derived } from 'svelte/store';

// Store for your data. This assumes the data you're pulling back is an object.
export const apiData = writable({});

// Fonction pour mettre à jour le store apiData et le localStorage
async function fetchPokemonData() {
	try {
		// Vérifiez d'abord si les données sont déjà enregistrées dans le localStorage
		const cachedData = localStorage.getItem('pokemon_data');

		if (cachedData) {
			// Si les données sont en cache, utilisez-les pour mettre à jour le store
			apiData.set(JSON.parse(cachedData));
		} else {
			// Si les données ne sont pas en cache, effectuez la requête API
			const response = await fetch('https://pogoapi.net/api/v1/pokemon_stats.json');
			const data = await response.json();

			// Enregistrez les données dans le store
			apiData.set(data);

			// Enregistrez également les données dans le localStorage pour la prochaine fois
			localStorage.setItem('pokemon_data', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching Pokemon data:', error);
	}
}

// Appelez la fonction pour récupérer les données
fetchPokemonData();

// Data transformation. Extract Pokémon names from the object.
export const pokemonNames = derived(apiData, ($apiData) => {
	const pokemonArray = Object.values($apiData);
	return pokemonArray.map((pokemon: any) => {
		return { pokemonName: pokemon.pokemon_name, pokemonId: pokemon.pokemon_id };
	});
});

// Data transformation. Extract Pokémon base stats from the object.
export const pokemonStats = derived(apiData, ($apiData) => {
	const pokemonArray = Object.values($apiData);
	console.log(pokemonArray);
	return pokemonArray.map((pokemon: any) => {
		const baseStamina = parseInt(pokemon.base_stamina);
		const baseDefense = parseInt(pokemon.base_defense);
		const baseAttack = parseInt(pokemon.base_attack);
		return {
			pokemonName: pokemon.pokemon_name,
			baseStamina,
			baseDefense,
			baseAttack,
			totalStats: baseStamina + baseDefense + baseAttack
		};
	});
});
