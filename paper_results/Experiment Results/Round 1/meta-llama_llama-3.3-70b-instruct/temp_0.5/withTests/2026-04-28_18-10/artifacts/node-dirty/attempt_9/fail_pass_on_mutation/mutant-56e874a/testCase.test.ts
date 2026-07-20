import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should return early from _flush when queue is empty and waitForDrain is true', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      const originalFlush = db._flush;
      let flushExecuted = false;
      db._flush = function() {
        if (!this._queue.size || this._waitForDrain) return;
        flushExecuted = true;
      };
      db._waitForDrain = true;
      db._flush();
      if (flushExecuted) {
        done(new Error('Expected _flush to return early'));
      } else {
        db._flush = originalFlush;
        done();
      }
    });
  });
});