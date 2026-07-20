import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database write stream drain behavior', () => {
  it('should not call _flush unnecessarily when queue is empty after drain', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let flushCallCount = 0;
    const originalFlush = db._flush.bind(db);
    db._flush = function() {
      flushCallCount++;
      return originalFlush();
    };

    db.on('load', () => {
      // Perform a single write
      db.set('key1', 'value1', () => {
        // Wait for the drain event
        db.once('drain', () => {
          // At this point, the queue should be empty
          // The mutation would cause _flush to be called again unnecessarily
          // when the drain event handler completes
          setImmediate(() => {
            // In original code, flush should be called exactly once (during the initial write)
            // In mutated code, it would be called twice (once during write, once after drain)
            expect(flushCallCount).toBe(1);
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