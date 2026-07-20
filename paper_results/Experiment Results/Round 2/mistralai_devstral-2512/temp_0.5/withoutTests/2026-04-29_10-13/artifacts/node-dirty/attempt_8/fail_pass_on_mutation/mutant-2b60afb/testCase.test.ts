import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain condition test', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should emit drain when queue is empty after writes', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writesCompleted = 0;

    db.on('load', () => {
      // Add multiple writes to create a queue
      db.set('key1', { value: 'data1' }, () => {
        writesCompleted++;
        checkCompletion();
      });
      db.set('key2', { value: 'data2' }, () => {
        writesCompleted++;
        checkCompletion();
      });

      function checkCompletion() {
        if (writesCompleted === 2) {
          // After both writes complete, the queue should be empty
          // The drain event should be emitted from the write stream drain handler
          setImmediate(() => {
            if (drainEmitted) {
              done();
            } else {
              // This is where the mutation would fail - the condition is always false
              done(new Error('drain event was not emitted when queue became empty'));
            }
          });
        }
      }

      db.on('drain', () => {
        drainEmitted = true;
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});