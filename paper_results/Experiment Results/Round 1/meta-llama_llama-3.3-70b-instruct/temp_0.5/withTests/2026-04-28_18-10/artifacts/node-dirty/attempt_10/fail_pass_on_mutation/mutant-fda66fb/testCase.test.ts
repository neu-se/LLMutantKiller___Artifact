import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should emit drain event after all writes are completed', async () => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    await new Promise((resolve) => db.on('load', resolve));
    db.set('key', 'value');
    let drainEmitted = false;
    db.on('drain', () => {
      drainEmitted = true;
    });
    // If the mutation is present, the 'drain' event will not be emitted
    // because the condition in the _writeStream's 'drain' event handler
    // will be false, and the event will not be emitted even though the queue is empty.
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (drainEmitted) {
      // If the mutation is not present, the 'drain' event will be emitted.
      // If the mutation is present, this assertion will fail.
      expect(true).toBe(true);
    } else {
      throw new Error('Drain event not emitted');
    }
    await fs.unlink(file);
  });
});