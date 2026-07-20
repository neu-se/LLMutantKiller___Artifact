import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with queue size condition', () => {
  const testFile = path.join(__dirname, 'test-drain-condition.dirty');

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
      let drainCount = 0;
      const drainListener = () => {
        drainCount++;
        if (drainCount === 2) {
          db.removeListener('drain', drainListener);
          done();
        }
      };

      db.on('drain', drainListener);

      // First write
      db.set('key1', 'value1', () => {
        // Second write that should trigger drain when queue is empty
        db.set('key2', 'value2', () => {
          // The mutation changes the condition from checking queue size to always false
          // This should prevent the second drain event from firing
        });
      });
    });
  });
});