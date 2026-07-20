import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', function () {
  it('should destroy write stream when closing the db', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
      });
    });
    db.on('write_close', () => {
      setTimeout(() => {
        try {
          const fd = fs.openSync(file, 'a');
          fs.closeSync(fd);
          const stats = fs.statSync(file);
          if (stats.size > 0) {
            done(new Error('Write stream was not destroyed'));
          } else {
            done();
          }
        } catch (err) {
          done(err);
        }
      }, 100);
    });
  });
});