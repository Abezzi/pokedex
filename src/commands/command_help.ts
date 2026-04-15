import { type State } from "../state.js";

export function commandHelp(state: State, _line: string): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const [name, cmd] of Object.entries(state.commands)) {
    console.log(`  ${name.padEnd(12)} - ${cmd.description}`);
  }

  console.log("");
}
