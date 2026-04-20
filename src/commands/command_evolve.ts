import { type State } from "../state.js";

export async function commandEvolve(state: State, ...args: string[]): Promise<void> {
  const myPokemonName = args[0]?.toLowerCase().trim();

  // validate arguments
  if (!myPokemonName) {
    console.log("Usage: evolve <my-pokemon>")
    console.log("Example: evolve jigglypuff")
    return;
  }

  // check if caught the pokemon
  if (!state.pokedex[myPokemonName]) {
    console.log(`You don't own: ${myPokemonName} or mistyped it`)
    console.log(`catch it first with the 'catch' command: catch ${myPokemonName}`)
    return;
  }

  // check if has evolution stones
  if (!state.items["evolution-stone"] || state.items["evolution-stone"] < 1) {
    console.log("You don't have any Evolution Stones!");
    console.log("You can buy them at the PokeMart using 'buy'.");
    return;
  }

  // gets your pokemon from the state
  const currentPokemon = state.pokedex[myPokemonName];

  // evolve logic
  console.log(`🔄 Attempting to evolve ${currentPokemon.name}...`);

  try {
    // get next evolution from PokeAPI chain
    const nextEvolutionName = await state.pokeAPI.getNextEvolution(myPokemonName);

    if (!nextEvolutionName) {
      console.log(`${currentPokemon.name} cannot evolve using an Evolution Stone.`);
      return;
    }

    // fetch the evolved Pokémon
    const evolvedPokemon = await state.pokeAPI.fetchPokemon(nextEvolutionName);

    // replace in pokedex
    state.pokedex[nextEvolutionName] = evolvedPokemon;
    delete state.pokedex[myPokemonName];

    // consume one Evolution Stone
    state.items["evolution-stone"] -= 1;
    if (state.items["evolution-stone"] <= 0) {
      delete state.items["evolution-stone"];
    }

    console.log(`✨ ${currentPokemon.name} evolved into ${evolvedPokemon.name}!`);

  } catch (error) {
    console.log("Evolution failed. Something went wrong with the API.");
  }
}
