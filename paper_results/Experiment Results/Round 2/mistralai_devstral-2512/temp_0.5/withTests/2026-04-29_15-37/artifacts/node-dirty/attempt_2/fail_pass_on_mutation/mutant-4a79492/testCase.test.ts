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

  it('should not emit drain when queue is not empty after write stream drains', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to fill the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // At this point, the queue should still have items
          // The mutation would incorrectly emit drain again
          setImmediate(() => {
            expect(drainCount).toBe(1);
            done();
          });
        } else {
          // This should never happen in the original code
          done(new Error('Unexpected drain event'));
        }
      });
    });
  });
});