import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event timing', () => {
  it('should not emit drain prematurely when queue is not empty', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writesCompleted = 0;

    db.on('load', () => {
      // Add multiple items to queue
      db.set('key1', { value: 1 }, () => {
        writesCompleted++;
      });
      db.set('key2', { value: 2 }, () => {
        writesCompleted++;
      });

      db.on('drain', () => {
        // Drain should only be emitted when queue is empty AND all writes are complete
        if (writesCompleted < 2) {
          drainEmitted = true;
        }
      });

      // Check if drain was emitted before all writes completed
      setTimeout(() => {
        if (drainEmitted) {
          db.close();
          fs.rmSync(testDir, { recursive: true, force: true });
          done(new Error('Drain was emitted before all writes completed'));
        } else {
          db.close();
          fs.rmSync(testDir, { recursive: true, force: true });
          done();
        }
      }, 50);
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});