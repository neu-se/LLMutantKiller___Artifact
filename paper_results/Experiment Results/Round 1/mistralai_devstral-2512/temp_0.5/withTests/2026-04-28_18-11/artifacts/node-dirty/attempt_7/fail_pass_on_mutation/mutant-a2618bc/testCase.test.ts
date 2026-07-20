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

  it('should break flush loop when waitForDrain is true', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Create a scenario where _waitForDrain becomes true during flush
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3'];

      // First write to fill the buffer
      db.set(keys[0], largeValue, (err) => {
        if (err) return done(err);

        // Immediately queue more writes while buffer is potentially full
        db.set(keys[1], largeValue);
        db.set(keys[2], largeValue);

        // Force immediate check of file contents
        setTimeout(() => {
          const content = fs.readFileSync(testFile, 'utf-8');
          const lines = content.trim().split('\n');

          // In original code: when _waitForDrain is true, loop breaks
          // In mutated code: loop never breaks (if (false) break)
          // This means mutated version will process all queued items in one flush
          // while original version might split them across multiple flushes

          // Count how many times each key appears
          const keyCounts = new Map<string, number>();
          lines.forEach(line => {
            try {
              const entry = JSON.parse(line);
              keyCounts.set(entry.key, (keyCounts.get(entry.key) || 0) + 1);
            } catch (e) {
              // Ignore parse errors
            }
          });

          // In original code, we expect exactly one entry per key
          // In mutated code, we might get duplicates if multiple flushes occur
          let duplicateFound = false;
          keyCounts.forEach(count => {
            if (count > 1) duplicateFound = true;
          });

          if (duplicateFound) {
            done(new Error('Duplicate entries found - mutation causing improper flush behavior'));
          } else if (keyCounts.size !== keys.length) {
            done(new Error(`Expected ${keys.length} keys but got ${keyCounts.size}`));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});