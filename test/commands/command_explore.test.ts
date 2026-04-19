import { describe, it, expect, beforeEach, vi } from 'vitest';
import { commandExplore } from '../../src/commands/command_explore.js';
import type { State } from '../../src/state.js';
import { Location } from '../../src/pokeapi.js';

// mock console
const mockLog = vi.spyOn(console, 'log').mockImplementation(() => { });
const mockError = vi.spyOn(console, 'error').mockImplementation(() => { });

describe('commandExplore', () => {
  let mockState: State;
  let mockFetchLocation: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // clear mocks before each test
    mockLog.mockClear();
    mockError.mockClear();

    mockFetchLocation = vi.fn();

    mockState = {
      pokeAPI: {
        fetchLocation: mockFetchLocation,
      } as any,
    } as State;
  });

  // test 1: no arguments provided
  it('should show usage message when no location name is given', async () => {
    await commandExplore(mockState);

    expect(mockLog).toHaveBeenCalledWith("Usage: explore <location-area-name>");
    expect(mockLog).toHaveBeenCalledWith("Example: explore pastoria-city-area");

    // should NOT call the API
    expect(mockState.pokeAPI.fetchLocation).not.toHaveBeenCalled();
  });

  // test 2: valid location with Pokémon
  it('should successfully explore a valid location and display sorted unique Pokémon', async () => {
    const mockData: Location = {
      id: 123,
      name: "eterna-city-area",
      pokemon_encounters: [
        { pokemon: { name: 'barboach', url: "https://pokeapi.co/api/v2/pokemon/barboach" } },
        { pokemon: { name: 'golduck', url: "https://pokeapi.co/api/v2/pokemon/golduck" } },
        { pokemon: { name: 'gyarados', url: "https://pokeapi.co/api/v2/pokemon/gyarados" } },
        { pokemon: { name: 'magikarp', url: "https://pokeapi.co/api/v2/pokemon/magikarp" } },
        { pokemon: { name: 'psyduck', url: "https://pokeapi.co/api/v2/pokemon/psyduck" } },
        { pokemon: { name: 'whiscash', url: "https://pokeapi.co/api/v2/pokemon/whiscash" } },
      ],
    };

    // this is the key: properly mock the function
    mockFetchLocation.mockResolvedValue(mockData)

    await commandExplore(mockState, 'eterna-city-area');

    expect(mockLog).toHaveBeenCalledWith('Exploring eterna-city-area...');
    expect(mockLog).toHaveBeenCalledWith('Found Pokemon:');

    // match exactly what you see when running manually
    expect(mockLog).toHaveBeenCalledWith(' - barboach');
    expect(mockLog).toHaveBeenCalledWith(' - golduck');
    expect(mockLog).toHaveBeenCalledWith(' - gyarados');
    expect(mockLog).toHaveBeenCalledWith(' - magikarp');
    expect(mockLog).toHaveBeenCalledWith(' - psyduck');
    expect(mockLog).toHaveBeenCalledWith(' - whiscash');

    // make sure it didn't go to error path
    expect(mockError).not.toHaveBeenCalled();
    expect(mockLog).not.toHaveBeenCalledWith(
      "Make sure the location area name is correct (use 'map' to find valid names)."
    );
  });

  // test 3: invalid / non-existent location
  it('should show error message when location does not exist', async () => {
    // simulate API error (e.g. 404 Not Found)
    const fakeError = new Error('Failed to fetch location: Not Found');
    mockFetchLocation.mockRejectedValue(fakeError)

    await commandExplore(mockState, 'talca');

    expect(mockLog).toHaveBeenCalledWith('Exploring talca...');

    expect(mockError).toHaveBeenCalledWith(
      'Error exploring talca: Failed to fetch location: Not Found'
    );

    expect(mockLog).toHaveBeenCalledWith(
      "Make sure the location area name is correct (use 'map' to find valid names)."
    );

    // should NOT reach the success path
    expect(mockLog).not.toHaveBeenCalledWith('Found Pokemon:');
  });
});
