import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db test', function () {
  it('should emit drain only once after multiple writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.set('key3', 'value3', () => {
        let drainCount = 0;
        db.on('drain', () => {
          drainCount++;
          if (drainCount > 1) {
            done(new Error('Drain event emitted multiple times'));
          } else {
            db.close();
            done();
          }
        });
      });
    });

    db.on('write_close', () => {
      fs.unlink(file, () => {
        // do nothing
      });
    });
  });
});