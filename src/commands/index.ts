import { CLICommand } from "../state.js";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
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
    },
    explore: {
      description: "Explore a location area and list the Pokemon that live there. Usage: explore <location-name>",
      callback: commandExplore,
    },
    catch: {
      description: "Attempt to catch a Pokemon. Usage: catch <pokemon-name>",
      callback: commandCatch,
    }
  };
}
