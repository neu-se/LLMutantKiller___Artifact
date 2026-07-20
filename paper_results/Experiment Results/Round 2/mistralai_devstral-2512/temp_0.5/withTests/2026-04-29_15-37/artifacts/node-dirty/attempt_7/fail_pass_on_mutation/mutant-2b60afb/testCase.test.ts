import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with queue size check', () => {
  const testFile = path.join(__dirname, 'test-drain-queue-size.dirty');

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

  it('should emit drain event when queue becomes empty after writes', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      const drainListener = () => {
        if (drainFired) return;
        drainFired = true;
        db.removeListener('drain', drainListener);

        // Verify the queue is actually empty by checking internal state
        const queueSize = (db as any)._queue.size;
        if (queueSize !== 0) {
          done(new Error(`Expected queue size to be 0, got ${queueSize}`));
          return;
        }

        done();
      };

      db.on('drain', drainListener);

      // Perform writes that should empty the queue
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // At this point, the queue should be empty
          // The mutation changes the condition from checking queue size to always false
          // which would prevent drain from firing when it should
        });
      });
    });
  });
});