import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should correctly handle drain event when queue is empty', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Set a value to add to the queue
      db.set('key1', { value: 1 }, () => {
        // After the first write completes, the queue should be empty
        // and drain should be emitted
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