import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should return from _flush when queue is empty', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      const originalFlush = db._flush;
      let flushReturned = false;
      db._flush = () => {
        flushReturned = true;
        return;
      };
      db._flush();
      setTimeout(() => {
        if (!flushReturned) {
          done(new Error('Expected _flush to return'));
          return;
        }
        db._flush = originalFlush;
        done();
      }, 10);
    });
  });
});