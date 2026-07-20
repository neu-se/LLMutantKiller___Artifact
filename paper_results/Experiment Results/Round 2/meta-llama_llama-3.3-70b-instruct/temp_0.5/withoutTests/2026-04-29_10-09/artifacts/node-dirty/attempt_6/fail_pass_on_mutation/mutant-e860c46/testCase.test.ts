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
      // Check if the file is still being written to
      if (dirty._writeStream) {
        // If the file is still being written to, the test passes on the original code and fails on the mutated code
        done(new Error('Write stream should be null'));
      } else {
        // If the file is not being written to, the test passes
        done();
      }
    }, 100);
  });
});