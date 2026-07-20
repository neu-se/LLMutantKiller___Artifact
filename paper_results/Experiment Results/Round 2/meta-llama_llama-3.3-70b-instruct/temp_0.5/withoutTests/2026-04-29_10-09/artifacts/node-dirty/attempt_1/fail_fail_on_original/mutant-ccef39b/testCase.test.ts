import { Dirty } from '../../../lib/dirty/dirty.js';
import rimraf from 'rimraf';
import fs from 'fs';

describe('Dirty', () => {
  it('should close the file streams when there are pending writes', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.close();
      // The mutated code will not emit 'write_close' when there are pending writes
      // and the queue is not empty, so we expect the event to be emitted in the original code
      dirty.once('write_close', () => {
        rimraf.sync(path);
        done();
      });
    });
  });
});