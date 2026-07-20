import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should check for queue size and waitForDrain in _flush', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      const originalFlush = db._flush;
      db._flush = function() {
        if (this._queue.size === 0) {
          throw new Error('Queue size check failed');
        }
        if (this._waitForDrain) {
          throw new Error('waitForDrain check failed');
        }
      };
      db._flush();
      try {
        db._flush();
        done(new Error('Expected _flush to throw an error'));
      } catch (error) {
        if (error.message === 'Queue size check failed') {
          done(new Error('Expected _flush to throw an error for waitForDrain'));
        } else if (error.message === 'waitForDrain check failed') {
          done(new Error('Expected _flush to throw an error for queue size'));
        } else {
          done();
        }
      }
    });
  });
});