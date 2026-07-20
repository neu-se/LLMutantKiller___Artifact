import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit drain event when close is called and there are in-flight writes', async () => {
    const tempDir = 'temp';
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir, { recursive: true });
    }
    fs.mkdirSync(tempDir);
    const dirty = new Dirty(path.join(tempDir, 'test.db'));
    dirty.set('key', 'value', () => {});
    dirty.set('key2', 'value2', () => {
      dirty.close();
    });
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
    expect(drainEmitted).toBe(true);
    fs.rmdirSync(tempDir, { recursive: true });
  });
});