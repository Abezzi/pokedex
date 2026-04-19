import { CLICommand } from "../state.js";
import { commandBattle } from "./command_battle.js";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandParty } from "./command_party.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    battle: {
      description: "Battle a wild Pokemon using yours. Usage: battle <my-pokemon> <enemy-pokemon>",
      callback: commandBattle,
    },
    catch: {
      description: "Attempt to catch a Pokemon. Usage: catch <pokemon-name>",
      callback: commandCatch,
    },
    exit: {
      description: "Exits the pokedex",
      callback: commandExit,
    },
    explore: {
      description: "Explore a location area and list the Pokemon that live there. Usage: explore <location-name>",
      callback: commandExplore,
    },
    help: {
      description: "Displays a help message",
      callback: commandHelp,
    },
    inspect: {
      description: "Inspects a caught pokemon and show its details. Usage: inspect <pokemon-name>",
      callback: commandInspect,
    },
    map: {
      description: "Displays the next 20 location areas in Pokemon world",
      callback: commandMap,
    },
    mapb: {
      description: "Displays the previous 20 location areas",
      callback: commandMapb,
    },
    party: {
      description: "Make a party with 3 of your caught Pokemon. Usage: party <pokemon-name-1> <pokemon-name-2> <pokemon-name-3>",
      callback: commandParty,
    },
    pokedex: {
      description: "List all Pokemon you have caught",
      callback: commandPokedex,
    },
  };
}
