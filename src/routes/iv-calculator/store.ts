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
	const uniquePokemonMap = pokemonArray.reduce((map: any, pokemon: any) => {
		map[pokemon.pokemon_name] = {
			pokemonName: pokemon.pokemon_name,
			pokemonId: pokemon.pokemon_id
		};
		return map;
	}, {});

	return Object.values(uniquePokemonMap as any);
});

// Data transformation. Extract Pokémon base stats from the object.
export const pokemonStats = derived(apiData, ($apiData) => {
	const pokemonArray = Object.values($apiData);
	const uniquePokemonMap = pokemonArray.reduce((map: any, pokemon: any) => {
		const baseStamina = parseInt(pokemon.base_stamina);
		const baseDefense = parseInt(pokemon.base_defense);
		const baseAttack = parseInt(pokemon.base_attack);

		if (!map[pokemon.pokemon_name]) {
			map[pokemon.pokemon_name] = {
				pokemonName: pokemon.pokemon_name,
				baseStamina: 0,
				baseDefense: 0,
				baseAttack: 0,
				totalStats: 0
			};
		}

		map[pokemon.pokemon_name].baseStamina += baseStamina;
		map[pokemon.pokemon_name].baseDefense += baseDefense;
		map[pokemon.pokemon_name].baseAttack += baseAttack;
		map[pokemon.pokemon_name].totalStats += baseStamina + baseDefense + baseAttack;

		return map;
	}, {});

	return Object.values(uniquePokemonMap as any);
});