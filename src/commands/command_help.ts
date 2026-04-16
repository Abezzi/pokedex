import { type State } from "../state.js";

export async function commandHelp(state: State, _line: string): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const [name, cmd] of Object.entries(state.commands)) {
    console.log(`  ${name.padEnd(12)} - ${cmd.description}`);
  }

  console.log("");
}
