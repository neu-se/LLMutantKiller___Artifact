import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import { mkdirSync } from 'fs';

describe('Dirty', () => {
  it('should throw an error when reading a file with non-utf8 encoding', () => {
    const tempDir = 'temp';
    try {
      rmSync(tempDir, { recursive: true });
    } catch (e) {
      // Ignore error if directory does not exist
    }
    mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.txt');

    fs.writeFileSync(filePath, Buffer.from('Hello, World!', 'utf16le'));

    const dirty = new Dirty(filePath);
    let error = null;
    dirty.on('error', (err) => {
      error = err;
    });
    dirty.on('load', () => {
      expect(error).toBeInstanceOf(Error);
      rmSync(tempDir, { recursive: true });
    });
  }, 10000);
});