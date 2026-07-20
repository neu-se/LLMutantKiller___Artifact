import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should not call _flush when _waitForDrain is true', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      db._waitForDrain = true;
      const originalFlush = db._flush;
      let flushCalled = false;
      db._flush = () => {
        flushCalled = true;
      };
      db.set('key', 'value');
      setTimeout(() => {
        if (flushCalled) {
          done(new Error('Expected _flush not to be called'));
          return;
        }
        db._flush = originalFlush;
        done();
      }, 10);
    });
  });
});