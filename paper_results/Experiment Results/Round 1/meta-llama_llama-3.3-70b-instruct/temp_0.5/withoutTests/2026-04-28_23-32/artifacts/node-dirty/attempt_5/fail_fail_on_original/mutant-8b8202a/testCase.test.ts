import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not emit drain event immediately after setting a value', async () => {
    const dbPath = 'test-dirty.db';
    const dirty = new Dirty(dbPath);
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });

    dirty.set('key', 'value', () => {
      // do nothing
    });

    // Check if drain event was emitted immediately
    expect(drainEmitted).toBe(false);

    // Clean up
    fs.unlinkSync(dbPath);
  });
});