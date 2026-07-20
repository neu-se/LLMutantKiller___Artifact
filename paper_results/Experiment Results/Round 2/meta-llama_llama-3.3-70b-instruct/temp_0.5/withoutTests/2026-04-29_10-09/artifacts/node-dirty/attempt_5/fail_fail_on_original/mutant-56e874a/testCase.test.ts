import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should return from _flush when _waitForDrain is true', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Wait for the 'load' event to ensure the db is loaded
    await new Promise((resolve) => {
      dirty.once('load', resolve);
    });

    // Set _waitForDrain to true
    dirty._waitForDrain = true;

    // Set a value to trigger a write to disk
    dirty.set('key', 'value', () => {});

    // Call _flush
    let flushCompleted = false;
    const originalFlush = dirty._flush;
    dirty._flush = () => {
      flushCompleted = true;
      originalFlush.call(dirty);
    };

    dirty._flush();

    // Check if flush completed
    expect(flushCompleted).toBe(false);

    // Restore original flush method
    dirty._flush = originalFlush;

    // Clean up
    rimraf.sync(dbPath);
  });
});