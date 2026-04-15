import * as readline from "readline";
import { getCommands } from "./commands/index.js";

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

export function startREPL(): void {
  const commands = getCommands();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  // display initial prompt
  console.log("Welcome to the Pokedex! Type 'help' for available commands.\n");
  rl.prompt();

  rl.on("line", (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0].toLowerCase();
    const command = commands[commandName];

    if (command) {
      try {
        command.callback(commands);
      } catch (error) {
        console.error("Error executing command:", error);
      }
    } else {
      console.log(`Unknown command: ${commandName}`);
    }

    rl.prompt();
  });

  // handle user pressing (CTRL+C) to close
  rl.on("close", () => {
    const exitCommand = commands["exit"];

    if (exitCommand) {
      exitCommand.callback(commands);
    } else {
      console.log("\nGoodbye! 👋")
      process.exit(0);
    }
  });
}
