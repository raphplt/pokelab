import { writable, derived } from 'svelte/store';

export const apiData = writable({});
export const cpMax: any = writable({});
export const pokemonListFr = writable({});
export const fastMoves = writable([]);
export const chargedMoves = writable([]);
export const pokemonMoves = writable([]);
export const types = writable([]);
export const candyToEvolve = writable({});
export const encounterData = writable([]);

async function fetchPokemonData() {
	try {
		const cachedData = localStorage.getItem('pokemon_data');

		if (cachedData) {
			apiData.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://pogoapi.net/api/v1/pokemon_stats.json');
			const data = await response.json();

			apiData.set(data);
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
		if (cachedData && cachedData !== 'undefined' && cachedData.length > 0) {
			pokemonListFr.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://tyradex.app/api/v1/pokemon');
			const data = await response.json();

			pokemonListFr.set(data);
			localStorage.setItem('pokemon_list_fr', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Erreur lors de la récupération des données Pokemon fr:', error);
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

async function fetchChargedMoves() {
	try {
		const cachedData = localStorage.getItem('charged_moves');
		if (cachedData) {
			chargedMoves.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://pogoapi.net/api/v1/charged_moves.json');

			const data = await response.json();

			chargedMoves.set(data);

			localStorage.setItem('charged_moves', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching Charged Moves:', error);
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

async function fetchTypes() {
	try {
		const cachedData = localStorage.getItem('types');
		if (cachedData) {
			types.set(JSON.parse(cachedData));
		} else {
			const response = await fetch('https://tyradex.app/api/v1/types');

			const textData = await response.text();
			const data = textData ? JSON.parse(textData) : [];

			types.set(data);

			localStorage.setItem('types', JSON.stringify(data));
		}
	} catch (error) {
		console.error('Error fetching Types:', error);
	}
}

async function fetchCandyToEvolve() {
	try {
		const response = await fetch('https://pogoapi.net/api/v1/pokemon_candy_to_evolve.json');
		const data = await response.json();
		candyToEvolve.set(data);
	} catch (error) {
		console.error('Error fetching Candy to Evolve data:', error);
	}
}

async function fetchEncounterData() {
	try {
		const response = await fetch('https://pogoapi.net/api/v1/pokemon_encounter_data.json');
		const data = await response.json();
		encounterData.set(data);
	} catch (error) {
		console.error('Error fetching Encounter Data:', error);
	}
}

fetchPokemonData();
fetchCpMax();
fetchPokemonListFr();
fetchFastMoves();
fetchChargedMoves();
fetchPokemonMoves();
fetchTypes();
fetchCandyToEvolve();
fetchEncounterData();

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
	const pokemonArray = Object.values($pokemonListFr || []);

	const filteredPokemonArray = pokemonArray.map((pokemon: any) => {
		const {
			pokedex_id: id,
			generation,
			category,
			name,
			sprites,
			types,
			stats,
			evolution,
			catch_rate,
			egg_groups,
			formes,
			height,
			level_100,
			resistances,
			sexe,
			talents,
			weight
		} = pokemon;
		return {
			id,
			generation,
			category,
			frenchName: name?.fr || '',
			regularSprite: sprites?.regular || '',
			shinySprite: sprites?.shiny || '',
			types,
			stats,
			evolution,
			catchRate: catch_rate,
			eggGroups: egg_groups,
			formes,
			height,
			level100: level_100,
			resistances,
			sexe,
			talents,
			weight
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

export const chargedMovesList: any = derived(chargedMoves, ($chargedMoves) => {
	const chargedMovesArray = Object.values($chargedMoves as any);
	const uniqueChargedMovesMap = chargedMovesArray.reduce((map: any, chargedMove: any) => {
		map[chargedMove.name] = {
			stamina_loss_scaler: chargedMove.stamina_loss_scaler,
			name: chargedMove.name,
			power: chargedMove.power,
			duration: chargedMove.duration,
			energy_delta: chargedMove.energy_delta,
			type: chargedMove.type
		};
		return map;
	}, {});

	return Object.values(uniqueChargedMovesMap as any);
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

export const typesList: any = derived(types, ($types) => {
	const typesArray = Object.values($types as any);
	const uniqueTypesMap = typesArray.reduce((map: any, type: any) => {
		map[type.name.fr] = {
			name: type.name,
			id: type.id,
			sprites: type.sprites,
			resistances: type.strongAgainst
		};
		return map;
	}, {});

	return Object.values(uniqueTypesMap as any);
});

export const candyToEvolveList: any = derived(candyToEvolve, ($candyToEvolve) => {
	const candyArray = Object.values($candyToEvolve).flat();
	const uniqueCandyMap = candyArray.reduce((map: any, candy: any) => {
		map[candy.pokemon_id] = candy;
		return map;
	}, {});

	return Object.values(uniqueCandyMap as any);
});

export const encounterDataList: any = derived(encounterData, ($encounterData) => {
	const encounterArray = Object.values($encounterData);
	const uniqueEncounterMap = encounterArray.reduce((map: any, encounter: any) => {
		map[encounter.pokemon_id] = encounter;
		return map;
	}, {});

	return Object.values(uniqueEncounterMap as any);
});
