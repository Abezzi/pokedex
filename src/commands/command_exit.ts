import { type State } from "../state.js";

export function commandExit(state: State, _line: string): void {
  console.log("Closing the Pokedex... Goodbye!")
  state.rl.close();
  process.exit(0);
}
