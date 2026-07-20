import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with queue size condition', () => {
  const testFile = path.join(__dirname, 'test-drain-queue-empty.dirty');

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

  it('should emit drain when queue becomes empty after writes', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      const drainListener = () => {
        if (drainFired) return;
        drainFired = true;
        db.removeListener('drain', drainListener);

        // Verify the queue is actually empty
        const queueSize = (db as any)._queue.size;
        const inFlightWrites = (db as any)._inFlightWrites;
        if (queueSize !== 0 || inFlightWrites !== 0) {
          done(new Error(`Expected queue size and inFlightWrites to be 0, got queueSize=${queueSize}, inFlightWrites=${inFlightWrites}`));
          return;
        }

        done();
      };

      db.on('drain', drainListener);

      // Perform writes that should empty the queue
      db.set('key1', 'value1', () => {
        // The mutation changes the condition from checking queue size to always false
        // This should prevent drain from firing when it should
        setImmediate(() => {
          if (!drainFired) {
            done(new Error('drain event never fired when queue became empty'));
          }
        });
      });
    });
  });
});