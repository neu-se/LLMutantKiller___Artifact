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

    // Check if the drain event is emitted
    dirty.once('drain', () => {
      // If the drain event is emitted, it means the close event will not be emitted
      // because the in-flight writes are not zero in the mutated code
      done(new Error('Drain event should not be emitted'));
    });

    // Wait for a short period of time
    setTimeout(() => {
      // If the drain event is not emitted, it means the close event will be emitted
      // because the in-flight writes are zero in the original code
      done();
    }, 100);
  });
});