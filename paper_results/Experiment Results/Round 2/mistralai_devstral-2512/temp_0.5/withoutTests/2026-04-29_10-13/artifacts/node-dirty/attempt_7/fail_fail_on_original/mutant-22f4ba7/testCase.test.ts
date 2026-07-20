import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should properly handle close when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);
    let closeCalled = false;
    let drainEmitted = false;

    db.on('load', () => {
      db.set('key1', { value: 'test1' }, () => {});

      // Track when close is actually called
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeCalled = true;
        originalClose();
      };

      db.on('drain', () => {
        drainEmitted = true;
        if (closeCalled) {
          done();
        }
      });

      db.close();

      // In original code, close should wait for drain
      // In mutated code, close will proceed immediately
      setImmediate(() => {
        if (!drainEmitted && closeCalled) {
          done(new Error('Close was called but drain was not emitted'));
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 1000);
  });
});