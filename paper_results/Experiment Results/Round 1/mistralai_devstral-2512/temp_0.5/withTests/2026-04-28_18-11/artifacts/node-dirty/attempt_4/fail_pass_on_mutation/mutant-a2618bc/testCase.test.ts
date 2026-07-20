import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant test for _flush break condition', () => {
  const testFile = path.join(__dirname, 'test-flush-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should properly handle backpressure during flush', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create a scenario where _waitForDrain becomes true during flush
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3', 'key4', 'key5'];
      let completed = 0;

      // Set multiple large values to trigger backpressure
      keys.forEach((key, index) => {
        db.set(key, largeValue, (err) => {
          completed++;
          if (err) return done(err);

          // After all sets are called, verify the file
          if (completed === keys.length) {
            setTimeout(() => {
              const content = fs.readFileSync(testFile, 'utf-8');
              const lines = content.trim().split('\n');
              const uniqueKeys = new Set(lines.map(line => {
                try {
                  return JSON.parse(line).key;
                } catch (e) {
                  return null;
                }
              }).filter(k => k !== null));

              if (uniqueKeys.size !== keys.length) {
                done(new Error(`Expected ${keys.length} unique keys but got ${uniqueKeys.size}`));
              } else {
                done();
              }
            }, 200);
          }
        });
      });
    });
  });
});