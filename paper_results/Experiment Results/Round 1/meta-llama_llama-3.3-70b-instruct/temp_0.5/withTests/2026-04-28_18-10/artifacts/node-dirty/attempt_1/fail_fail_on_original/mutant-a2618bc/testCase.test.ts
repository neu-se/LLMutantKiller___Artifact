import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write all pending changes to disk when flushing', async () => {
    const tmpFile = 'tmp.dirty';
    const db = new Dirty(tmpFile);

    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');

    await new Promise((resolve) => {
      db.on('drain', resolve);
    });

    const contents = fs.readFileSync(tmpFile, 'utf-8');
    const lines = contents.split('\n').filter((line) => line !== '');
    expect(lines.length).toBe(3);

    rimraf.sync(tmpFile);
  });
});