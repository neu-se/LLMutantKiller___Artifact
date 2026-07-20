import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should not emit multiple drain events for a single write operation', async () => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    await new Promise((resolve) => db.on('load', resolve));
    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));
    // If the mutation is present, the 'drain' event will be emitted multiple times
    // for a single write operation, so this assertion will fail.
    if (drainCount > 1) {
      throw new Error('Multiple drain events emitted for a single write operation');
    }
    await fs.unlink(file);
  });
});