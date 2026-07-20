import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event behavior with queue processing', () => {
  const testFile = path.join(__dirname, 'test-drain-queue.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not emit drain event prematurely when queue still has items', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to fill the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        // In the original code, drain should only fire once after all writes complete
        // In the mutated code (if true), it will fire prematurely
        if (drainCount > 1) {
          done.fail('Drain event fired multiple times prematurely');
        }
      });

      // Wait a bit to ensure all writes are processed
      setTimeout(() => {
        expect(drainCount).toBe(1);
        done();
      }, 100);
    });
  });
});