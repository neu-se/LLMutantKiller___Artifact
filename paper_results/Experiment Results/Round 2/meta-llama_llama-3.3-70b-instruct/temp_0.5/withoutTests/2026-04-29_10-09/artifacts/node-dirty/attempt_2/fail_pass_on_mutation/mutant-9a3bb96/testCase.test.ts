import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should close the dirty db file streams when there are pending writes', (done) => {
    const path = './test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();
        setTimeout(() => {
          expect(dirty._writeStream).toBeNull();
          expect(dirty._readStream).toBeNull();
          rimraf.sync(path);
          done();
        }, 100);
      });
    });
  });
});