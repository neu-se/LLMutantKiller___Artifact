import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should close streams when close is called and there are no pending writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          fs.access(file, fs.constants.W_OK, (err) => {
            if (err) {
              done();
            } else {
              done(new Error('Write stream was not closed'));
            }
          });
        });
      });
    });
  });
});