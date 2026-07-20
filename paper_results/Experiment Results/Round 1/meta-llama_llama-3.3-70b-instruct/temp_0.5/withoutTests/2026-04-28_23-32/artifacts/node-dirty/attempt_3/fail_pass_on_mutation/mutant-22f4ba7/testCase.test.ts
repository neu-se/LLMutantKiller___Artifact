import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should close streams when queue is not empty and there are no in-flight writes after setting a value and listening for drain', async () => {
    const tempDir = join(__dirname, 'temp');
    const filePath = join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);

    const dirty = new Dirty(filePath);
    dirty.set('key', 'value');

    dirty.once('drain', () => {
      dirty.close();
    });

    await new Promise(resolve => {
      dirty.once('write_close', () => {
        resolve();
      });
    });

    rimraf.sync(tempDir);

    expect(fs.existsSync(filePath)).toBe(false);
  });
});