import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not include non-JSON data in the file', (done) => {
    const filePath = 'dirty-test.db';
    const dirty = new Dirty(filePath);

    const key = 'test-key';
    const value = 'test-value';
    dirty.set(key, value);

    dirty.on('drain', () => {
      const data = fs.readFileSync(filePath, 'utf8');
      const lines = data.split('\n');
      let error = false;
      for (const line of lines) {
        if (line && !line.startsWith('{')) {
          error = true;
          break;
        }
      }
      if (error) {
        expect(true).toBe(false);
      } else {
        expect(true).toBe(true);
      }
      done();
    });
  });
});