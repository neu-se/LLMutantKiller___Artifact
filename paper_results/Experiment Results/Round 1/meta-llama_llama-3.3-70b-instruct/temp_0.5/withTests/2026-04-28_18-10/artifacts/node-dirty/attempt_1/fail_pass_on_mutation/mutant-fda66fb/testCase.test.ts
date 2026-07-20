import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', async () => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    await new Promise((resolve) => db.on('load', resolve));
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));
    db.set('key2', 'value2');
    const promise = new Promise((resolve) => db.on('drain', resolve));
    // Introduce a small delay to ensure the event is not emitted immediately
    await new Promise((resolve) => setTimeout(resolve, 10));
    // If the mutation is present, the 'drain' event will not be emitted
    // because the condition in the _writeStream's 'drain' event handler
    // will be false, and the event will not be emitted.
    await promise;
    await fs.unlink(file);
  });
});