import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/index.js";

export type CLICommand = {
  description: string;
  callback: (state: State, line: string) => void;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();

  return { rl, commands };
}
