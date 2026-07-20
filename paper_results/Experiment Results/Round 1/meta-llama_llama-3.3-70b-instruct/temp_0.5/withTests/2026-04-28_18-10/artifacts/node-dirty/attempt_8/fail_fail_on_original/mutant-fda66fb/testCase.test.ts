import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should emit drain event after all writes are completed', async () => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    await new Promise((resolve) => db.on('load', resolve));
    db.set('key', 'value');
    db.set('key2', 'value2');
    db.set('key3', 'value3');
    let drainEmitted = false;
    db.on('drain', () => {
      drainEmitted = true;
    });
    // Wait for a short period of time to allow the writes to complete
    await new Promise((resolve) => setTimeout(resolve, 10));
    // If the mutation is present, the 'drain' event will be emitted immediately
    // for each write operation, so it should be emitted at least 3 times.
    // In the original code, the 'drain' event should only be emitted once.
    db.set('key4', 'value4');
    await new Promise((resolve) => db.on('drain', resolve));
    if (drainEmitted) {
      // If the mutation is present, the 'drain' event will be emitted immediately
      // for each write operation, so this assertion will fail.
      throw new Error('Drain event emitted prematurely');
    }
    await fs.unlink(file);
  });
});