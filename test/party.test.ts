import { describe, it, expect, beforeEach, vi } from 'vitest';
import { commandParty } from '../src/commands/command_party.js';
import type { State } from '../src/state.js';
import type { Pokemon } from '../src/pokeapi.js';

// Mock console
const mockLog = vi.spyOn(console, 'log').mockImplementation(() => { });
const mockError = vi.spyOn(console, 'error').mockImplementation(() => { });

describe('commandParty', () => {
  let mockState: State;

  beforeEach(() => {
    mockLog.mockClear();
    mockError.mockClear();

    mockState = {
      pokedex: {},
      party: {},
    } as State;
  });

  // test 1: No arguments / list when empty
  it('should show usage and help message when no arguments are given', async () => {
    await commandParty(mockState);

    expect(mockLog).toHaveBeenCalledWith("You have no parties yet.");
    expect(mockLog).toHaveBeenCalledWith(
      "Create one with: party <party-name> <pokemon1> <pokemon2> <pokemon3>"
    );
  });

  // test 2: list parties when some exist
  it('should list all saved parties correctly', async () => {
    const pikachu: Pokemon = { name: 'pikachu' } as Pokemon;
    const charmander: Pokemon = { name: 'charmander' } as Pokemon;
    const bulbasaur: Pokemon = { name: 'bulbasaur' } as Pokemon;

    mockState.pokedex = { pikachu, charmander, bulbasaur };
    mockState.party = {
      'my-favorites': [pikachu, charmander, bulbasaur],
      'rival-team': [charmander, bulbasaur, pikachu],
    };

    await commandParty(mockState, 'list');

    expect(mockLog).toHaveBeenCalledWith("Your Parties:");

    // look for the party names and their members
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("my-favorites"));
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("rival-team"));
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("pikachu"));
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("charmander"));
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("bulbasaur"));
  });

  // test 3: missing arguments when creating party
  it('should show usage message when creating party with insufficient arguments', async () => {
    await commandParty(mockState, 'my-team', 'pikachu', 'charmander');

    expect(mockLog).toHaveBeenCalledWith("Usage: party <party-name> <pokemon1> <pokemon2> <pokemon3>");
    expect(mockLog).toHaveBeenCalledWith("Example: party my-favorites jigglypuff charmander psyduck");
  });

  // test 4: trying to add Pokémon the user doesn't own
  it('should show error when user tries to add Pokémon they dont own', async () => {
    mockState.pokedex = { pikachu: { name: 'pikachu' } as Pokemon };

    await commandParty(mockState, 'my-team', 'pikachu', 'charmander', 'squirtle');

    expect(mockLog).toHaveBeenCalledWith("You don't own: charmander, squirtle");
    expect(mockLog).toHaveBeenCalledWith("Gotta catch them all!");
  });

  // test 5: Successfully create a party
  it('should successfully create a new party with three owned Pokémon', async () => {
    const pikachu: Pokemon = { name: 'pikachu' } as Pokemon;
    const charmander: Pokemon = { name: 'charmander' } as Pokemon;
    const bulbasaur: Pokemon = { name: 'bulbasaur' } as Pokemon;

    mockState.pokedex = { pikachu, charmander, bulbasaur };

    await commandParty(mockState, 'my-favorites', 'pikachu', 'charmander', 'bulbasaur');

    expect(mockLog).toHaveBeenCalledWith('✅ Party "my-favorites" created successfully!');
    expect(mockLog).toHaveBeenCalledWith('Team: pikachu, charmander, bulbasaur');

    // verify it was actually saved
    expect(mockState.party['my-favorites']).toEqual([pikachu, charmander, bulbasaur]);
  });
});
