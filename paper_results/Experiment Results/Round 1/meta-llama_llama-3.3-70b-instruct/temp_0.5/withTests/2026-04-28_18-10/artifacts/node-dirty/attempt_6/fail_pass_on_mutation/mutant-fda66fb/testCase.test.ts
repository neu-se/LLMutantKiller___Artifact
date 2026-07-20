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
    // If the mutation is present, the 'drain' event will not be emitted
    // because the condition in the _writeStream's 'drain' event handler
    // will be false, and the event will not be emitted even though the queue is empty.
    if (!drainEmitted) {
      throw new Error('Drain event not emitted');
    }
    await fs.unlink(file);
  });
});