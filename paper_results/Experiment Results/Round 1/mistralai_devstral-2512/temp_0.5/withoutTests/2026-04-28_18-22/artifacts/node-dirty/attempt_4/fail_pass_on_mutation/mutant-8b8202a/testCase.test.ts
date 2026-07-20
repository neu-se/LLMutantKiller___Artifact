import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event behavior', () => {
  it('should emit drain event only when write queue is empty and no writes are in flight', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCallbacksCompleted = 0;
    const totalWrites = 2;

    db.on('load', () => {
      // Perform writes with callbacks
      db.set('key1', { value: 1 }, () => {
        writeCallbacksCompleted++;
      });

      db.set('key2', { value: 2 }, () => {
        writeCallbacksCompleted++;
      });

      db.on('drain', () => {
        drainCount++;
        // In original code, drain should only be emitted once after all writes complete
        // In mutated code, drain will be emitted multiple times during writes
      });

      // Verify final state after a delay
      setTimeout(() => {
        if (drainCount === 1 && writeCallbacksCompleted === totalWrites) {
          done();
        } else {
          done(new Error(`Expected 1 drain event but got ${drainCount}, writes completed: ${writeCallbacksCompleted}`));
        }
      }, 100);
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});