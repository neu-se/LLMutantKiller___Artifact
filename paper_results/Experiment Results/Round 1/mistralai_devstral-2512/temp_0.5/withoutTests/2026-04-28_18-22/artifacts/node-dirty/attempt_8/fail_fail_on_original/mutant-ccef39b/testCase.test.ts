import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should wait for drain when only in-flight writes exist (OR condition)', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Create a Dirty instance
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set up initial state with data
      db.set('key1', { value: 'test1' }, () => {
        // Clear the queue but keep in-flight writes
        (db as any)._queue.clear();
        (db as any)._inFlightWrites = 1;

        let drainCalled = false;
        db.on('drain', () => {
          drainCalled = true;
        });

        let closeCompleted = false;
        const originalClose = (db as any)._writeStream.end;
        (db as any)._writeStream.end = function(cb) {
          closeCompleted = true;
          if (cb) cb();
        };

        // Call close - in original code this should wait for drain
        db.close();

        // In original code (OR condition), it should wait for drain
        // In mutated code (AND condition), it would close immediately
        setTimeout(() => {
          expect(drainCalled).toBe(true);
          expect(closeCompleted).toBe(true);

          // Cleanup
          fs.rmSync(testDir, { recursive: true, force: true });
          done();
        }, 100);
      });
    });

    db.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});