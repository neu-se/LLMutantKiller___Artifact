import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fs } from 'fs';

describe('Dirty', () => {
  it('should close the write stream only when it exists', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    await new Promise(resolve => dirty.once('load', resolve));
    dirty.set('key', 'value');
    await new Promise(resolve => dirty.once('drain', resolve));
    dirty.close();
    await new Promise(resolve => dirty.once('write_close', resolve));
    expect(await fs.access(dbPath)).resolves.not.toThrow();
    await fs.unlink(dbPath);
  });
});