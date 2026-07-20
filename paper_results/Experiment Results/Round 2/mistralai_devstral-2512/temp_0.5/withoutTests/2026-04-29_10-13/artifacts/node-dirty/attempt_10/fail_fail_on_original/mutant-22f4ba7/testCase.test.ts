import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should properly wait for pending writes before closing', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);
    let closeCalled = false;
    let drainEmitted = false;
    let writeCloseEmitted = false;

    db.on('load', () => {
      db.set('key1', { value: 'test1' }, () => {});

      // Track close call
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeCalled = true;
        originalClose();
      };

      db.on('drain', () => {
        drainEmitted = true;
        checkCompletion();
      });

      db.on('write_close', () => {
        writeCloseEmitted = true;
        checkCompletion();
      });

      const checkCompletion = () => {
        if (closeCalled && writeCloseEmitted && !drainEmitted) {
          done(new Error('Close completed without waiting for drain'));
        } else if (closeCalled && drainEmitted && writeCloseEmitted) {
          done();
        }
      };

      db.close();
    });

    db.on('error', (err) => {
      done(err);
    });

    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 1000);
  });
});