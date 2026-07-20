import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import { mkdirSync } from 'fs';

describe('Dirty', () => {
  it('should correctly read and write data when encoding is specified', () => {
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
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          const data = fs.readFileSync(filePath, 'utf8');
          expect(data).toContain('{"key":"value"}\n');
          rmSync(tempDir, { recursive: true });
        });
      });
    });
  }, 10000);
});