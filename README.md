# Pokédex CLI

A fully functional **Pokémon Command-Line Interface** built with TypeScript and Node.js. 
This interactive terminal application lets you explore the Pokémon world using real data from the [PokeAPI](https://pokeapi.co/), catch Pokémon, build your own Pokédex, and inspect their stats, all from the comfort of your terminal.
Built as a learning project to practice async programming, API integration, caching, pagination, and TypeScript.

### Features

- **Interactive REPL** - with a clean green prompt
- **Smart caching system** – subsequent requests are blazing fast 🔥
- **Pagination support** - for exploring the world
- **Real Pokémon data** - powered by PokeAPI
- **Catch mechanics** - based on base experience (the harder the Pokémon, the lower the catch rate)
- **Battle Simulation** - simulate battles between two Pokemon in a intense turn-based fight
- **Persistent Pokédex** – keep track of all Pokémon you've caught during the session
- **Inventory System** – Use your coins to buy items and use them in your journey

### Available Commands

| Command              | Description                                       | Usage                                         |
|----------------------|---------------------------------------------------|-----------------------------------------------|
| `battle`             | Battle a wild Pokemon using yours.                | `battle <my-pokemon> <enemy-pokemon>`         |
| `buy`                | Buy items to aid you in your journey.             | `buy`         |
| `catch <pokemon>`    | Try to catch a Pokémon (chance based on stats)    | `catch <pokemon>`                             |
| `check <area>`       | Check a location and list Pokémon that live there | `check eterna-city-area`                 |
| `exit`               | Exit the application and saves the progress       | `exit`                                        |
| `explore`            | Explore the Pokemon World by choosing from numbered locations. | `explore`                 |
| `evolve`             | Evolve a Pokemon using a Evolution Stone.         | `evolve <pokemon>`                 |
| `help`               | Show all available commands                       | `help`                                        |
| `inspect <pokemon>`  | View detailed stats of a caught Pokémon           | `inspect <pokemon>`                           |
| `map`                | Show next 20 location areas                       | `map`                                         |
| `mapb`               | Go back to previous 20 locations                  | `mapb`                                        |
| `party`              | Make a party with 3 of your caught Pokemon.       | `party <pokemon1> <pokemon2> <pokemon3>`      |
| `pokedex`            | Display all Pokémon you've caught                 | `pokedex`                                     |

### Example Usage

```bash
Pokedex > map
Pokedex > explore pastoria-city-area
Pokedex > catch magikarp
Pokedex > inspect magikarp
Pokedex > pokedex
```

### Techonologies Used

- TypeScript
- Node.js + Readline
- Fetch API
- Vitest (for testing)
- PokeAPI

### Clone the repository

```bash
git clone https://github.com/Abezzi/pokedex.git
cd pokedex
```

### Install dependencies

```bash
npm install
```

### Run the Pokedex CLI

```bash
npm run dev
```

This will start the interactive terminal. You should see a green prompt like this:

```bash
Pokedex >
```

### Test

```bash
npm run test
```
