import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close correctly when there are in-flight writes', async () => {
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
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    // Check if the close event was emitted
    expect(closeEmitted).toBe(false);

    // Clean up
    dirty._inFlightWrites = 0;
    dirty.close();
    fs.unlinkSync(dbPath);
  });
});