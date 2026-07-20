import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should handle chunks without newline correctly', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Wait for the database to load
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve(true);
      });
    });

    // Write a chunk with a newline
    fs.appendFileSync(dbPath, '{"key":"value"}\n');

    // Wait for the chunk to be processed
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve(true);
      });
    });

    // Check if the data is loaded correctly
    expect(dirty.get('key')).toBe('value');

    // Write a chunk without a newline
    fs.appendFileSync(dbPath, '{"key2":"value2"');

    // Wait for 10ms to ensure the chunk is processed
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 10);
    });

    // Check if the data is loaded correctly
    expect(dirty.get('key2')).toBe('value2');

    // Clean up
    fs.unlinkSync(dbPath);
  });
});