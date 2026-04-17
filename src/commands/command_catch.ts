import { type State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  const pokemonName = args[0].toLowerCase();

  if (!pokemonName) {
    console.log("Usage: catch <pokemon-name>");
    console.log("Example: catch jigglypuff");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const catchRate = Math.max(10, 70 - Math.floor(pokemon.base_experience / 8));
    const scapeRate = Math.random() * 100;

    if (scapeRate < catchRate) {
      // store in pokedex
      state.pokedex[pokemon.name] = pokemon;

      console.log(`${pokemonName} was caught!`);
      console.log(`Added to your Pokédex!`);
    } else {
      console.log(`${pokemonName} escaped!`);
    }
  } catch (err) {
    console.error(`Error: Could not find Pokémon "${pokemonName}"`);
    console.log("Make sure the name is spelled correctly.");
  }
}
