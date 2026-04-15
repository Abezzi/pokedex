import { type State } from "./state.js";

/**
 * cleans the input by removing leading and trailing white spaces, converts to lowercase, splits on one or more whitespaces characters, and removes empty strings
 * @param input - string to be cleaned
 * @returns clean input with the methods applied
 */
export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0);
}

export function startREPL(state: State): void {
  // display initial prompt
  console.log("Welcome to the Pokedex! Type 'help' for available commands.\n");
  state.rl.prompt();

  // read user input
  state.rl.on("line", (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];

    if (command) {
      try {
        command.callback(state, input);
      } catch (error) {
        console.error("Error executing command:", error);
      }
    } else {
      console.log(`Unknown command: ${commandName}`);
    }

    state.rl.prompt();
  });
}
