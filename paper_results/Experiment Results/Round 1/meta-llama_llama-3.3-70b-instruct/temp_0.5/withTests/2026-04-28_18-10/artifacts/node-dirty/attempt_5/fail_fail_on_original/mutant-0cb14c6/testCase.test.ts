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

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db.set('key2', 'value2');
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(2);
  });
});