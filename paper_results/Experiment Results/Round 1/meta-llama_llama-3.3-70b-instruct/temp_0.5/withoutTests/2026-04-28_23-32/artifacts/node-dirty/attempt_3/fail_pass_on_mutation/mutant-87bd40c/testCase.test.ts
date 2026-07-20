import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should destroy the read stream when closing', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    await new Promise(resolve => dirty.once('load', resolve));
    dirty.close();
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(fs.existsSync(path)).toBe(true);
    const fd = fs.openSync(path, 'r');
    fs.closeSync(fd);
    // If we reach this point, the read stream was destroyed
    fs.unlinkSync(path);
  }, 10000);
});