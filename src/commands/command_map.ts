import { type State } from "../state.js";

export async function commandMap(state: State): Promise<void> {
  try {
    const data = await state.pokeAPI.fetchLocations(state.nextLocationsURL || undefined);

    // update pagination URLs in state
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;

    if (data.results.length === 0) {
      console.log("No more locations available.");
      return;
    }

    data.results.forEach((loc) => {
      console.log(loc.name);
    });
  } catch (error) {
    console.error("Error fetching locations:", (error as Error).message);
  }
}
