// test/commands/command_evolve.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { commandEvolve } from '../../src/commands/command_evolve.js';
import type { State } from '../../src/state.js';
import type { Pokemon } from '../../src/pokeapi.js';

// Mock console
const mockLog = vi.spyOn(console, 'log').mockImplementation(() => { });

describe('commandEvolve', () => {
  let mockState: State;
  let mockGetNextEvolution: any;
  let mockFetchPokemon: any;

  beforeEach(() => {
    mockLog.mockClear();

    mockGetNextEvolution = vi.fn();
    mockFetchPokemon = vi.fn();

    mockState = {
      pokedex: {},
      items: {},
      pokeAPI: {
        getNextEvolution: mockGetNextEvolution,
        fetchPokemon: mockFetchPokemon,
      },
    } as State;
  });

  // test 1: wrong / non-owned Pokemon name
  it('should show error when user inputs a Pokémon they do not own (e.g. gatomon)', async () => {
    await commandEvolve(mockState, 'gatomon');

    expect(mockLog).toHaveBeenCalledWith("You don't own: gatomon or mistyped it");
    expect(mockLog).toHaveBeenCalledWith("catch it first with the 'catch' command: catch gatomon");
  });

  // test 2: user doesn't have enough Evolution Stones
  it('should show error when user has no Evolution Stones', async () => {
    mockState.pokedex = { jigglypuff: { name: 'jigglypuff' } as Pokemon };
    mockState.items = {}; // no stones

    await commandEvolve(mockState, 'jigglypuff');

    expect(mockLog).toHaveBeenCalledWith("You don't have any Evolution Stones!");
    expect(mockLog).toHaveBeenCalledWith("You can buy them at the PokeMart using 'buy'.");
  });

  // ─────────────────────────────────────────────
  // Test 3: Successful evolution Jigglypuff → Wigglytuff
  // ─────────────────────────────────────────────
  it('should successfully evolve jigglypuff into wigglytuff', async () => {
    const jigglypuff: Pokemon = { name: 'jigglypuff' } as Pokemon;
    const wigglytuff: Pokemon = { name: 'wigglytuff' } as Pokemon;

    mockState.pokedex = { jigglypuff };
    mockState.items = { "evolution-stone": 2 };

    // Mock the evolution chain logic
    mockGetNextEvolution.mockResolvedValue("wigglytuff");
    mockFetchPokemon.mockResolvedValue(wigglytuff);

    await commandEvolve(mockState, 'jigglypuff');

    // Success message
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("evolved into wigglytuff"));

    // State changes
    expect(mockState.pokedex['wigglytuff']).toBeDefined();
    expect(mockState.pokedex['jigglypuff']).toBeUndefined(); // old form removed
    expect(mockState.items["evolution-stone"]).toBe(1);       // one stone consumed
  });
});
