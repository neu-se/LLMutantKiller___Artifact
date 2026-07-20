import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-b3ca093', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should process queued writes when waitForDrain becomes false', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create a scenario where we have queued writes and waitForDrain is true
      // First write a large value to trigger backpressure
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
      db.set('largeKey', largeValue, () => {
        // Now queue another write while the previous write is still in flight
        // This creates the condition where _queue.size > 0 and _waitForDrain is true
        db.set('key1', 'value1');

        // The original code should process this when _waitForDrain becomes false
        // The mutated code will incorrectly skip it due to the && condition
        setTimeout(() => {
          const db2 = new Dirty(testFile);
          db2.on('load', () => {
            try {
              // In the original code, both keys should be present
              // In the mutated code, key1 might be missing
              expect(db2.size()).toBe(2);
              expect(db2.get('largeKey')).toBe(largeValue);
              expect(db2.get('key1')).toBe('value1');
              done();
            } catch (err) {
              done(err);
            }
          });
        }, 100);
      });
    });
  });
});