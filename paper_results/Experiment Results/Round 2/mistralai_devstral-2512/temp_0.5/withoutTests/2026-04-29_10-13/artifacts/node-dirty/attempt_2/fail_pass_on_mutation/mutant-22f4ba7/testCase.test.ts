import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should not close immediately when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      let closeCalled = false;
      let drainCalled = false;

      db.set('key1', { value: 'test1' }, () => {});

      // Call close immediately after set
      db.close();

      // In original code, close should wait for drain
      // In mutated code, close will proceed immediately
      setImmediate(() => {
        if (db._writeStream === null) {
          // In mutated code, streams are closed immediately
          done(new Error('Streams were closed immediately when they should have waited for drain'));
        } else {
          // In original code, streams should still be open
          done();
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});