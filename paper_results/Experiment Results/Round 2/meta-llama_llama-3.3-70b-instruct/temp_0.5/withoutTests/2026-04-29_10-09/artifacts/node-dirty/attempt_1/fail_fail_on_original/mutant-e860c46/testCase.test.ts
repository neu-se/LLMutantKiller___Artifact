import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { rimraf } from 'rimraf';

const rm = promisify(rimraf);

describe('Dirty', () => {
  it('should close correctly when there are in-flight writes', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Set a key to trigger a write
    dirty.set('key', 'value', () => {});

    // Close the dirty instance
    dirty.close();

    // Wait for the write to complete
    await new Promise((resolve) => {
      dirty.once('drain', resolve);
    });

    // Check if the file still exists
    expect(fs.existsSync(dbPath)).toBe(false);

    // Clean up
    await rm(dbPath);
  });
});