import fs from 'fs/promises';
import path from 'path';

const SAVE_FILE = path.join(process.cwd(), 'save.json');

export type SavedData = {
  pokedex: Record<string, any>;
  party: Record<string, any[]>;
  items: Record<string, number>;
  coins: number;
};

export async function saveProgress(pokedex: Record<string, any>, party: Record<string, any[]>, coins: number, items: Record<string, number>): Promise<void> {
  try {
    const data: SavedData = { pokedex, party, coins, items };
    await fs.writeFile(SAVE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log("💾 Progress saved successfully!");
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

export async function loadProgress(): Promise<SavedData | null> {
  try {
    const data = await fs.readFile(SAVE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null; // file doesn't exist yet, first time running
    }
    console.error("Failed to load progress:", error);
    return null;
  }
}
