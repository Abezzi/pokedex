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

/**
 * start the REPL and read the commands the user inserts
 * @param state - object that represents the state of the application
 * @returns void
 */
export async function startREPL(state: State): Promise<void> {
  // display ascii art
  console.log(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⡠⠖⢉⣌⢆⠀⠀⠀⠀⠀     ██████╗  ██████╗ ██╗  ██╗███████╗██████╗ ███████╗██╗  ██╗
⠀⠀⠀⠀⠀⠀⠀⣠⠚⠉⠀⠈⠉⠲⣿⣿⡜⡀⠀⠀⠀⠀     ██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝██╔══██╗██╔════╝╚██╗██╔╝
⡔⢉⣙⣓⣒⡲⠮⡇⠀⠀⠀⠀⠀⠀⠘⡿⡇⡇⠀⠀⠀⠀     ██████╔╝██║   ██║█████╔╝ █████╗  ██║  ██║█████╗   ╚███╔╝ 
⡇⠘⣿⣿⣿⠏⠀⠀⠠⣀⡀⠀⠀⠀⠀⡇⠈⠳⡄⠀⠀⠀     ██╔═══╝ ██║   ██║██╔═██╗ ██╔══╝  ██║  ██║██╔══╝   ██╔██╗ 
⢹⠀⢻⣿⠇⠀⠀⣀⣀⠀⡍⠃⠀⠀⣠⣷⡟⢳⡜⡄⠀⠀     ██║     ╚██████╔╝██║  ██╗███████╗██████╔╝███████╗██╔╝ ██╗
⠈⣆⠀⠋⢀⢔⣵⣿⠋⠹⣿⠒⠒⠚⠁⣿⣿⣾⣷⢸⠤⡄     ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝
⠀⡇⠀⠀⢸⢸⣿⣿⣶⣾⡏⡇⠀⠀⢀⡘⣝⠿⡻⢸⡰⠁
⠀⢳⠀⠀⠈⢆⠻⢿⡿⠟⡱⠁⠰⠛⢿⡇⠀⠉⠀⡸⠁⠀
⠀⠈⢆⠀⠀⠀⠉⠒⠒⣉⡀⠀⠀⢇⠀⡇⠀⠀⢠⠃⠀⠀                       P O K E D E X   C L I
⠀⠀⠈⠣⡀⠀⠀⠀⠀⠀⢉⡱⠀⠀⠉⠀⢀⡴⠁⠀⠀⠀
⠀⠀⠀⠀⠈⠓⠦⣀⣉⡉⠁⢀⣀⣠⠤⠒⠥⣄⠀⠀⠀⠀                         by: Alex Herrera
⠀⠀⠀⠀⠀⠰⣉⣀⣀⡠⠭⠛⠀⠀⠑⠒⠤⠤⠷⠀⠀⠀
    `)
  // display initial prompt
  console.log("Welcome to the Pokedex! Type 'help' for available commands.\n");
  state.rl.prompt();

  // read user input
  state.rl.on("line", async (input: string) => {
    // cleans user input and separates every word in an array e.g ["commandA" , "commandB", "commandC"]
    const cleanUserInput = cleanInput(input);
    // stores all the subsequent commands (all except the first one) e.g: ["commandB", "commandC"]
    const commandArgs = cleanUserInput.slice(1);

    if (cleanUserInput.length === 0) {
      state.rl.prompt();
      return;
    }

    // initial command e.g: "commandA"
    const commandName = cleanUserInput[0];
    // gets the command based on the name, it can be: help, map, mapb, explore, exit, etc...
    const command = state.commands[commandName];

    if (command) {
      try {
        await command.callback(state, ...commandArgs);
      } catch (error) {
        console.error("Error executing command:", error);
      }
    } else {
      console.log(`Unknown command: ${commandName}`);
    }

    state.rl.prompt();
  });
}
