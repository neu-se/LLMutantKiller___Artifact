import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database queue handling', () => {
  it('should correctly handle drain event when queue transitions from non-empty to empty', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writesCompleted = 0;

    db.on('load', () => {
      // Add items to queue
      db.set('key1', { value: 1 }, () => {
        writesCompleted++;
        if (writesCompleted === 2) {
          // After both writes complete, queue should be empty
          setTimeout(() => {
            if (drainCount === 1) {
              db.close();
              fs.rmSync(testDir, { recursive: true, force: true });
              done();
            } else {
              db.close();
              fs.rmSync(testDir, { recursive: true, force: true });
              done(new Error(`Expected drain to be emitted once, but it was emitted ${drainCount} times`));
            }
          }, 50);
        }
      });

      db.set('key2', { value: 2 }, () => {
        writesCompleted++;
      });

      db.on('drain', () => {
        drainCount++;
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});