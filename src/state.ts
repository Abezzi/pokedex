import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/index.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  description: string;
  callback: (state: State, line: string) => Promise<void>;
};

export type State = {
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  const pokeAPI = new PokeAPI();
  const nextLocationsURL: null = null;
  const prevLocationsURL: null = null;
  const prompt = "Pokedex > ";
  const coloredPrompt = `\x01\x1b[32m\x02${prompt}\x01\x1b[0m\x02`;

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: coloredPrompt,
  });

  const commands = getCommands();

  return { pokeAPI, nextLocationsURL, prevLocationsURL, rl, commands };
}
