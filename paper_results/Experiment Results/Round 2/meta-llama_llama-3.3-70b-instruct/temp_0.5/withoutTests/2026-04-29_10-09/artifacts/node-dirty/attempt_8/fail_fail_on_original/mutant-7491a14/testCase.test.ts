import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import { mkdirSync } from 'fs';

describe('Dirty', () => {
  it('should correctly handle encoding when reading from file', () => {
    const tempDir = 'temp';
    try {
      rmSync(tempDir, { recursive: true });
    } catch (e) {
      // Ignore error if directory does not exist
    }
    mkdirSync(tempDir);
    const filePath = path.join(tempDir, 'test.txt');

    fs.writeFileSync(filePath, 'Hello, World!', 'utf8');

    const dirty = new Dirty(filePath);
    let loaded = false;
    dirty.on('load', () => {
      loaded = true;
    });
    dirty.on('error', (err) => {
      if (loaded) {
        throw err;
      }
    });
    expect(() => {
      dirty.get('key');
    }).not.toThrow();
    rmSync(tempDir, { recursive: true });
  }, 10000);
});