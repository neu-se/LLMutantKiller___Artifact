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

    // Check if the close event is emitted immediately
    let closeEmitted = false;
    dirty.once('close', () => {
      closeEmitted = true;
    });

    // Wait for a short period of time
    setTimeout(() => {
      if (closeEmitted) {
        done(new Error('Close event should not be emitted immediately'));
      } else {
        done();
      }
    }, 10);
  });
});