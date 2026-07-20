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

    // Set a value with a callback
    let callbackCalled = false;
    db.set('key2', 'value2', () => {
      callbackCalled = true;
    });

    // Wait for the callback to be called
    await new Promise(resolve => setTimeout(() => {
      expect(callbackCalled).toBe(true);
      resolve();
    }, 10));
  });
});