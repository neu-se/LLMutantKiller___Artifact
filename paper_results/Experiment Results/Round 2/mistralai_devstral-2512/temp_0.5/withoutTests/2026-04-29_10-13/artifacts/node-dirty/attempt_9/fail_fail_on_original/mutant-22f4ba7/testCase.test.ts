import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should wait for drain event when closing with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);
    let closeTriggered = false;
    let drainEmitted = false;

    db.on('load', () => {
      db.set('key1', { value: 'test1' }, () => {});

      // Track when close is triggered
      const originalClose = db.close.bind(db);
      db.close = function() {
        closeTriggered = true;
        originalClose();
      };

      db.on('drain', () => {
        drainEmitted = true;
        if (closeTriggered) {
          done();
        }
      });

      db.close();

      // Check after a short delay to see if close waited for drain
      setTimeout(() => {
        if (closeTriggered && !drainEmitted) {
          done(new Error('Close did not wait for drain event'));
        }
      }, 100);
    });

    db.on('error', (err) => {
      done(err);
    });

    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 2000);
  });
});