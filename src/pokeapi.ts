export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() { }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const locationPath = "/location-area/?limit=20"
    const url = pageURL || `${PokeAPI.baseURL}${locationPath}`
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }

    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    return response.json();
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
