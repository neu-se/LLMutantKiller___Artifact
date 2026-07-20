import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should handle chunks without newline correctly', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve();
      });
    });

    // Write a chunk without a newline
    fs.appendFileSync(dbPath, '{"key":"value"}');

    // Wait for the chunk to be processed
    await new Promise((resolve) => {
      dirty.once('load', () => {
        resolve();
      });
    });

    // Check if the data is loaded correctly
    expect(dirty.get('key')).toBe('value');

    // Clean up
    rimraf.sync(dbPath);
  });
});