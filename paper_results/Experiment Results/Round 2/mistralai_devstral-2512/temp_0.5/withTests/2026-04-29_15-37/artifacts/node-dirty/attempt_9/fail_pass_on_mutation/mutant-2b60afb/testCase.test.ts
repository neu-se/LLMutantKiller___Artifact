import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with queue size check', () => {
  const testFile = path.join(__dirname, 'test-drain-mutation.dirty');

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

  it('should emit drain when queue is empty after multiple writes', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      const drainListener = () => {
        if (drainFired) return;
        drainFired = true;
        db.removeListener('drain', drainListener);
        done();
      };

      db.on('drain', drainListener);

      // Perform writes that should empty the queue
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // Force a check of the drain condition by manually triggering the write stream drain
          // This will expose the mutation where the condition is changed from checking queue size to always false
          (db as any)._writeStream.emit('drain');
        });
      });
    });
  });
});