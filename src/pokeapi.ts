import { Cache } from "./pokecache.js";

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    }
  }>;
  moves: Array<{
    move: {
      name: string;
    }
  }>
  species: {
    name: string;
    url: string;
  }
}

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor() {
    this.cache = new Cache(5 * 60 * 1000);
  }

  private normalizeLocationURL(url: string): string {
    try {
      const urlObj = new URL(url);

      // Keep only the pathname + important query params
      const params = new URLSearchParams(urlObj.search);

      const limit = params.get("limit") || "20";
      const offset = params.get("offset") || "0";

      // Always normalize first page to the same key
      return `${PokeAPI.baseURL}/location-area/?offset=${offset}&limit=${limit}`;
    } catch {
      // Fallback if URL parsing fails
      return url;
    }
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fetchURL: string;

    if (pageURL) {
      fetchURL = pageURL;
    } else {
      fetchURL = `${PokeAPI.baseURL}/location-area/?limit=20`;
    }

    const cacheKey = this.normalizeLocationURL(fetchURL);

    const cached = this.cache.get<ShallowLocations>(cacheKey);
    if (cached) {
      // console.log(`[CACHE HIT] ${cacheKey}`);
      return cached;
    }

    // console.log(`[CACHE MISS] fetching: ${fetchURL}`);

    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }

    const data: ShallowLocations = await response.json();

    this.cache.add(cacheKey, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    const cached = this.cache.get<Location>(url);

    if (cached) {
      // console.log(`[CACHE HIT] ${url}`);
      return cached;
    }
    // console.log(`[CACHE MISS] fetching: ${url}`);

    // fetch request
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data: Location = await response.json();
    this.cache.add(url, data);

    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const normalizedName = pokemonName.toLocaleLowerCase().trim();
    const url = `${PokeAPI.baseURL}/pokemon/${normalizedName}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      // console.log(`[CACHE HIT] ${url}`)
      return cached;
    }

    // console.log(`[CACHE MISS] Fetching ${url}`)

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
    }

    const data: Pokemon = await response.json();
    this.cache.add(url, data);

    return data;
  }

  async getNextEvolution(pokemonName: string): Promise<string | null> {
    try {
      // 1. Fetch the Pokémon to get species URL
      const pokemon = await this.fetchPokemon(pokemonName);

      if (!pokemon.species?.url) return null;

      // 2. Fetch species data
      const speciesRes = await fetch(pokemon.species.url);
      const species = await speciesRes.json();

      if (!species.evolution_chain?.url) return null;

      // 3. Fetch evolution chain
      const chainRes = await fetch(species.evolution_chain.url);
      const chainData = await chainRes.json();

      // 4. Traverse the chain to find next evolution
      let current = chainData.chain;

      while (current) {
        if (current.species.name === pokemonName) {
          // Found current Pokémon → return next evolution if exists
          if (current.evolves_to && current.evolves_to.length > 0) {
            return current.evolves_to[0].species.name;
          }
          return null; // No further evolution
        }

        // Move to next in chain (most chains are linear)
        current = current.evolves_to?.[0] || null;
      }

      return null;
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
      return null;
    }
  }

  // clean up on exit
  stopCache(): void {
    this.cache.stopReapLoop();
  }

}


export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type Location = {
  id: number;
  name: string
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    }
  }>
};
