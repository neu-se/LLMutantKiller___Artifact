import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('dirty db', function () {
  it('should close write stream when closing the db', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
      });
    });
    db.on('write_close', () => {
      rimraf.sync(file);
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