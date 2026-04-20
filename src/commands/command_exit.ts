import { type State } from "../state.js";
import { saveProgress } from "../storage.js";

export async function commandExit(state: State): Promise<void> {
  console.log("Saving your progress...");

  try {
    await saveProgress(state.pokedex, state.party, state.coins, state.items);
  } catch (error) {
  }

  console.log("Closing the Pokedex... Goodbye! 👋😊")
  state.rl.close();
  process.exit(0);
}
