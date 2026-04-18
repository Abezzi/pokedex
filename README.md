# Pokedex CLI

A fully functional **Pokémon Command-Line Interface** built with TypeScript and Node.js. 
This interactive terminal application lets you explore the Pokémon world using real data from the [PokeAPI](https://pokeapi.co/), catch Pokémon, build your own Pokédex, and inspect their stats — all from the comfort of your terminal.
Built as a learning project to practice async programming, API integration, caching, pagination, and TypeScript.

### Features

- **Interactive REPL** with a clean green prompt
- **Smart caching system** – subsequent requests are blazing fast 🔥
- **Pagination support** for exploring the world
- **Real Pokémon data** powered by PokeAPI
- **Catch mechanics** based on base experience (the harder the Pokémon, the lower the catch rate)
- **Persistent Pokédex** – keep track of all Pokémon you've caught during the session

### Available Commands

| Command              | Description                                      | Usage                          |
|----------------------|--------------------------------------------------|--------------------------------|
| `help`               | Show all available commands                      | `help`                         |
| `map`                | Show next 20 location areas                      | `map`                          |
| `mapb`               | Go back to previous 20 locations                 | `mapb`                         |
| `explore <area>`     | Explore a location and list Pokémon that live there | `explore eterna-city-area`    |
| `catch <pokemon>`    | Try to catch a Pokémon (chance based on stats)   | `catch pikachu`                |
| `inspect <pokemon>`  | View detailed stats of a caught Pokémon          | `inspect pidgey`               |
| `pokedex`            | Display all Pokémon you've caught                | `pokedex`                      |
| `exit`               | Exit the application                             | `exit`                         |

### Example Usage

```bash
Pokedex > map
Pokedex > explore pastoria-city-area
Pokedex > catch magikarp
Pokedex > inspect magikarp
Pokedex > pokedex
```

### Techonologies Used

Technologies Used

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
