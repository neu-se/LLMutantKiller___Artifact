import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should wait for pending writes to finish before closing', (done) => {
    const path = './test.db';
    const dirty = new Dirty(path);

    dirty.set('key', 'value', () => {
      dirty.close();
      dirty.once('drain', () => {
        expect(dirty._writeStream).toBeNull();
        expect(dirty._readStream).toBeNull();
        fs.unlinkSync(path);
        done();
      });
    });
  });
});