import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/index.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { loadProgress } from "./storage.js";

export type CLICommand = {
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokedex: Record<string, Pokemon>;
  party: Record<string, Pokemon[]>;
};

export async function initState(): Promise<State> {
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

  // load saved progress
  const saved = await loadProgress();
  const pokedex: Record<string, Pokemon> = saved?.pokedex || {};
  const party: Record<string, Pokemon[]> = saved?.party || {};

  const state: State = {
    pokeAPI,
    nextLocationsURL,
    prevLocationsURL,
    rl,
    commands,
    pokedex,
    party,
  };

  if (Object.keys(pokedex).length > 0) {
    console.log(`💾 Loaded ${Object.keys(pokedex).length} Pokémon from save file!`);
  }

  return state;
}
