import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should not flush the queue when _queue.size is 0', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Wait for the 'load' event to ensure the db is loaded
    await new Promise((resolve) => {
      dirty.once('load', resolve);
    });

    // Set _queue.size to 0
    dirty._queue.clear();

    // Set _waitForDrain to false
    dirty._waitForDrain = false;

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