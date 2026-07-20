import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should handle chunks without newline characters correctly', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Write a chunk without a newline character to the database file
    fs.writeFileSync(dbPath, 'key1{"key":"key1","val":"val1"}');

    // Wait for the 'load' event to ensure the chunk is processed
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve();
      });
    });

    // Check if the data is loaded correctly
    expect(dirty.get('key1')).toBe('val1');

    // Clean up
    rimraf.sync(dbPath);
  });
});