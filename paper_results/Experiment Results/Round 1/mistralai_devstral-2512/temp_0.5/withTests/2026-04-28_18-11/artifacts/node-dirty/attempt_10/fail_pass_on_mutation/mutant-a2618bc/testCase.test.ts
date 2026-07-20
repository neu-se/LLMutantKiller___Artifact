import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant test for _flush break condition', () => {
  const testFile = path.join(__dirname, 'test-flush-mutant.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should properly handle backpressure during flush', (done) => {
    db = new (require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js"))(testFile);

    db.on('load', () => {
      // Create a scenario where we can observe the break behavior
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3'];
      let drainEvents = 0;

      db.on('drain', () => {
        drainEvents++;
      });

      // First write to potentially fill the buffer
      db.set(keys[0], largeValue, (err: any) => {
        if (err) return done(err);

        // Queue additional writes while buffer might be full
        db.set(keys[1], largeValue);
        db.set(keys[2], largeValue);

        setTimeout(() => {
          // In original code: when _waitForDrain is true, loop breaks
          // In mutated code: loop never breaks (if (false) break)
          // This means mutated version will process all queued items in one flush
          // while original version might split them across multiple flushes

          // The key insight: original code should have more drain events
          // because it breaks the loop when _waitForDrain is true
          if (drainEvents < 2) {
            done(new Error(`Expected multiple drain events (got ${drainEvents}) - mutation preventing proper backpressure handling`));
          } else {
            done();
          }
        }, 300);
      });
    });
  });
});