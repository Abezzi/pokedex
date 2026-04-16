import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Cache } from "../src/pokecache.js";

describe('Cache', () => {
  let cache: Cache;

  beforeEach(() => {
    // Use a short interval for testing
    cache = new Cache(100); // 100ms
  });

  afterEach(() => {
    cache.stopReapLoop();
  });

  it('should store and retrieve values', () => {
    cache.add('test-key', { name: 'Pikachu' });
    const result = cache.get<{ name: string }>('test-key');
    expect(result).toEqual({ name: 'Pikachu' });
  });

  it('should return undefined for missing keys', () => {
    expect(cache.get('non-existent')).toBeUndefined();
  });

  it.concurrent('should reap old entries after interval', async () => {
    cache.add('old-key', { data: 123 });

    // Wait a bit longer than the interval
    await new Promise((r) => setTimeout(r, 150));

    const result = cache.get('old-key');
    expect(result).toBeUndefined();
  });
});
