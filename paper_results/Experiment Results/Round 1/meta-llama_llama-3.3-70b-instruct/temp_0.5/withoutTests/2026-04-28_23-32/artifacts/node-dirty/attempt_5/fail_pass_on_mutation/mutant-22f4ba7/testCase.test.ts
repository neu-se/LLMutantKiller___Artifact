import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should close streams when queue is not empty and there are in-flight writes', async () => {
    const tempDir = join(__dirname, 'temp');
    const filePath = join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);

    const dirty = new Dirty(filePath);
    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2');
      dirty.close();
    });

    await new Promise((resolve, reject) => {
      let closed = false;
      dirty.once('write_close', () => {
        closed = true;
      });
      setTimeout(() => {
        if (!closed) {
          reject(new Error('Write stream was not closed'));
        } else {
          resolve();
        }
      }, 1000);
    });

    rimraf.sync(tempDir);

    expect(fs.existsSync(filePath)).toBe(false);
  });
});