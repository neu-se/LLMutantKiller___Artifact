import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database write stream behavior', () => {
  it('should not flush when queue is empty after drain', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let flushCount = 0;
    const originalFlush = db._flush.bind(db);
    db._flush = function() {
      flushCount++;
      return originalFlush();
    };

    db.on('load', () => {
      // Set a value to trigger initial flush
      db.set('key1', 'value1', () => {
        // Wait for drain event
        db.on('drain', () => {
          // At this point queue should be empty
          // The mutation would cause _flush to be called again unnecessarily
          setImmediate(() => {
            // In original code, flushCount should be 1 (initial flush)
            // In mutated code, flushCount would be 2 (extra flush after drain)
            expect(flushCount).toBe(1);
            db.close();
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
            done();
          });
        });
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});