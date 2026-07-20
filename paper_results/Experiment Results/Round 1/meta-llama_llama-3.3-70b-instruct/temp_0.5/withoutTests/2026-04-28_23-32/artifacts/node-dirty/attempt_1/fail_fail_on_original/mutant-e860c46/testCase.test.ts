import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit drain event when close is called and there are in-flight writes', async () => {
    const tempDir = 'temp';
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(path.join(tempDir, 'test.db'));
    dirty.set('key', 'value', () => {});
    dirty.set('key2', 'value2', () => {});
    dirty.close();
    await new Promise(resolve => {
      dirty.once('drain', () => {
        resolve();
      });
    });
    rimraf.sync(tempDir);
  });
});