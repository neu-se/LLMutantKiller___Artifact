import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should destroy the read stream when closing', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    await new Promise(resolve => dirty.once('load', resolve));
    dirty.close();
    await new Promise(resolve => dirty.once('read_close', resolve));
    // If the read stream is destroyed, this should throw an error
    expect(() => fs.openSync(path, 'r')).toThrowError();
  });
});