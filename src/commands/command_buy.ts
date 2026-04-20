import { type State } from "../state.js";

type ShopItem = {
  name: string;
  displayName: string;
  price: number;
};

const SHOP_ITEMS: ShopItem[] = [
  { name: "pokeball", displayName: "PokéBall", price: 200 },
  { name: "greatball", displayName: "Great Ball", price: 600 },
  { name: "ultraball", displayName: "Ultra Ball", price: 1200 },
  { name: "evolution-stone", displayName: "Evolution Stone", price: 1000 },
  { name: "potion", displayName: "Potion", price: 300 },
];

export async function commandBuy(state: State): Promise<void> {
  console.log("🏪 Welcome to PokeMart.")

  while (true) {
    console.log("Available items:");

    SHOP_ITEMS.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.displayName} - ${item.price} coins`);
    });

    console.log("  0. Leave the PokeMart\n");

    const choice = await getUserChoice(state.rl);

    if (!choice) {
      console.log("Invalid input.");
      continue;
    }

    const action = choice.toLowerCase().trim();

    if (action === "0") {
      console.log("\nYou left the PokeMart.");
      break;
    }

    // if doesn't select a valid option
    const selectedIndex = parseInt(action) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= SHOP_ITEMS.length) {
      console.log("Invalid choice. Please try again.");
      continue;
    }

    const selectedItem = SHOP_ITEMS[selectedIndex];

    // check if player has enough coins
    if (state.coins < selectedItem.price) {
      console.log(`You don't have enough coins. You have ${state.coins} coins.`);
      continue;
    }

    console.log(`\nHow many ${selectedItem.displayName}s would you like to buy?`);
    const amountStr = await getUserChoice(state.rl);
    const amount = parseInt(amountStr);

    if (isNaN(amount) || amount <= 0) {
      console.log("Invalid amount.");
      continue;
    }

    const totalCost = selectedItem.price * amount;

    if (state.coins < totalCost) {
      console.log(`Not enough coins! You need ${totalCost} coins.`);
      continue;
    }

    if (!state.items[selectedItem.name]) {
      state.items[selectedItem.name] = 0;
    }

    state.items[selectedItem.name] += amount;
    state.coins -= totalCost;

    console.log(`✅ Purchased ${amount} × ${selectedItem.displayName} for ${totalCost} coins.`);
    console.log(`You now have ${state.coins} coins remaining.\n`);
  }

  // return to normal prompt
  state.rl.prompt();
}

// helper to get user input
function getUserChoice(rl: any): Promise<string> {
  return new Promise((resolve) => {
    rl.question("> ", (answer: string) => {
      resolve(answer.trim());
    });
  });
}
