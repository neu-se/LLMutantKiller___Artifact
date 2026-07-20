import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database write stream behavior', () => {
  it('should not flush when queue is empty after drain event', (done) => {
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
      // Perform a write operation
      db.set('key1', 'value1', () => {
        // Wait for drain event
        db.once('drain', () => {
          // At this point queue should be empty
          // The mutation would cause _flush to be called again unnecessarily
          // when checking queue size after drain
          setImmediate(() => {
            // In original code, flush should be called exactly once
            // In mutated code, it would be called twice
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
  }, 15000);
});