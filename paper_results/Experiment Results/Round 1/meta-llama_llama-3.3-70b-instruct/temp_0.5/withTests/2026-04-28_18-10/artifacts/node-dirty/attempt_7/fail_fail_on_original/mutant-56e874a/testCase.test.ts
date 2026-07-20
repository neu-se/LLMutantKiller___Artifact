import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should return early from _flush when queue is empty', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      const originalFlush = db._flush;
      let flushReturnedEarly = false;
      db._flush = function() {
        if (this._queue.size === 0) {
          flushReturnedEarly = true;
          return;
        }
        // simulate some work
        setTimeout(() => {
          if (flushReturnedEarly) {
            done();
          } else {
            done(new Error('Expected _flush to return early'));
          }
        }, 10);
      };
      db._flush();
    });
  });
});