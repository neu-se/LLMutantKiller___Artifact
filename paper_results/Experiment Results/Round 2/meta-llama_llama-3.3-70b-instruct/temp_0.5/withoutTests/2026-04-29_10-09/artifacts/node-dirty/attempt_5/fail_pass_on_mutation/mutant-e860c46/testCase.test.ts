import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should close correctly when there are in-flight writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Set a key to trigger a write
    dirty.set('key', 'value', () => {});

    // Increase the in-flight writes
    dirty._inFlightWrites = 1;

    // Close the dirty instance
    dirty.close();

    // Wait for a short period of time
    setTimeout(() => {
      // Check if the file still exists
      if (fs.existsSync(dbPath)) {
        // If the file still exists, the test passes on the original code and fails on the mutated code
        done();
      } else {
        // If the file does not exist, the test fails
        done(new Error('File should still exist'));
      }
    }, 100);
  });
});