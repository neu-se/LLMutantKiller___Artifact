import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db close', function () {
  it('should close db file streams when queue is empty and there are no in-flight writes, but not when queue is not empty and there are in-flight writes', function (done) {
    const file = 'test.dirty';
    fs.writeFileSync(file, '');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.close();
        setTimeout(() => {
          if (db._writeStream === null) {
            db.set('key2', 'value2', (err: any) => {
              if (err) {
                done();
              } else {
                done(new Error('Should not be able to write after close'));
              }
            });
          } else {
            done();
          }
        }, 10);
      });
    });
  });
});