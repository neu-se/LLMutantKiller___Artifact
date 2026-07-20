import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not end the write stream when _writeStream is null', async () => {
    const path = 'test.db';
    const dirty = new Dirty(path);
    dirty.close();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(fs.existsSync(path)).toBe(true);
    rimraf.sync(path);
  });
});