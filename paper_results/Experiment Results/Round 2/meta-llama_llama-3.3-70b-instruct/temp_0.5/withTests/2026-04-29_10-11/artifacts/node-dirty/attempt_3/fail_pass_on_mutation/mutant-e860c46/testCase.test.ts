import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as fsp from 'fs/promises';

describe('Dirty', () => {
  it('should wait for in-flight writes to finish before closing', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});

    const db = new Dirty(file);
    db.set('key', 'value');
    db.set('key2', 'value2');

    db.close();

    await new Promise((resolve) => db.on('write_close', resolve));

    const contents = await fsp.readFile(file, 'utf-8');
    expect(contents).toContain('{"key":"key","val":"value"}');
    expect(contents).toContain('{"key":"key2","val":"value2"}');
    await fsp.unlink(file);
  });
});