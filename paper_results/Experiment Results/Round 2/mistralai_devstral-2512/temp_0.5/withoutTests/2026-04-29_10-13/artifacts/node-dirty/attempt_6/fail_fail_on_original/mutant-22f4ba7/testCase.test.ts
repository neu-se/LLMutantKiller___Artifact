import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should wait for pending writes before closing', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      let closeCompleted = false;
      let drainEmitted = false;

      db.set('key1', { value: 'test1' }, () => {});

      // Override close to track when it completes
      const originalClose = db.close.bind(db);
      db.close = function() {
        originalClose();
        closeCompleted = true;
        checkCompletion();
      };

      db.on('drain', () => {
        drainEmitted = true;
        checkCompletion();
      });

      const checkCompletion = () => {
        if (closeCompleted && !drainEmitted) {
          done(new Error('Close completed before drain was emitted'));
        } else if (closeCompleted && drainEmitted) {
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