import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event behavior', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when queue is empty after write', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure the queue is processed
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify the drain event was emitted
          expect(drainCount).toBe(1);
          done();
        }
      });
    });
  });
});