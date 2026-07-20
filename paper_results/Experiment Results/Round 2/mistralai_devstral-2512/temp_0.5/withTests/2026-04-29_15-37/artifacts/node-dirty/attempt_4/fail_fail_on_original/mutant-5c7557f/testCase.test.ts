import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission after write stream drain', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  it('should emit drain event when write stream drains with empty queue', (done) => {
    const db = new Dirty(testFile);
    let drainCount = 0;

    db.on('load', () => {
      // Set a value that will trigger a write
      db.set('key1', 'value1', () => {
        // Force the write stream to drain by writing enough data
        // to fill the buffer and trigger backpressure
        const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
        db.set('key2', largeValue);

        // Listen for drain events
        db.on('drain', () => {
          drainCount++;

          // The first drain should occur after the large write completes
          // and the queue becomes empty
          if (drainCount === 1) {
            // Verify the data was written correctly
            const data = fs.readFileSync(testFile, 'utf-8');
            const lines = data.trim().split('\n');
            expect(lines.length).toBe(2);

            // Now set another value to test the drain logic again
            db.set('key3', 'value3');

            // The second drain should occur after this write completes
            // This is where the mutation will fail because the empty else block
            // won't properly trigger _flush() when queue is empty after drain
          } else if (drainCount === 2) {
            done();
          }
        });
      });
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      throw new Error('Test timed out - drain event not emitted as expected');
    }, 5000);
  });
});