import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';

describe('Dirty', () => {
  it('should close the file streams when there are pending writes', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2');
      dirty.close();
      dirty.once('write_close', () => {
        // The mutated code will not close the write stream if there are pending writes
        // and the queue is empty, so we expect the write stream to be null in the original code
        dirty.rm('key', () => {
          dirty.close();
          expect(dirty._writeStream).toBeNull();
          done();
        });
      });
    });
  });
});