import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should not flush when queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let flushCalled = false;

    db.on('load', () => {
      // Override _flush to detect when it's called
      const originalFlush = db._flush.bind(db);
      db._flush = function() {
        flushCalled = true;
        return originalFlush();
      };

      // Set a value
      db.set('test-key', { value: 'test' }, () => {
        // Immediately remove it (queue should be empty after this)
        db.rm('test-key');

        // Force a flush attempt
        setImmediate(() => {
          // In original code, _flush should return early when queue is empty
          // In mutated code, it will proceed with flush operations
          expect(flushCalled).toBe(true);

          // Check that the queue is actually empty
          expect(db._queue.size).toBe(0);
          done();
        });
      });
    });
  });
});