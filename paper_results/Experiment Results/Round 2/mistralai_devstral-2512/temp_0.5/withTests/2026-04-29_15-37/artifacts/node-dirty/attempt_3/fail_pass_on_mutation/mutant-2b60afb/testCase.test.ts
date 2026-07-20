import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission with queue size condition', () => {
  const testFile = path.join(__dirname, 'test-drain-queue.dirty');
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

  it('should emit drain when queue is empty after multiple writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      const drainListener = () => {
        if (drainFired) return;
        drainFired = true;
        db.removeListener('drain', drainListener);
        // Verify the queue is actually empty
        const queueSize = (db as any)._queue.size;
        if (queueSize !== 0) {
          done(new Error(`Expected queue size to be 0, got ${queueSize}`));
          return;
        }
        done();
      };

      db.on('drain', drainListener);

      // Perform multiple writes that should empty the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');
    });
  });
});