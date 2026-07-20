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

  it('should properly handle backpressure during concurrent writes', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create a scenario where multiple writes happen while buffer is full
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3', 'key4', 'key5'];
      let writeCount = 0;
      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
      });

      // Write multiple large values in quick succession
      keys.forEach((key, index) => {
        db.set(key, largeValue, (err) => {
          writeCount++;
          if (err) return done(err);

          // After all writes are complete
          if (writeCount === keys.length) {
            setTimeout(() => {
              // Verify all values were written exactly once
              const content = fs.readFileSync(testFile, 'utf-8');
              const lines = content.trim().split('\n');
              const keyCounts = new Map<string, number>();

              lines.forEach(line => {
                try {
                  const entry = JSON.parse(line);
                  keyCounts.set(entry.key, (keyCounts.get(entry.key) || 0) + 1);
                } catch (e) {
                  // Ignore parse errors
                }
              });

              // Check for duplicate entries (which would occur in mutated version)
              let hasDuplicates = false;
              keyCounts.forEach(count => {
                if (count > 1) hasDuplicates = true;
              });

              if (hasDuplicates) {
                done(new Error('Duplicate entries detected - mutation not breaking loop'));
              } else if (keyCounts.size !== keys.length) {
                done(new Error(`Expected ${keys.length} keys but got ${keyCounts.size}`));
              } else {
                done();
              }
            }, 300);
          }
        });
      });
    });
  });
});