import type { State } from "../state.js";

type LocationNode = {
  name: string;
  slug: string;
};

const STARTING_LOCATION: LocationNode = {
  name: "Eterna Forest Entrance",
  slug: "eterna-forest-area"
};

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  let currentLocation: LocationNode = STARTING_LOCATION;
  let previousLocation: LocationNode | null = null;

  console.log("\n🌲 You begin your adventure in the Pokémon world...\n");

  while (true) {
    console.log(`🗺️ You are currently at: **${currentLocation.name}**\n`);

    // Show Pokémon in current area using your existing "check" command
    console.log("Checking the area...\n");
    await state.commands.check.callback(state, currentLocation.slug);

    console.log("\n🧭 Where would you like to do?");
    console.log("  left     -> Go left");
    console.log("  right    -> Go right");
    console.log("  forward  -> Go forward");
    console.log("  backward -> Go back the way you came");
    console.log("  leave    -> End exploration and return to Pokedex");

    const choice = await getUserChoice(state.rl);

    if (!choice) {
      console.log("Invalid input.");
      continue;
    }

    const action = choice.toLowerCase().trim();

    if (action === "leave") {
      console.log("\nYou return from your exploration. Goodbye for now!");
      break;
    }

    if (action === "backward") {
      if (!previousLocation) {
        console.log("You can't go back any further.");
        continue;
      }
      console.log(`\nYou head back to ${previousLocation.name}...`);
      // Swap current and previous
      const temp = currentLocation;
      currentLocation = previousLocation;
      previousLocation = temp;
      continue;
    }

    // For left, right, forward → move to a random new location
    if (["left", "right", "forward"].includes(action)) {
      previousLocation = currentLocation;
      currentLocation = getRandomLocation();
      console.log(`\nYou go ${action} and arrive at ${currentLocation.name}...`);
    } else {
      console.log("Unknown direction. Please choose: left, right, forward, backward, or leave.");
    }
  }

  state.rl.prompt();
}

// List of possible locations
const POSSIBLE_LOCATIONS: LocationNode[] = [
  { name: "Eterna Forest", slug: "eterna-forest-area" },
  { name: "Ravaged Path", slug: "ravaged-path-area" },
  { name: "Mt. Coronet 1F", slug: "mt-coronet-1f-route-207" },
  { name: "Great Marsh", slug: "great-marsh-area-1" },
  { name: "Valley Windworks", slug: "valley-windworks-area" },
  { name: "Lake Acuity", slug: "lake-acuity-area" },
  { name: "Fuego Ironworks", slug: "fuego-ironworks-area" },
  { name: "Celestic Town", slug: "celestic-town-area" },
  { name: "Johto Route 42", slug: "johto-route-42-area" },
  { name: "Dragons Den", slug: "dragons-den-area" },
  { name: "Cianwood City", slug: "cianwood-city-area" },
  { name: "Viridian City", slug: "viridian-city-area" },
  { name: "Celadon City", slug: "celadon-city-area" },
  { name: "Kanto Route 1", slug: "kanto-route-1-area" },
  { name: "Kanto Route 2", slug: "kanto-route-2-south-towards-viridian-city" },
  { name: "Kanto Route 3", slug: "kanto-route-3-area" },
  { name: "Kanto Route 4", slug: "kanto-route-4-area" },
  { name: "Kanto Route 5", slug: "kanto-route-5-area" },
  { name: "Kanto Route 6", slug: "kanto-route-6-area" },
  { name: "Kanto Route 7", slug: "kanto-route-7-area" },
  { name: "Fuchsia City", slug: "fuchsia-city-area" },
];

function getRandomLocation(): LocationNode {
  const randomIndex = Math.floor(Math.random() * POSSIBLE_LOCATIONS.length);
  return POSSIBLE_LOCATIONS[randomIndex];
}

// Helper to get user input
function getUserChoice(rl: any): Promise<string> {
  return new Promise((resolve) => {
    rl.question("> ", (answer: string) => {
      resolve(answer.trim());
    });
  });
}
