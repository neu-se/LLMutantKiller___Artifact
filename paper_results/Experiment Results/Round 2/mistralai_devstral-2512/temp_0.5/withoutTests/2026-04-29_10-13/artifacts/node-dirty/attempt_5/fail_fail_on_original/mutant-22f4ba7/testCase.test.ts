import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should emit drain event before closing when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCloseEmitted = false;

    db.on('load', () => {
      db.set('key1', { value: 'test1' }, () => {});

      db.on('drain', () => {
        drainEmitted = true;
      });

      db.on('write_close', () => {
        writeCloseEmitted = true;
        // In original code, drain should be emitted before write_close
        // In mutated code, write_close might be emitted without drain
        if (!drainEmitted) {
          done(new Error('write_close emitted before drain'));
        } else {
          done();
        }
      });

      db.close();
    });

    db.on('error', (err) => {
      done(err);
    });

    // Timeout to catch cases where neither event fires
    setTimeout(() => {
      done(new Error('Test timed out - expected events did not fire'));
    }, 1000);
  });
});