import { type State } from "../state.js";

export async function commandPokedex(state: State): Promise<void> {
  const caughtPokemon = Object.keys(state.pokedex);

  if (caughtPokemon.length === 0) {
    console.log("Your Pokedex is empty.");
    console.log("Catch some Pokemon with the 'catch' command!");
    return;
  }

  console.log("Your Pokedex:");
  const sortedNames = caughtPokemon.sort();

  for (const name of sortedNames) {
    console.log(`  - ${name}`)
  }
}
