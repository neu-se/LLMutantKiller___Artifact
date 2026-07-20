import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { promises as fsp } from 'fs';
import { join } from 'path';

describe('dirty', function () {
  it('should emit drain event after write and flush', function (done) {
    const file = join(__dirname, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
    });

    db.on('drain', () => {
      db.set('key2', 'value2');
    });

    db.on('drain', () => {
      db.close();
      fsp.unlink(file).then(() => {
        done();
      });
    });
  });
});