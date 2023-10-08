import { writable, derived } from 'svelte/store';

export const apiData = writable({});
export const cpMax: any = writable({});
export const pokemonListFr = writable({});
export const fastMoves = writable([]);
export const pokemonMoves = writable([]);

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
}

async function fetchCpMax() {
	try {
		const cachedData = localStorage.getItem('cp_max');
		if (cachedData) {
			cpMax.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://pogoapi.net/api/v1/pokemon_max_cp.json');

			const data = await response.json();

			cpMax.set(data);

			localStorage.setItem('cp_max', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching CP Max data:', error);
	}
}

async function fetchPokemonListFr() {
	try {
		const cachedData = localStorage.getItem('pokemon_list_fr');
		if (cachedData) {
			pokemonListFr.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon');

			const data = await response.json();

			pokemonListFr.set(data);

			localStorage.setItem('pokemon_list_fr', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching Pokemon list fr:', error);
	}
}

async function fetchFastMoves() {
	try {
		const cachedData = localStorage.getItem('fast_moves');
		if (cachedData) {
			fastMoves.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://pogoapi.net/api/v1/fast_moves.json');

			const data = await response.json();

			fastMoves.set(data);

			localStorage.setItem('fast_moves', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching Fast Moves:', error);
	}
}

async function fetchPokemonMoves() {
	try {
		const cachedData = localStorage.getItem('pokemon_moves');
		if (cachedData) {
			pokemonMoves.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://pogoapi.net/api/v1/current_pokemon_moves.json');

			const data = await response.json();

			pokemonMoves.set(data);

			localStorage.setItem('pokemon_moves', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching Pokemon Moves:', error);
	}
}

fetchPokemonData();
fetchCpMax();
fetchPokemonListFr();
fetchFastMoves();
fetchPokemonMoves();

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
				id: pokemon.pokemon_id,
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

export const pokemonMaxCp: any = derived(cpMax, ($cpMax) => {
	const pokemonArray = Object.values($cpMax as any);
	const uniquePokemonMap = pokemonArray.reduce((map: any, pokemon: any) => {
		map[pokemon.pokemon_name] = {
			pokemonName: pokemon.pokemon_name,
			pokemonId: pokemon.pokemon_id,
			maxCp: pokemon.max_cp
		};
		return map;
	}, {});

	return Object.values(uniquePokemonMap as any);
});

export const pokeDataFR: any = derived(pokemonListFr, ($pokemonListFr) => {
	const pokemonArray = Object.values($pokemonListFr as any);
	const filteredPokemonArray = pokemonArray.map((pokemon: any) => {
		const { pokedexId: id, generation, category, name, sprites, types, stats, evolution } = pokemon;

		const frenchName = name.fr || '';
		const regularSprite = sprites.regular || '';
		const shinySprite = sprites.shiny || '';

		return {
			id,
			generation,
			category,
			frenchName,
			regularSprite,
			shinySprite,
			types,
			stats,
			evolution
		};
	});

	return filteredPokemonArray;
});

export const fastMovesList: any = derived(fastMoves, ($fastMoves) => {
	const fastMovesArray = Object.values($fastMoves as any);
	const uniqueFastMovesMap = fastMovesArray.reduce((map: any, fastMove: any) => {
		map[fastMove.name] = {
			stamina_loss_scaler: fastMove.stamina_loss_scaler,
			name: fastMove.name,
			power: fastMove.power,
			duration: fastMove.duration,
			energy_delta: fastMove.energy_delta,
			type: fastMove.type
		};
		return map;
	}, {});

	return Object.values(uniqueFastMovesMap as any);
});

export const pokemonMovesList: any = derived(pokemonMoves, ($pokemonMoves) => {
	const pokemonMovesArray = Object.values($pokemonMoves as any);
	const uniquePokemonMovesMap = pokemonMovesArray.reduce((map: any, pokemonMove: any) => {
		map[pokemonMove.pokemon_name] = {
			charged_moves: pokemonMove.charged_moves,
			elite_charged_moves: pokemonMove.elite_charged_moves,
			fast_moves: pokemonMove.fast_moves,
			elite_fast_moves: pokemonMove.elite_fast_moves,
			pokemon_id: pokemonMove.pokemon_id
		};
		return map;
	}, {});

	return Object.values(uniquePokemonMovesMap as any);
});
