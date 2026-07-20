import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty db close', function () {
  it('should close db file streams when queue is empty and there are no in-flight writes', function (done) {
    const file = 'test.dirty';
    rimraf.sync(file);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      fs.access(file, fs.constants.W_OK, (err) => {
        if (err) {
          done();
        } else {
          done(new Error('File is still writable'));
        }
      });
    });
  });
});