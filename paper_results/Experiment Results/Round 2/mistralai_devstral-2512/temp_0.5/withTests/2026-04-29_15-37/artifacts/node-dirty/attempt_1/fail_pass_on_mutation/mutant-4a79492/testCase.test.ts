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

  it('should emit drain event when queue is empty after write', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure the queue is populated
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Track drain events
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, verify the file was written correctly
          const contents = fs.readFileSync(testFile, 'utf-8');
          const lines = contents.trim().split('\n');
          expect(lines.length).toBe(2);

          // Set another value to trigger another flush
          db.set('key3', 'value3');
        } else if (drainCount === 2) {
          // Verify the mutation doesn't cause incorrect drain events
          const contents = fs.readFileSync(testFile, 'utf-8');
          const lines = contents.trim().split('\n');
          expect(lines.length).toBe(3);
          done();
        }
      });
    });
  });
});