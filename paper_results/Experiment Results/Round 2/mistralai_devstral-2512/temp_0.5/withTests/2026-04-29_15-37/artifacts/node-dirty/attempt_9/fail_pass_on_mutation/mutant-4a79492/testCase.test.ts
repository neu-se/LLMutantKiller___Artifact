import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-4a79492', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  let db: any;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should only emit drain when queue is empty after write stream drains', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to fill the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Check if queue is empty (should be true for first drain)
          const queueSize = db._queue.size;
          if (queueSize === 0) {
            // Force the write stream to drain by manually calling _flush
            // This simulates the condition where the mutation would incorrectly emit drain
            db._flush();

            // The mutation would incorrectly emit drain again
            setImmediate(() => {
              if (drainCount > 1) {
                done(new Error('Unexpected drain event when queue is empty'));
              } else {
                done();
              }
            });
          } else {
            done(new Error('Queue should be empty on first drain'));
          }
        } else {
          done(new Error('Unexpected drain event'));
        }
      });
    });
  });
});