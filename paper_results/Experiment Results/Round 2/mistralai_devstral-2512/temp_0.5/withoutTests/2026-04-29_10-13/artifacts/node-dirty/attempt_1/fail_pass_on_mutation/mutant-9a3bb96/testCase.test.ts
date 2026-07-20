import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior', () => {
  it('should wait for pending writes before closing', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    // Wait for the database to load
    dirty.on('load', () => {
      // Set a value with a callback to ensure it's written
      dirty.set('testKey', { value: 'testValue' }, (err) => {
        if (err) {
          done(err);
          return;
        }

        // Try to close immediately - should wait for pending writes
        const closeStartTime = Date.now();
        dirty.close();

        // The close should not complete immediately if there are pending writes
        // We'll check if the streams are still open after a short delay
        setImmediate(() => {
          // In the original code, the close should wait for pending writes
          // In the mutated code, it will close immediately
          if (dirty._writeStream === null) {
            // This indicates the mutation is present (closed immediately)
            done(new Error('Write stream closed prematurely before pending writes completed'));
          } else {
            // This is the expected behavior
            done();
          }
        });
      });
    });

    dirty.on('error', (err) => {
      done(err);
    });
  });
});