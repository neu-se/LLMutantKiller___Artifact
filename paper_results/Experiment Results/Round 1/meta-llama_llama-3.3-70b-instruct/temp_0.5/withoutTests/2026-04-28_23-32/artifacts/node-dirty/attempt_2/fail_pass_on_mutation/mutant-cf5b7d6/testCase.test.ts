import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import rimraf from 'rimraf';

const rm = promisify(rimraf);

describe('Dirty', () => {
  it('should load data from file without errors', async () => {
    const filePath = 'dirty-test.db';
    const dirty = new Dirty(filePath);

    await new Promise((resolve) => {
      dirty.on('load', () => {
        resolve();
      });
    });

    const key = 'test-key';
    const value = 'test-value';
    dirty.set(key, value);

    await new Promise((resolve) => {
      dirty.on('drain', () => {
        resolve();
      });
    });

    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    for (const line of lines) {
      if (line) {
        const row = JSON.parse(line);
        expect(typeof row.key).toBe('string');
        expect(typeof row.val).toBe('string' || 'number' || 'object' || 'boolean');
      }
    }
  });
});