import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('write stream drain handling', () => {
  const testFile = path.join(__dirname, 'test-drain-handling.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should properly handle drain event when write buffer is full', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force backpressure by writing large amount of data
      const largeData = 'x'.repeat(10000);
      for (let i = 0; i < 50; i++) {
        db.set(`large_key_${i}`, largeData);
      }

      let drainFired = false;
      db.on('drain', () => {
        if (!drainFired) {
          drainFired = true;
          // Verify the drain event was properly handled
          expect(db.get('large_key_25')).toBe(largeData);
          expect(db.size()).toBe(50);
          done();
        }
      });

      // If drain doesn't fire within 2 seconds, fail the test
      setTimeout(() => {
        if (!drainFired) {
          done(new Error('Drain event never fired'));
        }
      }, 2000);
    });
  });
});