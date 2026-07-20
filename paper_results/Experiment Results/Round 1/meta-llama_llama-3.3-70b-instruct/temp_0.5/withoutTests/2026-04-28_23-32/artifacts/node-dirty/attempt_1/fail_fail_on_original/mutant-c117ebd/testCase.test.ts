import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should correctly read and write data with utf-8 encoding', async () => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    rimraf.sync(tempDir);
    fs.mkdirSync(tempDir);

    const dirty = new Dirty(filePath);
    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    dirty.set('key', 'value', () => {
      dirty.close();
    });

    await new Promise((resolve) => {
      dirty.on('write_close', () => {
        resolve();
      });
    });

    const data = fs.readFileSync(filePath, 'utf8');
    expect(data).toBe('{"key":"value"}\n');

    rimraf.sync(tempDir);
  });
});