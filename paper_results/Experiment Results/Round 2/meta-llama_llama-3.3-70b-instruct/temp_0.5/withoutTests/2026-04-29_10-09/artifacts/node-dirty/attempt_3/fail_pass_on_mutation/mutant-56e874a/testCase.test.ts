import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should not write to disk when _waitForDrain is true and _queue.size is greater than 0', async () => {
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

    // Call _flush
    const originalWrite = dirty._writeStream.write;
    let writeCalled = false;
    dirty._writeStream.write = () => {
      writeCalled = true;
    };

    dirty._flush();

    // Check if write was called
    expect(writeCalled).toBe(false);

    // Restore original write method
    dirty._writeStream.write = originalWrite;

    // Clean up
    rimraf.sync(dbPath);
  });
});