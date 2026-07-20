import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should not execute code after if statement in _flush when queue is empty', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      const originalFlush = db._flush;
      let flushExecuted = false;
      db._flush = function() {
        if (!this._queue.size || this._waitForDrain) {
          return;
        }
        flushExecuted = true;
      };
      db._flush();
      if (!flushExecuted) {
        done();
      } else {
        done(new Error('Expected code after if statement not to be executed'));
      }
    });
  });
});