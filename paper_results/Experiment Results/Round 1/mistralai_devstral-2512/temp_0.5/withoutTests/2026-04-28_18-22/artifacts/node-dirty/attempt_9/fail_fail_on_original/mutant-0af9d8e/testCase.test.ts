import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event behavior', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
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

  it('should emit drain event when all writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let allWritesCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (allWritesCompleted) {
          // This is the expected drain event
          if (drainCount === 1) {
            done();
          }
        }
        // Note: We don't fail here because drain can emit multiple times
        // We only care about the final drain after all writes complete
      });

      // Track when all write callbacks have been called
      let callbacksPending = 2;
      const callback = () => {
        callbacksPending--;
        if (callbacksPending === 0) {
          allWritesCompleted = true;
          // At this point all writes are complete
          // The drain event should fire now if the queue is empty
        }
      };

      // Perform writes with callbacks
      db.set('key1', { value: 1 }, callback);
      db.set('key2', { value: 2 }, callback);

      // Timeout to ensure test fails if drain never emits after writes complete
      setTimeout(() => {
        if (!allWritesCompleted) {
          done(new Error('Write callbacks were not called'));
        } else if (drainCount === 0) {
          done(new Error('Expected drain event was not emitted'));
        }
      }, 200);
    });
  });
});