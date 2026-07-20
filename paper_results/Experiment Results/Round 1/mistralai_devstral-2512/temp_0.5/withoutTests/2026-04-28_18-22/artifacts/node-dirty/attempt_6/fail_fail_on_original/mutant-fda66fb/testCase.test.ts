import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should emit drain only when queue is empty', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Add an item to the queue
      db.set('key1', { value: 1 }, () => {
        // Immediately add another item to keep queue non-empty
        db.set('key2', { value: 2 }, () => {});

        // Listen for drain event
        db.on('drain', () => {
          drainEmitted = true;
        });

        // Wait to check if drain was emitted while queue was not empty
        setTimeout(() => {
          if (drainEmitted) {
            db.close();
            fs.rmSync(testDir, { recursive: true, force: true });
            done(new Error('Drain was emitted when queue was not empty'));
          } else {
            // Now clear the queue and verify drain is emitted
            db.set('key1', undefined, () => {
              db.set('key2', undefined, () => {
                setTimeout(() => {
                  if (drainEmitted) {
                    db.close();
                    fs.rmSync(testDir, { recursive: true, force: true });
                    done();
                  } else {
                    db.close();
                    fs.rmSync(testDir, { recursive: true, force: true });
                    done(new Error('Drain was not emitted when queue became empty'));
                  }
                }, 50);
              });
            });
          }
        }, 100);
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});