import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant test for _flush break condition', () => {
  const testFile = path.join(__dirname, 'test-flush-mutant.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should break flush loop when waitForDrain is true', (done) => {
    db = new (require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js"))(testFile);

    db.on('load', () => {
      const largeValue = 'x'.repeat(100000);
      const keys = ['key1', 'key2', 'key3'];
      let writeCount = 0;

      // First write to potentially fill the buffer
      db.set(keys[0], largeValue, (err: any) => {
        if (err) return done(err);

        // Queue additional writes while buffer might be full
        db.set(keys[1], largeValue);
        db.set(keys[2], largeValue);

        writeCount = 3;

        setTimeout(() => {
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

          // Check for duplicate entries which would occur in mutated version
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
        }, 200);
      });
    });
  });
});