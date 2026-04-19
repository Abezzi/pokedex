import { describe, it, expect, beforeEach, vi } from 'vitest';
import { commandBattle } from '../../src/commands/command_battle.js';
import type { State } from '../../src/state.js';
import type { Pokemon } from '../../src/pokeapi.js';

// Mock console
const mockLog = vi.spyOn(console, 'log').mockImplementation(() => { });

describe('commandBattle', () => {
  let mockState: State;
  let mockFetchPokemon: any;

  beforeEach(() => {
    mockLog.mockClear();

    mockFetchPokemon = vi.fn();

    mockState = {
      pokedex: {},
      pokeAPI: {
        fetchPokemon: mockFetchPokemon,
      },
    } as State;
  });

  // test 1: missing arguments
  it('should show usage message when arguments are missing', async () => {
    await commandBattle(mockState);

    expect(mockLog).toHaveBeenCalledWith("Usage: battle <my-pokemon> <enemy-pokemon>");
    expect(mockLog).toHaveBeenCalledWith("Example: battle magikarp mewtwo");
  });

  // test 2: User doesn't own the Pokémon
  it('should show error when user does not own the Pokémon', async () => {
    mockState.pokedex = { pikachu: { name: 'pikachu' } as Pokemon };

    await commandBattle(mockState, 'jigglypuff', 'mewtwo');

    expect(mockLog).toHaveBeenCalledWith("You don't own: jigglypuff or mistyped it");
    expect(mockLog).toHaveBeenCalledWith("catch it first with the 'catch' command: catch jigglypuff");
  });

  // test 3: Fight between Jigglypuff vs Mewtwo (Mewtwo should win)
  it('should simulate battle between jigglypuff and mewtwo where mewtwo wins', async () => {
    // mock owned Pokemon: jigglypuff
    const jigglypuff: Pokemon = {
      name: 'jigglypuff',
      stats: [
        { stat: { name: 'attack' }, base_stat: 45 },
        { stat: { name: 'defense' }, base_stat: 20 },
      ],
      abilities: [
        { ability: { name: 'cute-charm' } },
        { ability: { name: 'competitive' } },
      ],
      moves: [
        { move: { name: 'sing' } },
        { move: { name: 'pound' } },
      ],
    } as Pokemon;

    mockState.pokedex = { jigglypuff };

    // mock enemy: mewtwo, much stronger)
    const mewtwo: Pokemon = {
      name: 'mewtwo',
      stats: [
        { stat: { name: 'attack' }, base_stat: 110 },
        { stat: { name: 'defense' }, base_stat: 90 },
      ],
      abilities: [
        { ability: { name: 'pressure' } },
        { ability: { name: 'unnerve' } },
      ],
      moves: [
        { move: { name: 'psychic' } },
        { move: { name: 'psystrike' } },
      ],
    } as Pokemon;

    mockFetchPokemon.mockResolvedValue(mewtwo);

    await commandBattle(mockState, 'jigglypuff', 'mewtwo');

    // basic checks
    expect(mockLog).toHaveBeenCalledWith("A wild mewtwo appeared!");
    expect(mockLog).toHaveBeenCalledWith("jigglypuff v/s mewtwo!");
    expect(mockLog).toHaveBeenCalledWith("Battle Start! ⚔️");

    // check that mewtwo wins
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("The wild mewtwo won!"));
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("jigglypuff fainted"));

    // ensure fetch was called for the enemy
    expect(mockFetchPokemon).toHaveBeenCalledWith('mewtwo');
  });
});
