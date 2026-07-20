import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { promises as fsp } from 'fs';

describe('Dirty', () => {
  it('should emit drain event when inFlightWrites is 0', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new Dirty(file);
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));
    await fsp.unlink(file);

    // Introduce a small delay to allow the drain event to be emitted
    await new Promise(resolve => setTimeout(resolve, 10));

    // Check if the drain event is emitted when inFlightWrites is 0
    let drainEmitted = false;
    db.on('drain', () => {
      drainEmitted = true;
    });
    db.set('key2', 'value2');
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(drainEmitted).toBe(true);
  });
});