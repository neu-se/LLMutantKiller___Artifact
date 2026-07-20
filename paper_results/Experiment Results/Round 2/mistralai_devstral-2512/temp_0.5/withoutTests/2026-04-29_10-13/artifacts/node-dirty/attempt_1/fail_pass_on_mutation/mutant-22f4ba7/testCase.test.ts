import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should emit drain event when close is called with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.on('drain', () => {
        done();
      });

      db.set('key1', { value: 'test1' }, () => {
        // This callback should be invoked before drain
      });

      // Call close immediately after set, which should trigger the drain event
      db.close();
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});