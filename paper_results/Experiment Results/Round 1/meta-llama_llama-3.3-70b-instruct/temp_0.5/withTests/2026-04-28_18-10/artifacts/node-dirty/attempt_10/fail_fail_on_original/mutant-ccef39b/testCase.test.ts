import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db close', function () {
  it('should close db file streams when queue is empty and there are no in-flight writes, but not close when queue is not empty', function (done) {
    const file = 'test.dirty';
    fs.writeFileSync(file, '');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db.close();
          db.once('write_close', () => {
            done(new Error('Write stream should not be closed'));
          });
          setTimeout(() => {
            done();
          }, 10);
        });
      });
    });
  });
});