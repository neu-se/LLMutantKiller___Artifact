import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should close the file streams when there are pending writes', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.close();
      dirty.once('write_close', () => {
        dirty.set('key2', 'value2', () => {
          expect(dirty._writeStream).toBeNull();
          done();
        });
      });
    });
  });
});