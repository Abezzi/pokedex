import { type State } from "../state.js";

export async function commandCheck(state: State, ...args: string[]): Promise<void> {
  const locationName = args[0]

  if (!locationName) {
    console.log("Usage: check <location-area-name>");
    console.log("Example: check pastoria-city-area");
    return;
  }

  console.log(`🔎 Checking ${locationName}...`);

  try {
    const data = await state.pokeAPI.fetchLocation(locationName);

    if (!data.pokemon_encounters || data.pokemon_encounters.length === 0) {
      console.log("No Pokémon found in this area.");
      return;
    }

    console.log("Found Pokemon:");

    // extract unique Pokémon names and sort them alphabetically
    const pokemonNames = data.pokemon_encounters
      .map((encounter) => encounter.pokemon.name)
      .filter((name, index, self) => self.indexOf(name) === index)
      .sort();

    for (const name of pokemonNames) {
      console.log(` - ${name}`);
    }
  } catch (error: any) {
    console.error(`Error checking ${locationName}: ${error.message}`);
    console.log("Make sure the location area name is correct (use 'map' to find valid names).");
  }
}
