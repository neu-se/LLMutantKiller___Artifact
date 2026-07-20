import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-4a79492', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should only emit drain when queue is empty and no writes are in flight', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value that will trigger a write
      db.set('key1', 'value1');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Immediately set another value while the queue is empty
          // This should not trigger another drain until the write completes
          db.set('key2', 'value2');

          // The mutation would incorrectly emit drain here
          setImmediate(() => {
            if (drainCount > 1) {
              done(new Error('Unexpected drain event'));
            } else {
              // Wait a bit to ensure no extra drain events occur
              setTimeout(() => {
                expect(drainCount).toBe(1);
                done();
              }, 10);
            }
          });
        }
      });
    });
  });
});