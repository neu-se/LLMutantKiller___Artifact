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

  it('should flush queued writes when waitForDrain becomes false', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create a scenario where we have multiple writes queued
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Force _waitForDrain to be true by writing a large value
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
      db.set('largeKey', largeValue);

      // Queue another write while the large write is in progress
      db.set('key3', 'value3');

      // Track drain events
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, verify all writes completed
          setTimeout(() => {
            const db2 = new Dirty(testFile);
            db2.on('load', () => {
              try {
                // Original code should have all 4 keys
                // Mutated code will miss key3 because flush was skipped
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
          }, 50);
        }
      });
    });
  });
});