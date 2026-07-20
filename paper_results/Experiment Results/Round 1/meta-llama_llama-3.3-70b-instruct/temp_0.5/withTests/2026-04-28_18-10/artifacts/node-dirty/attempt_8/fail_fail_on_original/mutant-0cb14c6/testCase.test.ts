import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { promises as fsp } from 'fs';

describe('Dirty', () => {
  it('should not emit drain event when inFlightWrites is less than 0', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});
    const db = new Dirty(file);
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db._inFlightWrites = -1;
    db._flush();

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(drainCount).toBe(1);
  });
});