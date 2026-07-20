import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as fsp from 'fs/promises';

describe('Dirty', () => {
  it('should wait for all writes to finish before closing', async () => {
    const file = 'test.dirty';
    await fsp.unlink(file).catch(() => {});

    const db = new Dirty(file);
    db.set('key', 'value');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    db.close();

    await new Promise((resolve) => db.on('write_close', resolve));

    const contents = await fsp.readFile(file, 'utf-8');
    const lines = contents.split('\n');
    expect(lines.length).toBe(4); // 3 lines for the 3 writes, plus 1 empty line
    expect(lines[0].includes('key')).toBe(true);
    expect(lines[1].includes('key2')).toBe(true);
    expect(lines[2].includes('key3')).toBe(true);
    await fsp.unlink(file);
  });
});