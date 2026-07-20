import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import { mkdirSync } from 'fs';

describe('Dirty', () => {
  it('should throw an error when reading a file with non-utf8 encoding', async () => {
    const tempDir = 'temp';
    mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.txt');
    fs.writeFileSync(filePath, 'Hello, World!', 'utf16le');

    const dirty = new Dirty(filePath);
    await new Promise((resolve) => {
      dirty.on('error', (err) => {
        expect(err).toBeInstanceOf(Error);
        resolve();
      });
    });

    rmSync(tempDir, { recursive: true });
  });
});