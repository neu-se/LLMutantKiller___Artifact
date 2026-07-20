import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should wait for drain when only in-flight writes exist', (done) => {
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

        // Track if close actually happened
        let closeHappened = false;
        const originalEnd = (db as any)._writeStream.end;
        (db as any)._writeStream.end = function(cb: () => void) {
          closeHappened = true;
          if (cb) cb();
        };

        // Call close
        db.close();

        // In original code (OR condition), it should wait for drain
        // In mutated code (AND condition), it would close immediately
        setTimeout(() => {
          // Original code should have called drain
          // Mutated code would have closed immediately without drain
          expect(drainCalled).toBe(true);
          expect(closeHappened).toBe(true);

          // Cleanup
          fs.rmSync(testDir, { recursive: true, force: true });
          done();
        }, 500);
      });
    });

    db.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});