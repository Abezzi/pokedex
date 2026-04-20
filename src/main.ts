import { startREPL } from "./repl.js";
import { initState } from "./state.js";
import { saveProgress } from "./storage.js";

async function main() {
  const state = await initState()

  // save progress when the user press CTRL+C
  const saveOnExit = async () => {
    await saveProgress(state.pokedex, state.party, state.coins, state.items);
    process.exit();
  }

  process.on('SIGINT', saveOnExit);
  process.on('SIGTERM', saveOnExit);

  startREPL(state);
}

main();
