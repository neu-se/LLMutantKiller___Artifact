import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  it('should emit drain when queue becomes empty after writes complete', (done) => {
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
      // Add items to queue
      db.set('key1', { value: 1 }, () => {});
      db.set('key2', { value: 2 }, () => {});

      db.on('drain', () => {
        drainCount++;
      });

      // Wait for writes to complete
      setTimeout(() => {
        if (drainCount === 1) {
          // Now verify queue is actually empty
          if (db.size() === 2) {
            db.close();
            fs.rmSync(testDir, { recursive: true, force: true });
            done();
          } else {
            db.close();
            fs.rmSync(testDir, { recursive: true, force: true });
            done(new Error('Queue was not properly flushed'));
          }
        } else {
          db.close();
          fs.rmSync(testDir, { recursive: true, force: true });
          done(new Error(`Expected drain to be emitted once, but it was emitted ${drainCount} times`));
        }
      }, 100);
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});