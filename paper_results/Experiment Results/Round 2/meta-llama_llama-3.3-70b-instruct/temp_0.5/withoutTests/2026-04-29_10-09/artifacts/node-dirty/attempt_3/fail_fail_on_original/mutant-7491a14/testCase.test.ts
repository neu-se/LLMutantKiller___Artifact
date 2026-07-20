import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import { mkdirSync } from 'fs';

describe('Dirty', () => {
  it('should correctly read and write data when encoding is specified', (done) => {
    const tempDir = 'temp';
    mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.txt');

    const dirty = new Dirty(filePath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          const data = fs.readFileSync(filePath, 'utf8');
          expect(data).toContain('{"key":"value"}');
          rmSync(tempDir, { recursive: true });
          done();
        });
      });
    });
  });
});