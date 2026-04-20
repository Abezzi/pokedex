import { type State } from "../state.js";

export async function commandPokedex(state: State): Promise<void> {
  const caughtPokemon = Object.keys(state.pokedex);
  const coins = state.coins;
  console.log(`🪙 Coins: ${coins}\n`);

  // display items with quantities
  const itemEntries = Object.entries(state.items);

  if (itemEntries.length > 0) {
    console.log("🎒 Items:");
    // sort items alphabetically
    const sortedItems = itemEntries.sort(([a], [b]) => a.localeCompare(b));

    for (const [itemName, quantity] of sortedItems) {
      const displayName = itemName.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      console.log(`  - ${displayName} × ${quantity}`);
    }
    console.log("");
  } else {
    console.log("🎒 You have no items yet.\n");
  }

  // display Pokedex
  if (caughtPokemon.length === 0) {
    console.log("📋 Your Pokédex is empty.");
    console.log("Catch some Pokémon with the 'catch' command!");
  } else {
    console.log("📋 Your Pokédex:");
    const sortedNames = caughtPokemon.sort();
    for (const name of sortedNames) {
      console.log(`  - ${name}`);
    }
  }
}
