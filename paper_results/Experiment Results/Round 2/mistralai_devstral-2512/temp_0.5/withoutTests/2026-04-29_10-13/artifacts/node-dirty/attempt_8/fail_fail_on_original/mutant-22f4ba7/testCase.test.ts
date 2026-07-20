import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should not close streams immediately when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);
    let closeCompleted = false;
    let drainEmitted = false;

    db.on('load', () => {
      db.set('key1', { value: 'test1' }, () => {});

      // Track when close actually completes
      const originalClose = db.close.bind(db);
      db.close = function() {
        originalClose();
        closeCompleted = true;
        verifyBehavior();
      };

      db.on('drain', () => {
        drainEmitted = true;
        verifyBehavior();
      });

      const verifyBehavior = () => {
        if (closeCompleted && !drainEmitted) {
          // This is the mutated behavior - close completed without drain
          done(new Error('Close completed before drain was emitted'));
        } else if (closeCompleted && drainEmitted) {
          // This is the correct original behavior
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