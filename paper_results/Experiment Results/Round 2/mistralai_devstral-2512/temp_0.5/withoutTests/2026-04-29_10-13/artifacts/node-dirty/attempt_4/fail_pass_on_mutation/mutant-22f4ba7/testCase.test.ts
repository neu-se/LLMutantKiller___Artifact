import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should not close streams immediately when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.set('key1', { value: 'test1' }, () => {});

      // Call close immediately after set
      db.close();

      // In original code, close should wait for drain before closing streams
      // In mutated code, close will proceed immediately without waiting
      setImmediate(() => {
        // Check if write stream is still open (original behavior)
        if (db._writeStream === null) {
          // This indicates the mutated behavior where streams are closed immediately
          done(new Error('Write stream was closed immediately when it should have waited for drain'));
        } else {
          // This is the correct original behavior
          done();
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});