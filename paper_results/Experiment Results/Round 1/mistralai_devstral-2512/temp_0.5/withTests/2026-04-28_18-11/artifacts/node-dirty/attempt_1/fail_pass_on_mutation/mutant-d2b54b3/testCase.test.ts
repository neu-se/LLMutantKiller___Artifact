import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission test', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when all writes complete and queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Write multiple values to ensure we have in-flight writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Wait for drain event
      db.on('drain', () => {
        // Verify the drain event was emitted
        expect(true).toBe(true);
        done();
      });
    });
  });
});