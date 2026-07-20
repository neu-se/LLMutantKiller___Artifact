import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event timing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when in-flight writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writesCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (!writesCompleted) {
          // This should not happen in original code but will in mutated code
          done(new Error('Drain event emitted prematurely before writes completed'));
        } else if (!drainEmitted) {
          drainEmitted = true;
          // This is the expected drain event
          done();
        }
      });

      // Start multiple writes
      db.set('key1', { value: 1 }, () => {
        db.set('key2', { value: 2 }, () => {
          db.set('key3', { value: 3 }, () => {
            writesCompleted = true;
            // At this point all writes are done but queue is empty
            // Original code will emit drain here
            // Mutated code won't emit drain because _inFlightWrites > 0 check is wrong
          });
        });
      });
    });
  });
});