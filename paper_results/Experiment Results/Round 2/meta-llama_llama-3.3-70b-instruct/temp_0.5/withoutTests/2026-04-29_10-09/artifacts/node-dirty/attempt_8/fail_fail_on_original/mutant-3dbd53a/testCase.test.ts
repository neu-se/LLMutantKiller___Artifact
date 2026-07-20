import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rmSync } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should write data to file with correct encoding', () => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'value', () => {
      dirty.close();
    });
    dirty.once('write_close', () => {
      try {
        const data = require('fs').readFileSync(dbPath);
        expect(data.toString()).toBe('{"key":"value"}\n');
      } catch (error) {
        expect(error).toBeUndefined();
      } finally {
        rmSync(dbPath);
      }
    });
  });
});