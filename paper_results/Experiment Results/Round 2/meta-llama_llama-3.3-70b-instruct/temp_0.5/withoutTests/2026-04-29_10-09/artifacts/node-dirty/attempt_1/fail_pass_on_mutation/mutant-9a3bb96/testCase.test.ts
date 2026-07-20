import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should close the dirty db file streams when there are no pending writes', (done) => {
    const path = './test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.close();
      setTimeout(() => {
        expect(fs.existsSync(path)).toBe(true);
        rimraf.sync(path);
        done();
      }, 100);
    });
  });
});