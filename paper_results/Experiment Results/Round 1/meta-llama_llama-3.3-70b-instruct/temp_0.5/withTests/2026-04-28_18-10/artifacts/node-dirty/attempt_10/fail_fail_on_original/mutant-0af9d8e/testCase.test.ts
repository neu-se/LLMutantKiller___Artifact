import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db test', function () {
  it('should emit drain only after all writes are complete', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    let drainCount = 0;

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.on('drain', () => {
        drainCount++;
      });
      setTimeout(() => {
        if (drainCount > 0) {
          done(new Error('Drain event emitted prematurely'));
        } else {
          db.set('key3', 'value3', () => {
            db.close();
            fs.unlink(file, () => {
              done();
            });
          });
        }
      }, 10);
    });
  });
});