import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
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
          rimraf(dbPath, () => {
            expect(dirty._readStream).toBeNull();
            expect(dirty._writeStream).toBeNull();
            done();
          });
        });
      });
    });
  });
});