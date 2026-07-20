import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should close the file streams when there are pending writes', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.set('key2', undefined, () => {
        dirty.close();
        dirty.once('write_close', () => {
          expect(dirty._writeStream).toBeNull();
          done();
        });
      });
    });
  });
});