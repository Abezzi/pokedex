import { type State } from "../state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Available Commands:\n");

  for (const [name, cmd] of Object.entries(state.commands)) {
    console.log(`  ${name.padEnd(12)} - ${cmd.description}`);
  }

  console.log("");
}
