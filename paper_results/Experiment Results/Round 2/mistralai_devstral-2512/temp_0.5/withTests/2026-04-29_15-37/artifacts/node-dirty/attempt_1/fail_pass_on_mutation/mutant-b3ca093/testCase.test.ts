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

  it('should handle multiple rapid writes correctly', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Set up a scenario where the queue has items and _waitForDrain is true
      // This should trigger the flush logic
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Force _waitForDrain to be true by filling the write buffer
      // We'll write a large value to trigger backpressure
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
      db.set('largeKey', largeValue, (err) => {
        if (err) return done(err);

        // Now set another value while the previous write is still in flight
        // This should test the condition where _queue.size > 0 and _waitForDrain is true
        db.set('key4', 'value4', (err) => {
          if (err) return done(err);

          // Verify all values were written correctly
          setTimeout(() => {
            const db2 = new Dirty(testFile);
            db2.on('load', () => {
              try {
                expect(db2.get('key1')).toBe('value1');
                expect(db2.get('key2')).toBe('value2');
                expect(db2.get('key3')).toBe('value3');
                expect(db2.get('largeKey')).toBe(largeValue);
                expect(db2.get('key4')).toBe('value4');
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
});