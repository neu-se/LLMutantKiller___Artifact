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
      // Check if the in-flight writes are still greater than zero
      if (dirty._inFlightWrites > 0) {
        // If the in-flight writes are still greater than zero, the test fails
        done(new Error('In-flight writes should be zero'));
      } else {
        // If the in-flight writes are zero, the test passes
        done();
      }
    }, 100);
  });
});