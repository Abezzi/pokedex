import { type State } from "../state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  const pokemonName = args[0].toLowerCase();

  if (!pokemonName) {
    console.log("Usage: inspect <pokemon-name>");
    console.log("Example: inspect jigglypuff");
    return;
  }

  const caughtPokemon = state.pokedex[pokemonName];

  if (!caughtPokemon) {
    console.log("you have not caught that pokemon")
    return;
  }

  // Display information
  console.log(`Name: ${caughtPokemon.name}`);
  console.log(`Height: ${caughtPokemon.height}`);
  console.log(`Weight: ${caughtPokemon.weight}`);

  // Stats
  console.log("Stats:");
  for (const stat of caughtPokemon.stats) {
    const statName = stat.stat.name.replace("-", " ");
    console.log(`  -${statName}: ${stat.base_stat}`);
  }

  // Types
  console.log("Types:");
  for (const typeEntry of caughtPokemon.types) {
    console.log(`  - ${typeEntry.type.name}`);
  }
}
