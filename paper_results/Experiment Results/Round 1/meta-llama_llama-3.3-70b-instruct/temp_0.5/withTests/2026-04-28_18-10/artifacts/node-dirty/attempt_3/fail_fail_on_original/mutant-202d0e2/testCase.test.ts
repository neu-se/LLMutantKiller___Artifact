import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { join } from 'path';
import { promisify } from 'util';
import { unlink, readFile } from 'fs';

const asyncUnlink = promisify(unlink);
const asyncReadFile = promisify(readFile);

describe('Dirty', () => {
  it('should flush after write when _inFlightWrites is 0', async () => {
    const filePath = join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));
    await asyncUnlink(filePath);
    const db2 = new Dirty(filePath);
    await new Promise((resolve) => db2.on('load', resolve));
    const contents = await asyncReadFile(filePath, 'utf-8');
    expect(contents).not.toBe('');
  });
});