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

  it('should correctly handle flush when queue has items and waitForDrain transitions from true to false', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create backpressure by writing a large value
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
      db.set('largeKey', largeValue, () => {
        // Queue multiple writes while backpressure is still active
        db.set('key1', 'value1');
        db.set('key2', 'value2');

        // Force another write that will trigger the flush condition
        db.set('key3', 'value3');

        // The original code should process all queued writes
        // The mutated code will skip processing when _waitForDrain becomes false
        setTimeout(() => {
          const db2 = new Dirty(testFile);
          db2.on('load', () => {
            try {
              // Verify all writes completed
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
        }, 100);
      });
    });
  });
});