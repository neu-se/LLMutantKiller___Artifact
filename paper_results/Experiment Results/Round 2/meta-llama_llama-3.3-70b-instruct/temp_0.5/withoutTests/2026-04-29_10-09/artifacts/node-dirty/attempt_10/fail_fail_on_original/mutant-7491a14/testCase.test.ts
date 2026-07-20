import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import { mkdirSync } from 'fs';

describe('Dirty', () => {
  it('should throw an error when encoding is not specified', () => {
    const tempDir = 'temp';
    try {
      rmSync(tempDir, { recursive: true });
    } catch (e) {
      // Ignore error if directory does not exist
    }
    mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.txt');

    const dirty = new Dirty(filePath);
    dirty.on('load', () => {
      dirty.set('key', 'value');
      dirty.on('drain', () => {
        const fd = fs.openSync(filePath, 'r');
        const buffer = Buffer.alloc(1024);
        fs.readSync(fd, buffer, 0, 1024, 0);
        expect(buffer.toString('utf8')).toBe('{"key":"value"}\n');
        fs.closeSync(fd);
        rmSync(tempDir, { recursive: true });
      });
    });
  }, 10000);
});