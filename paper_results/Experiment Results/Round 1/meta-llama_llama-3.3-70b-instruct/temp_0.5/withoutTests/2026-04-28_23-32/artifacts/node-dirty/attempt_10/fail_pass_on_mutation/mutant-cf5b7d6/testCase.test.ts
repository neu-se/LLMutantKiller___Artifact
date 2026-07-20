import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should handle data loading correctly', (done) => {
    const filePath = 'dirty-test.db';
    const dirty = new Dirty(filePath);

    dirty.on('load', () => {
      const key = 'test-key';
      const value = 'test-value';
      dirty.set(key, value);

      dirty.on('drain', () => {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');
        let nonJsonCount = 0;
        for (const line of lines) {
          if (line) {
            try {
              JSON.parse(line);
            } catch (e) {
              nonJsonCount++;
            }
          }
        }
        expect(nonJsonCount).toBe(0);
        done();
      });
    });
  });
});