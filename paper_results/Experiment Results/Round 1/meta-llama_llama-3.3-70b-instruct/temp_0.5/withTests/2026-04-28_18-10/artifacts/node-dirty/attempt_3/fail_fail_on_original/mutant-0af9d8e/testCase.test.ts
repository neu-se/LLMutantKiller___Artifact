import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db test', function () {
  it('should not emit drain when there are in-flight writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
      });

      db.set('key2', 'value2', () => {
        db.close();
      });

      setTimeout(() => {
        if (drainCount > 0) {
          done(new Error('Drain event emitted prematurely'));
        } else {
          done();
        }
      }, 10);
    });

    db.on('write_close', () => {
      fs.unlink(file, () => {
        // do nothing
      });
    });
  });
});