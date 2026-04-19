import { Pokemon } from "../pokeapi.js";
import { type State } from "../state.js";

type BattlePokemon = {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  abilities: string[];
  moves: string[];
};

export async function commandBattle(state: State, ...args: string[]): Promise<void> {
  const myPokemonName = args[0]?.toLowerCase().trim();
  const enemyPokemonName = args[1]?.toLowerCase().trim();

  // validate arguments
  if (!myPokemonName || !enemyPokemonName) {
    console.log("Usage: battle <my-pokemon> <enemy-pokemon>")
    console.log("Example: battle magikarp mewtwo")
    return;
  }

  // check if user has caught the pokemon he tried to send to battle
  if (!state.pokedex[myPokemonName]) {
    console.log(`You don't own: ${myPokemonName} or mistyped it`)
    console.log(`catch it first with the 'catch' command: catch ${myPokemonName}`)
    return;
  }

  const myPokemon = state.pokedex[myPokemonName];
  let enemyPokemon: Pokemon;

  // fetch enemy pokemon
  try {
    enemyPokemon = await state.pokeAPI.fetchPokemon(enemyPokemonName);
  } catch (err) {
    console.log(`Error: Could not find Pokemon "${enemyPokemonName}"`)
    console.log("Make sure the name is spelled correctly.");
    return;
  }

  console.log(`A wild ${enemyPokemon.name} appeared!`)
  console.log(`${myPokemon.name} v/s ${enemyPokemon.name}!`)

  const player: BattlePokemon = {
    name: myPokemon.name,
    hp: 100,
    attack: myPokemon.stats.find(s => s.stat.name === "attack")?.base_stat || 50,
    defense: myPokemon.stats.find(s => s.stat.name === "defense")?.base_stat || 50,
    abilities: myPokemon.abilities.map(a => a.ability.name),
    moves: myPokemon.moves.map(m => m.move.name)
  };

  const enemy: BattlePokemon = {
    name: enemyPokemon.name,
    hp: 100,
    attack: enemyPokemon.stats.find(s => s.stat.name === "attack")?.base_stat || 50,
    defense: enemyPokemon.stats.find(s => s.stat.name === "defense")?.base_stat || 50,
    abilities: enemyPokemon.abilities.map(a => a.ability.name),
    moves: myPokemon.moves.map(m => m.move.name)
  };

  console.log("Battle Start! ⚔️")
  console.log("════════════════════════════════════");
  let turn = 0;

  while (player.hp > 0 && enemy.hp > 0) {
    turn++;
    console.log(`Turn ${turn}:`);

    // player's turn
    // pick between a random ability or move
    const isMovePlayer = Math.random() < 0.5;
    const chosenActionPlayer = isMovePlayer
      ? player.moves[Math.floor(Math.random() * player.moves.length)]
      : player.abilities[Math.floor(Math.random() * player.abilities.length)];
    const emojiPlayer = isMovePlayer ? "👊🏻" : "✨";

    // player damage calculation
    const playerDamage = Math.max(0, Math.floor((player.attack * 0.65) - (enemy.defense * 0.35)));

    enemy.hp = Math.max(0, enemy.hp - playerDamage);
    console.log(`-> ${player.name} used ${chosenActionPlayer}! ${emojiPlayer}`);
    console.log(`  ${enemy.name} took ${playerDamage} damage!`);

    if (enemy.hp <= 0) break;

    // enemy's turn
    // pick between a random ability or move
    const isMoveEnemy = Math.random() < 0.5;
    const chosenActionEnemy = isMoveEnemy
      ? enemy.moves[Math.floor(Math.random() * enemy.moves.length)]
      : enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
    const emojiEnemy = isMoveEnemy ? "👊🏻" : "✨";

    // enemy damage calculation
    const enemyDamage = Math.max(0, Math.floor((enemy.attack * 0.65) - (player.defense * 0.35)));

    player.hp = Math.max(0, player.hp - enemyDamage);
    console.log(`-> ${enemy.name} used ${chosenActionEnemy}! ${emojiEnemy}`);
    console.log(`  ${player.name} took ${enemyDamage} damage!`);

    // HP log
    console.log(`${player.name} HP: ${player.hp} | ${enemy.name} HP: ${enemy.hp}\n`);
  }

  console.log("════════════════════════════════════");

  if (player.hp > 0) {
    console.log(`🎉😊 ${player.name} won the battle!`);
    console.log(`The wild ${enemy.name} fainted!`);
  } else {
    console.log(`💥😵 ${player.name} fainted...`);
    console.log(`The wild ${enemy.name} won!`);
  }

  console.log("════════════════════════════════════");
}
