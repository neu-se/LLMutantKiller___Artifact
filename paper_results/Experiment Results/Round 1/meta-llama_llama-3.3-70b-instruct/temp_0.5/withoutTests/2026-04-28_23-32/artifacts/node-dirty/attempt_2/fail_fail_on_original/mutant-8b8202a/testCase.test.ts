import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not emit drain event when there are in-flight writes', async () => {
    const dbPath = 'test-dirty.db';
    const dirty = new Dirty(dbPath);
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });

    dirty.set('key', 'value', () => {
      // do nothing
    });

    // Wait for a short period of time to allow the write to be processed
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    // Check if drain event was emitted
    expect(drainEmitted).toBe(false);

    // Clean up
    fs.unlinkSync(dbPath);
  });
});