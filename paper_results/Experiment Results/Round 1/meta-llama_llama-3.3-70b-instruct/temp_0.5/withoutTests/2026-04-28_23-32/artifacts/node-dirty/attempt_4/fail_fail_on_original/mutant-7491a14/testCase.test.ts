import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not throw an error when creating a read stream with encoding', () => {
    const tempDir = path.join(__dirname, 'temp');
    fs.mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.txt');
    fs.writeFileSync(filePath, 'Hello World!');
    const dirty = new Dirty(filePath);
    dirty.on('error', (err: any) => {
      throw err;
    });
    dirty.on('load', () => {
      expect(dirty.size()).toBe(0);
      fs.rmdirSync(tempDir, { recursive: true });
    });
    dirty.close();
  });
});