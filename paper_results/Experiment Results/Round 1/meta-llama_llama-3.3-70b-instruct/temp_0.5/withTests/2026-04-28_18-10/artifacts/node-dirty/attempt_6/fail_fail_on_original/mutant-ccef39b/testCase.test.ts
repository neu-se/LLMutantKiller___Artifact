import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db close', function () {
  it('should not close db file streams when queue is not empty and there are in-flight writes', function (done) {
    const file = 'test.dirty';
    fs.writeFileSync(file, '');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2');
        db.close();
        setTimeout(() => {
          if (db._writeStream!== null) {
            done();
          } else {
            done(new Error('Write stream should not be closed'));
          }
        }, 10);
      });
    });
  });
});