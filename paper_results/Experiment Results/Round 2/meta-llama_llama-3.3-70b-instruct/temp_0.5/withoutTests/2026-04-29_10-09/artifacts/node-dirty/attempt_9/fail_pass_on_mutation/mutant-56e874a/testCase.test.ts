import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should not write to disk when _queue.size is 0', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Wait for the 'load' event to ensure the db is loaded
    await new Promise((resolve) => {
      dirty.once('load', resolve);
    });

    // Clear the queue
    dirty._queue.clear();

    // Call _flush
    const originalFlush = dirty._flush;
    let flushCalled = false;
    dirty._flush = () => {
      flushCalled = true;
      originalFlush.call(dirty);
    };

    dirty._flush();

    // Check if flush completed
    expect(flushCalled).toBe(true);

    // Check if _flush returned immediately
    if (dirty._writeStream) {
      const originalWrite = dirty._writeStream.write;
      let writeCalled = false;
      dirty._writeStream.write = () => {
        writeCalled = true;
      };
      dirty._flush();
      expect(writeCalled).toBe(false);
      dirty._writeStream.write = originalWrite;
    }

    // Restore original flush method
    dirty._flush = originalFlush;

    // Clean up
    fs.unlinkSync(dbPath);
  });
});