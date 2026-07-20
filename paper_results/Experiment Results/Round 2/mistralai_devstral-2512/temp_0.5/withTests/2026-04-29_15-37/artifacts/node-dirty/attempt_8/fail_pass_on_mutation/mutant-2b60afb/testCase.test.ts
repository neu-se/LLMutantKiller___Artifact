import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with queue size condition', () => {
  const testFile = path.join(__dirname, 'test-drain-final.dirty');

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

  it('should emit drain when queue is empty after write operations', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      const drainListener = () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify the queue is empty
          const queueSize = (db as any)._queue.size;
          if (queueSize !== 0) {
            done(new Error(`Expected queue size to be 0, got ${queueSize}`));
            return;
          }
          db.removeListener('drain', drainListener);
          done();
        }
      };

      db.on('drain', drainListener);

      // Perform multiple writes that should empty the queue
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // The drain event should fire exactly once when queue becomes empty
          // The mutation changes the condition from `!this._queue.size` to `false`
          // which would prevent drain from firing when it should
        });
      });
    });
  });
});