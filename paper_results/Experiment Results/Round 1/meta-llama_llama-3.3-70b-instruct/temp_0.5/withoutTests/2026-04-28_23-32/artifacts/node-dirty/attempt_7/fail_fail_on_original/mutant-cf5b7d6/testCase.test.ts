import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should handle data loading correctly', (done) => {
    const filePath = 'dirty-test.db';
    const dirty = new Dirty(filePath);

    const key = 'test-key';
    const value = 'test-value';
    dirty.set(key, value);

    dirty.on('load', (size) => {
      expect(size).toBe(0);
      dirty.set(key, value);
      dirty.on('drain', () => {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        expect(lines.length).toBe(1);
        done();
      });
    });
  });
});