import { Pokemon } from "../pokeapi.js";
import { type State } from "../state.js";

export async function commandParty(state: State, ...args: string[]): Promise<void> {
  const subCommand = args[0]?.toLowerCase().trim();

  if (subCommand === "list" || !subCommand) {
    if (!state.party || Object.keys(state.party).length === 0) {
      console.log("You have no parties yet.");
      console.log("Create one with: party <party-name> <pokemon1> <pokemon2> <pokemon3>");
      return;
    }

    console.log("Your Parties:");
    Object.entries(state.party).forEach(([partyName, team]) => {
      const pokemonNames = team.map(p => p.name).join(", ");
      console.log(`  - ${partyName} -> ${pokemonNames}`);
    });
    return;
  }

  const partyName = subCommand;
  const pokemon1 = args[1]?.toLowerCase().trim();
  const pokemon2 = args[2]?.toLowerCase().trim();
  const pokemon3 = args[3]?.toLowerCase().trim();

  // validate arguments
  if (!partyName || !pokemon1 || !pokemon2 || !pokemon3) {
    console.log("Usage: party <party-name> <pokemon1> <pokemon2> <pokemon3>")
    console.log("Example: party my-favorites jigglypuff charmander psyduck")
    return;
  }

  // check if user has caught all three pokemon before adding them to the party
  const caughtPokemon = Object.keys(state.pokedex);
  const missingPokemon: string[] = [];

  if (!caughtPokemon.includes(pokemon1)) missingPokemon.push(pokemon1);
  if (!caughtPokemon.includes(pokemon2)) missingPokemon.push(pokemon2);
  if (!caughtPokemon.includes(pokemon3)) missingPokemon.push(pokemon3);

  if (missingPokemon.length > 0) {
    console.log(`You don't own: ${missingPokemon.join(", ")}`);
    console.log("Gotta catch them all!");
    return;
  }

  // Get the actual Pokemon objects from pokedex
  const team: Pokemon[] = [
    state.pokedex[pokemon1],
    state.pokedex[pokemon2],
    state.pokedex[pokemon3],
  ];

  // Initialize party as object if it's not already (in case it's still an array)
  if (!state.party || Array.isArray(state.party)) {
    state.party = {};
  }

  // Store the party
  state.party[partyName] = team;

  console.log(`✅ Party "${partyName}" created successfully!`);
  console.log(`Team: ${pokemon1}, ${pokemon2}, ${pokemon3}`);
}
