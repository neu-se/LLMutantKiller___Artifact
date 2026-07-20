import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should close the dirty db file streams when there are pending writes', (done) => {
    const path = './test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();
        dirty.once('drain', () => {
          expect(fs.existsSync(path)).toBe(true);
          fs.unlinkSync(path);
          done();
        });
      });
    });
  });
});