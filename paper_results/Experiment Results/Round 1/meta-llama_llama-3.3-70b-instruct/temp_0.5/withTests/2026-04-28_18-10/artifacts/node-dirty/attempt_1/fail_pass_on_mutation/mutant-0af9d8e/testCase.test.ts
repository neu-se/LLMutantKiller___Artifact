import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db test', function () {
  it('should not emit drain when there are in-flight writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          db.close();
        } else {
          done(new Error('Drain event emitted multiple times'));
        }
      });
    });

    db.on('write_close', () => {
      fs.unlink(file, () => {
        done();
      });
    });
  });
});