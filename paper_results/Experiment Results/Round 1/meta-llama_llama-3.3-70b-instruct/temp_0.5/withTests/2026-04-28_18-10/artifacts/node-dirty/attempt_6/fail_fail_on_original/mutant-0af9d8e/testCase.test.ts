import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db test', function () {
  it('should not emit drain when in-flight writes are greater than 0', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2');
        let drainCount = 0;
        db.on('drain', () => {
          drainCount++;
          if (drainCount > 0) {
            done(new Error('Drain event emitted prematurely'));
          }
        });
      });
    });

    db.on('write_close', () => {
      fs.unlink(file, () => {
        done();
      });
    });
  });
});