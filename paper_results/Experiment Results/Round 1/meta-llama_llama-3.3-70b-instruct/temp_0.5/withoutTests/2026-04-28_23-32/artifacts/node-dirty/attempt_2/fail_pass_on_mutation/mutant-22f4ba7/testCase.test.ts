import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should close streams when queue is empty and there are no in-flight writes after setting and then removing a value', async () => {
    const tempDir = join(__dirname, 'temp');
    const filePath = join(tempDir, 'test.db');
    fs.mkdirSync(tempDir);

    const dirty = new Dirty(filePath);
    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        dirty.close();
      });
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