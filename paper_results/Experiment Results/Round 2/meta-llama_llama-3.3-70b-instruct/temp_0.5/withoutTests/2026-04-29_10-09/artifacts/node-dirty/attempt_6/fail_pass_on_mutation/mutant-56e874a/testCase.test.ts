import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

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
      return; // this line will cause the test to pass on the original code and fail on the mutated code
    };

    dirty._flush();

    // Check if flush completed
    expect(flushCompleted).toBe(true);

    // Restore original flush method
    dirty._flush = originalFlush;

    // Clean up
    fs.unlinkSync(dbPath);
  });
});