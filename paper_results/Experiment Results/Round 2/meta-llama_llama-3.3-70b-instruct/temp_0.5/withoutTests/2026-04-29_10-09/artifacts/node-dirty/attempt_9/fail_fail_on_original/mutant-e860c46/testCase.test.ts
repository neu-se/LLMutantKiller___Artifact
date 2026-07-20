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

    // Check if the in-flight writes are decremented
    let initialInFlightWrites = dirty._inFlightWrites;
    dirty.once('drain', () => {
      if (dirty._inFlightWrites === initialInFlightWrites) {
        done(new Error('In-flight writes should be decremented'));
      } else {
        done();
      }
    });

    // Wait for a short period of time to allow the drain event to be emitted
    setTimeout(() => {
      done(new Error('Drain event not emitted'));
    }, 100);
  });
});