import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should invoke close callback after drain when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      let closeCallbackInvoked = false;
      let drainEventFired = false;

      db.set('key1', { value: 'test1' }, () => {});

      // Override close to track callback invocation
      const originalClose = db.close.bind(db);
      db.close = function(cb) {
        originalClose();
        if (cb) {
          closeCallbackInvoked = true;
          cb();
        }
      };

      // Call close with callback
      db.close(() => {
        if (!drainEventFired) {
          done(new Error('Close callback was invoked before drain event'));
        }
      });

      db.on('drain', () => {
        drainEventFired = true;
        if (closeCallbackInvoked) {
          done();
        }
      });

      // Force a timeout to ensure the test fails if expectations aren't met
      setTimeout(() => {
        done(new Error('Test timed out - neither close callback nor drain event fired as expected'));
      }, 1000);
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});