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

    // Check if the drain event is emitted after a delay
    let drainEmitted = false;
    dirty.once('drain', () => {
      drainEmitted = true;
    });

    // Wait for a short period of time
    setTimeout(() => {
      // If the drain event is emitted on the mutated code, the test fails
      if (dirty._inFlightWrites > 0 && drainEmitted) {
        done(new Error('Drain event should not be emitted when in-flight writes are greater than zero'));
      } else {
        // If the drain event is not emitted on the original code when in-flight writes are greater than zero, the test passes
        done();
      }
    }, 100);
  });
});