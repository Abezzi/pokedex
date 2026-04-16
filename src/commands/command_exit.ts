import { type State } from "../state.js";

export async function commandExit(state: State, _line: string): Promise<void> {
  console.log("Closing the Pokedex... Goodbye!")
  state.rl.close();
  process.exit(0);
}
