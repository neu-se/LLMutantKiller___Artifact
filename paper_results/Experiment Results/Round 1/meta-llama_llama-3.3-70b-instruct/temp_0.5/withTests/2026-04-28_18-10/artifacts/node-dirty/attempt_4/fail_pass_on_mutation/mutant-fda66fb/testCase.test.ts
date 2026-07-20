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
    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    // If the mutation is present, the 'drain' event will be emitted multiple times
    // because the condition in the _writeStream's 'drain' event handler
    // will be true, and the event will be emitted for each item in the queue.
    // In the original code, the 'drain' event should only be emitted once.
    if (drainCount > 1) {
      throw new Error('Drain event emitted multiple times');
    }
    await fs.unlink(file);
  });
});