import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as fsp from 'fs/promises';

describe('Dirty', () => {
  it('should wait for all writes to finish before closing', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});

    const db = new Dirty(file);
    let writeCount = 0;
    db.set('key', 'value', () => {
      writeCount++;
    });
    db.set('key2', 'value2', () => {
      writeCount++;
    });
    db.close();

    await new Promise((resolve) => db.on('write_close', resolve));

    expect(writeCount).toBe(2);
    await fsp.unlink(file);
  });
});