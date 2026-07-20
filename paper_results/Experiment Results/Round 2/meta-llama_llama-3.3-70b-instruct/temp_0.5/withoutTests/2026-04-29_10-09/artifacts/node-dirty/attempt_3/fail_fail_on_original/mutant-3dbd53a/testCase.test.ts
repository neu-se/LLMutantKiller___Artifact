import { Dirty } from '../../lib/dirty/dirty.js';
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
      expect(() => {
        const data = require('fs').readFileSync(dbPath, 'utf8');
      }).not.toThrow();
      rmSync(dbPath);
    });
  });
});