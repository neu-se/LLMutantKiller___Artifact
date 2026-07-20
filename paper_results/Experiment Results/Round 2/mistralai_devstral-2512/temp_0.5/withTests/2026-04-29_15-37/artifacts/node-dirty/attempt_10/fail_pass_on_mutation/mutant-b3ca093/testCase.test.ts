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

  it('should flush queue when waitForDrain becomes false', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create a scenario where we have queued writes and waitForDrain is true
      // First write a large value to trigger backpressure
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
      db.set('largeKey', largeValue);

      // Queue writes while backpressure is active
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Track drain events to know when backpressure is released
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // At this point _waitForDrain should have become false
          // Queue another write to test the flush condition
          db.set('key3', 'value3');

          // The original code should process this write immediately
          // The mutated code will skip it due to the && condition
          setTimeout(() => {
            const db2 = new Dirty(testFile);
            db2.on('load', () => {
              try {
                // Original code should have all 4 keys
                // Mutated code will be missing key3
                expect(db2.size()).toBe(4);
                expect(db2.get('largeKey')).toBe(largeValue);
                expect(db2.get('key1')).toBe('value1');
                expect(db2.get('key2')).toBe('value2');
                expect(db2.get('key3')).toBe('value3');
                done();
              } catch (err) {
                done(err);
              }
            });
          }, 50);
        }
      });
    });
  });
});