import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promisify } from 'util';
import { join } from 'path';

const asyncRimraf = promisify(rimraf);

describe('Dirty', () => {
  it('should flush after write when _inFlightWrites is 0', async () => {
    const filePath = join(__dirname, 'test.dirty');
    await asyncRimraf(filePath);

    const db = new Dirty(filePath);
    db.set('key', 'value');
    await new Promise((resolve) => db.on('drain', resolve));

    const contents = await promisify(require('fs').readFile)(filePath, 'utf-8');
    expect(contents).toBe(`{"key":"key","val":"value"}\n`);
  });
});