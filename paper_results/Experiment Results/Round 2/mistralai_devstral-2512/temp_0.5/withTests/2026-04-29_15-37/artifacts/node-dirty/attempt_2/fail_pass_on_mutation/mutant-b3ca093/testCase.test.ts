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

  it('should properly handle flush when queue has items and waitForDrain is true', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Set up a scenario where we have multiple writes queued
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Force _waitForDrain to be true by writing a large value
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
      db.set('largeKey', largeValue);

      // Immediately queue another write while the large write is in progress
      // This creates the condition where _queue.size > 0 and _waitForDrain is true
      db.set('key3', 'value3');

      // The original code should process this queue item when _waitForDrain becomes false
      // The mutated code will incorrectly skip it due to the && condition

      setTimeout(() => {
        const db2 = new Dirty(testFile);
        db2.on('load', () => {
          try {
            // In the original code, all 4 keys should be present
            // In the mutated code, key3 might be missing because the flush was skipped
            expect(db2.size()).toBe(4);
            expect(db2.get('key1')).toBe('value1');
            expect(db2.get('key2')).toBe('value2');
            expect(db2.get('largeKey')).toBe(largeValue);
            expect(db2.get('key3')).toBe('value3');
            done();
          } catch (err) {
            done(err);
          }
        });
      }, 200);
    });
  });
});