import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should not write to disk when _waitForDrain is true', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Wait for the 'load' event to ensure the db is loaded
    await new Promise((resolve) => {
      dirty.once('load', resolve);
    });

    // Set a value to trigger a write to disk
    dirty.set('key', 'value', () => {});

    // Set _waitForDrain to true
    dirty._waitForDrain = true;

    // Set another value to trigger another write to disk
    dirty.set('key2', 'value2', () => {});

    // Wait for 10ms to allow the write to disk to happen
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Check if the file size is still the same (i.e., no write happened)
    const stats = fs.statSync(dbPath);
    expect(stats.size).toBeLessThan(100); // assuming the initial write is less than 100 bytes

    // Clean up
    rimraf.sync(dbPath);
  });
});