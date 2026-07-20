import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fsp } from 'fs';
import { join } from 'path';

describe('dirty', function () {
  it('should emit drain event after write and flush', function (done) {
    const file = join(__dirname, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.set('key3', 'value3');
      db.set('key4', 'value4');
      db.set('key5', 'value5');
    });

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
      if (drainCount === 2) {
        db.close();
        fsp.unlink(file).then(() => {
          done();
        });
      }
    });
  });
});