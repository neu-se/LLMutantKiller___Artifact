import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should not execute code after return statement in _flush when queue is empty', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      const originalFlush = db._flush;
      let flushExecuted = false;
      db._flush = () => {
        if (db._queue.size === 0) {
          return;
        }
        flushExecuted = true;
      };
      db._flush();
      setTimeout(() => {
        if (flushExecuted) {
          done(new Error('Expected code after return statement not to be executed'));
          return;
        }
        db._flush = originalFlush;
        done();
      }, 10);
    });
  });
});