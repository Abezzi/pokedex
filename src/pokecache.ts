export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  // when to clean up old entries
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  // interval of time in miliseccond
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val,
    });
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (!entry) return undefined;

    // Optional: you can refresh the timestamp here if you want LRU-like behavior
    // entry.createdAt = Date.now(); // uncomment if desired

    return entry.val as T;
  }

  #reap(): void {
    const now = Date.now();
    const cutoff = now - this.#interval;

    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt <= cutoff) {
        this.#cache.delete(key);
      }
    }
  }

  // calls reapInterval after a delay
  #startReapLoop(): void {
    if (this.#reapIntervalId) return; // already running

    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  // changes reapIntervalId to undefined if it is not already undefined
  stopReapLoop(): void {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
