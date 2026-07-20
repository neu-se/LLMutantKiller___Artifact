import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should not emit error when there are callbacks and no error occurs', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('error', (err) => {
      fail('Should not emit error');
    });
    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        fs.unlink(dbPath, () => {
          done();
        });
      });
    });
  });
});