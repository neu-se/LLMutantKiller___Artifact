import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should not write to disk when _waitForDrain is true', async () => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    await fs.promises.mkdir(tempDir, { recursive: true });
    const dirty = new Dirty(filePath);
    dirty.set('key', 'value');
    dirty._waitForDrain = true;
    dirty._flush();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(fs.existsSync(filePath)).toBe(false);
    rimraf.sync(tempDir);
  });
});