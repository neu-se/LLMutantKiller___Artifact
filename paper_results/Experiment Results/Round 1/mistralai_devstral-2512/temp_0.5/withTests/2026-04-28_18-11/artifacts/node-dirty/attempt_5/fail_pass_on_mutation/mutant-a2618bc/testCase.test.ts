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
      // Force a scenario where _waitForDrain becomes true
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3'];

      // First set to fill the buffer
      db.set(keys[0], largeValue, (err) => {
        if (err) return done(err);

        // Immediately set more values while buffer might still be draining
        db.set(keys[1], largeValue);
        db.set(keys[2], largeValue);

        // Check if all values were written correctly
        setTimeout(() => {
          const content = fs.readFileSync(testFile, 'utf-8');
          const lines = content.trim().split('\n');
          const writtenKeys = new Set();

          lines.forEach(line => {
            try {
              const entry = JSON.parse(line);
              writtenKeys.add(entry.key);
            } catch (e) {
              // Ignore parse errors
            }
          });

          // In the original code, when _waitForDrain is true, the loop should break
          // In the mutated code (if (false) break), the loop won't break
          // This means the mutated version might write duplicate entries
          if (writtenKeys.size > keys.length) {
            done(new Error(`Duplicate entries detected: ${writtenKeys.size} vs ${keys.length}`));
          } else if (writtenKeys.size < keys.length) {
            done(new Error(`Missing entries: ${writtenKeys.size} vs ${keys.length}`));
          } else {
            done();
          }
        }, 200);
      });
    });
  });
});