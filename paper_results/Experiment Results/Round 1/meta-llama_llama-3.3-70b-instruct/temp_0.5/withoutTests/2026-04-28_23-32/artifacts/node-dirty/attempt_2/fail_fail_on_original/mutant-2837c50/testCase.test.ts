import { Dirty } from '../../../lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import { tmpdir } from 'os';
import { join } from 'path';

describe('Dirty', () => {
  it('should close the file streams when drain event is emitted', (done) => {
    const dbPath = join(tmpdir(), 'dirty-test.db');
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          dirty.close();
          setTimeout(() => {
            try {
              const stats = require('fs').statSync(dbPath);
              expect(stats).toBeUndefined();
              done();
            } catch (err) {
              expect(err.code).toBe('ENOENT');
              done();
            }
          }, 100);
        });
      });
    });
  });
});