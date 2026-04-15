import * as readline from "readline";

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
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  // display initial prompt
  rl.prompt();

  rl.on("line", (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    // print first word in the required format
    console.log(`Your command was: ${words[0]}`);

    rl.prompt();
  });

  // handle close (CTRL+C)
  rl.on("close", () => {
    console.log("\nGoodbye! 👋")
    process.exit(0);
  });
}
