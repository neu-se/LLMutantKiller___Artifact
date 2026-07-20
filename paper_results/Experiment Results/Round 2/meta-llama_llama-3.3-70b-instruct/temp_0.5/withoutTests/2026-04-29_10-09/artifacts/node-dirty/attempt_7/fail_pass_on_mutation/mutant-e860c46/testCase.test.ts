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

    // Check if the close event is emitted
    let closeEmitted = false;
    dirty.once('close', () => {
      closeEmitted = true;
    });

    // Wait for a short period of time
    setTimeout(() => {
      // If the close event is emitted on the mutated code, the test fails
      if (closeEmitted) {
        done(new Error('Close event should not be emitted'));
      } else {
        // If the close event is not emitted on the original code, the test passes
        done();
      }
    }, 100);
  });
});