import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as fsp from 'fs/promises';

describe('Dirty', () => {
  it('should wait for in-flight writes to finish before closing', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});

    const db = new Dirty(file);
    let callbackCalled = false;
    db.set('key', 'value', () => {
      callbackCalled = true;
    });
    db.close();

    await new Promise((resolve) => db.on('write_close', resolve));

    expect(callbackCalled).toBe(true);
    await fsp.unlink(file);
  });
});