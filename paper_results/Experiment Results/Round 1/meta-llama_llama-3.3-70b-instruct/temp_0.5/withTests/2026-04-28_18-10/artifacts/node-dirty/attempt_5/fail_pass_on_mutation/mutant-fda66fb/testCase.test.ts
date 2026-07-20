import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should not emit drain event prematurely', async () => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    await new Promise((resolve) => db.on('load', resolve));
    let drainEmitted = false;
    db.on('drain', () => {
      drainEmitted = true;
    });
    db.set('key', 'value');
    // If the mutation is present, the 'drain' event will be emitted immediately
    // because the condition in the _writeStream's 'drain' event handler
    // will be true, even though the write operation has not completed.
    if (drainEmitted) {
      throw new Error('Drain event emitted prematurely');
    }
    await new Promise((resolve) => db.on('drain', resolve));
    await fs.unlink(file);
  });
});