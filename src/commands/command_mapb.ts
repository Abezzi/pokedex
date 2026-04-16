import { type State } from "../state.js";

export async function commandMapb(state: State, _line: string): Promise<void> {
  try {
    if (!state.prevLocationsURL) {
      console.log("You're on the first page.");
      return;
    }

    const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    // update pagination URLs
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;

    data.results.forEach((loc) => {
      console.log(loc.name);
    });
  } catch (error) {
    console.error("Error fetching previous locations:", (error as Error).message);
  }
}
