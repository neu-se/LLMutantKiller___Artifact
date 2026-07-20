import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event behavior', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when queue is empty after flush', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure the queue is populated
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Listen for drain event
      db.on('drain', () => {
        // Verify that the queue is empty after drain
        expect(db._queue.size).toBe(0);
        done();
      });
    });
  });
});