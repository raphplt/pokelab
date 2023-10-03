import { writable, derived } from 'svelte/store';

export const apiData = writable({});
export const cpMax = writable({});

async function fetchPokemonData() {
	try {
		const cachedData = localStorage.getItem('pokemon_data');

		if (cachedData) {
			apiData.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://pogoapi.net/api/v1/pokemon_stats.json');
			const data = await response.json();

			apiData.set(data);

			localStorage.setItem('pokemon_data', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching Pokemon data:', error);
	}
	try {
		const cpMax = localStorage.getItem('cp_max');
		if (cpMax) {
			(cpMax as any).set(JSON.parse(cpMax));
		} else {
			const response = await fetch('https://pogoapi.net/api/v1/pokemon_max_cp.json');
			const data = await response.json();

			(cpMax as any).set(data);

			localStorage.setItem('cp_max', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching CP Max data:', error);
	}
}

fetchPokemonData();

export const pokemonNames: any = derived(apiData, ($apiData) => {
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

export const pokemonStats: any = derived(apiData, ($apiData) => {
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
