import { Dirty } from '../../lib/dirty/dirty.js';
import * as fs from 'fs';

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
    const lines = contents.split('\n').filter((line: string) => line !== '');
    expect(lines.length).toBe(3);

    db.set('key4', 'value4');
    await new Promise((resolve) => {
      db.on('drain', resolve);
    });

    const newContents = fs.readFileSync(tmpFile, 'utf-8');
    const newLines = newContents.split('\n').filter((line: string) => line !== '');
    expect(newLines.length).toBe(4);

    fs.unlinkSync(tmpFile);
  });
});