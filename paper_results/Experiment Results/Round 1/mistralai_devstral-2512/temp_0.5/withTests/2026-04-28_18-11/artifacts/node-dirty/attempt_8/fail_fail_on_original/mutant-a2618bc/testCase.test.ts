import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant test for _flush break condition', () => {
  const testFile = path.join(__dirname, 'test-flush-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should properly handle backpressure during flush', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create a scenario where _waitForDrain becomes true
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3', 'key4', 'key5'];
      let writeCount = 0;
      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
      });

      // Write multiple large values in quick succession
      keys.forEach((key, index) => {
        db.set(key, largeValue, (err) => {
          writeCount++;
          if (err) return done(err);

          // After all writes are complete
          if (writeCount === keys.length) {
            setTimeout(() => {
              // Verify the number of drain events
              // In original code: should have multiple drain events due to backpressure
              // In mutated code: might have fewer drain events since loop doesn't break
              if (drainCount < 2) {
                done(new Error(`Expected multiple drain events (got ${drainCount}) - mutation preventing proper backpressure handling`));
              } else {
                done();
              }
            }, 300);
          }
        });
      });
    });
  });
});