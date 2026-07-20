import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant test for _flush break condition', () => {
  const testFile = path.join(__dirname, 'test-flush.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should properly handle multiple writes when buffer is full', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Set up a scenario where we need multiple flushes
      // by writing enough data to potentially fill the buffer
      const largeValue = 'x'.repeat(10000);
      const keys = ['key1', 'key2', 'key3', 'key4', 'key5'];
      let completed = 0;

      keys.forEach((key, index) => {
        db.set(key, largeValue, (err) => {
          if (err) {
            done(err);
            return;
          }
          completed++;

          // Check if all writes are done
          if (completed === keys.length) {
            // Verify all values were written correctly
            let allCorrect = true;
            keys.forEach(k => {
              if (db.get(k) !== largeValue) {
                allCorrect = false;
              }
            });

            if (allCorrect) {
              // Verify the file contains all entries
              const content = fs.readFileSync(testFile, 'utf-8');
              const lines = content.trim().split('\n');
              if (lines.length === keys.length) {
                done();
              } else {
                done(new Error(`Expected ${keys.length} lines but got ${lines.length}`));
              }
            } else {
              done(new Error('Not all values were written correctly'));
            }
          }
        });
      });
    });
  });
});