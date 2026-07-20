import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission with queue size check', () => {
  const testFile = path.join(__dirname, 'test-drain-final.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
    if (db) {
      db.close();
    }
  });

  it('should emit drain when queue is empty after write operations', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      const drainListener = () => {
        drainCount++;
        // After all writes complete, we should get exactly one drain event
        // when the queue is empty
        if (drainCount === 1) {
          // The mutation changes the condition from `!this._queue.size` to `false`
          // which means drain will never fire when it should
          done();
        }
      };

      db.on('drain', drainListener);

      // Perform writes that should eventually empty the queue
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // At this point, the queue should be empty and drain should fire
        });
      });
    });

    // Timeout to prevent hanging if drain never fires (which would happen with mutation)
    setTimeout(() => {
      done(new Error('drain event never fired when queue became empty'));
    }, 1000);
  });
});