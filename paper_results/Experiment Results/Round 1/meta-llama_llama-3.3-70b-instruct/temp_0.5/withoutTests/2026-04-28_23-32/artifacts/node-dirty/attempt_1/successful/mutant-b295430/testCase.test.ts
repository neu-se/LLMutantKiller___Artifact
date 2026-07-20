import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit "read_close" event when read stream is closed', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.on('read_close', () => {
      fs.unlink(dbPath, (err) => {
        if (err) {
          throw err;
        }
        done();
      });
    });
    dirty.on('error', (err) => {
      fail(err);
      done();
    });
  });
});