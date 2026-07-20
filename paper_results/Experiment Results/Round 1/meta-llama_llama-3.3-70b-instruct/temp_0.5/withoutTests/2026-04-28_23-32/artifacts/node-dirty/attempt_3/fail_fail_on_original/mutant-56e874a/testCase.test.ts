import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should return immediately when _waitForDrain is true', async () => {
    const tempDir = path.join(__dirname, 'temp');
    const filePath = path.join(tempDir, 'test.db');
    await fs.promises.mkdir(tempDir, { recursive: true });
    const dirty = new Dirty(filePath);
    dirty.set('key', 'value');
    dirty._waitForDrain = true;
    const startTime = Date.now();
    dirty._flush();
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(10);
    fs.unlinkSync(filePath);
    fs.rmdirSync(tempDir);
  });
});