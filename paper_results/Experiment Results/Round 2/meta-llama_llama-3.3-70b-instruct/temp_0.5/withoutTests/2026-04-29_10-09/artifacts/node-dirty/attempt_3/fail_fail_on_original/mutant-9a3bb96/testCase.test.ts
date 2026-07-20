import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should wait for pending writes to finish before closing', (done) => {
    const path = './test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();
        setTimeout(() => {
          expect(dirty._writeStream).not.toBeNull();
          dirty.once('drain', () => {
            expect(dirty._writeStream).toBeNull();
            rimraf.sync(path);
            done();
          });
        }, 10);
      });
    });
  });
});