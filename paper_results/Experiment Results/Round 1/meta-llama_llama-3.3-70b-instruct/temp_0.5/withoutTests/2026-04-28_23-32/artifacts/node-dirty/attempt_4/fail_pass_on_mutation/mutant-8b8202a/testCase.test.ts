import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit drain event twice when there are two separate sets', async () => {
    const dbPath = 'test-dirty.db';
    const dirty = new Dirty(dbPath);
    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
    });

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        // do nothing
      });
    });

    // Wait for a short period of time to allow the writes to be processed
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    // Check if drain event was emitted twice
    expect(drainCount).toBe(2);

    // Clean up
    fs.unlinkSync(dbPath);
  });
});