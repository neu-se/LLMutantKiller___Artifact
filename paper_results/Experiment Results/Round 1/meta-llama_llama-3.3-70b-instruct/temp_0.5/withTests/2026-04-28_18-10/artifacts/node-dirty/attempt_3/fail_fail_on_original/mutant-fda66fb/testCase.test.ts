import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should not emit drain event when queue is not empty', async () => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    await new Promise((resolve) => db.on('load', resolve));
    db.set('key', 'value');
    db.set('key2', 'value2');
    let drainEmitted = false;
    db.on('drain', () => {
      drainEmitted = true;
    });
    // Introduce a small delay to ensure the event is not emitted immediately
    await new Promise((resolve) => setTimeout(resolve, 10));
    // If the mutation is present, the 'drain' event will be emitted
    // because the condition in the _writeStream's 'drain' event handler
    // will be true, and the event will be emitted even though the queue is not empty.
    if (drainEmitted) {
      throw new Error('Drain event emitted when queue is not empty');
    }
    db.set('key3', 'value3');
    await new Promise((resolve) => db.on('drain', resolve));
    await fs.unlink(file);
  });
});