import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should destroy the read stream when closing', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    await new Promise(resolve => dirty.once('load', resolve));
    dirty.close();
    await new Promise(resolve => setTimeout(resolve, 100));
    const fd = fs.openSync(path, 'r');
    fs.closeSync(fd);
    expect(dirty._readStream).toBeNull();
  }, 10000);
});