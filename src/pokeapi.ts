import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor() {
    this.cache = new Cache(5 * 60 * 1000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const locationPath = "/location-area/?limit=20"
    const url = pageURL || `${PokeAPI.baseURL}${locationPath}`

    // check cache before requesting the data to the server
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      console.log(`[CACHE HIT] ${url}`);
      return cached
    }

    console.log(`[CACHE MISS] fetching: ${url}`);

    // fetch request
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }

    // store response from server in the cache
    const data: ShallowLocations = await response.json();
    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    const cached = this.cache.get<Location>(url);
    if (cached) {
      console.log(`[CACHE HIT] ${url}`);
      return cached;
    }
    console.log(`[CACHE MISS] fetching: ${url}`);

    // fetch request
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data: Location = await response.json();
    this.cache.add(url, data);

    return data;
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
};
