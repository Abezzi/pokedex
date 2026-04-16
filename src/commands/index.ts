import { CLICommand } from "../state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      description: "Displays the next 20 location areas in Pokemon world",
      callback: commandMap,
    },
    mapb: {
      description: "Displays the previous 20 location areas",
      callback: commandMapb,
    }
  };
}
