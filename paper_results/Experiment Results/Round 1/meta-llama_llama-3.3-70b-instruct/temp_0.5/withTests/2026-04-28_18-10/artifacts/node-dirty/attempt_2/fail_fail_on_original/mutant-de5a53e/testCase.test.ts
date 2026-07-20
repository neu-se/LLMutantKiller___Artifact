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
      try {
        db._writeStream.write('test', () => {});
        done(new Error('Write stream was not destroyed'));
      } catch (err) {
        if (err.code === 'ERR_STREAM_DESTROYED') {
          done();
        } else {
          done(err);
        }
      }
    });
  });
});