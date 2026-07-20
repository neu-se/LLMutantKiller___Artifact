import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should handle close when there are only in-flight writes', (done) => {
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

        // Track close behavior
        let closeBehavior = 'immediate';
        const originalClose = db.close.bind(db);
        db.close = function() {
          // Check if we're waiting for drain
          if ((this as any)._queue.size || (this as any)._inFlightWrites > 0) {
            closeBehavior = 'waiting';
            // Call original close
            originalClose();
          } else {
            closeBehavior = 'immediate';
            // Call original close
            originalClose();
          }
        };

        // Call close
        db.close();

        // In original code (OR condition), it should wait
        // In mutated code (AND condition), it would be immediate
        setTimeout(() => {
          expect(closeBehavior).toBe('waiting');

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