import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should close immediately when there are no pending writes but in-flight writes exist', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Create a Dirty instance
    const db = new Dirty(dbPath);

    // Wait for the database to load
    db.on('load', () => {
      // Add some data to trigger a write
      db.set('key1', { value: 'test1' }, () => {
        // Manually trigger an in-flight write scenario
        // We'll directly manipulate the internal state to simulate this
        (db as any)._inFlightWrites = 1;
        (db as any)._queue.clear();

        // Spy on the close events
        let readCloseCalled = false;
        let writeCloseCalled = false;
        db.on('read_close', () => {
          readCloseCalled = true;
          checkCompletion();
        });
        db.on('write_close', () => {
          writeCloseCalled = true;
          checkCompletion();
        });

        const checkCompletion = () => {
          if (readCloseCalled && writeCloseCalled) {
            // Cleanup
            fs.rmSync(testDir, { recursive: true, force: true });
            done();
          }
        };

        // Call close - should close immediately in original code
        db.close();

        // In the original code, close should happen immediately because:
        // _queue.size is 0 (we cleared it) and _inFlightWrites > 0 (we set it to 1)
        // The condition is OR, so it should proceed to close streams
        setTimeout(() => {
          // If we reach here, the test failed because close didn't happen
          fs.rmSync(testDir, { recursive: true, force: true });
          done(new Error('Close did not occur within expected time'));
        }, 2000);
      });
    });

    // Handle potential errors
    db.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});