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
    let allCallbacksCalled = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (allCallbacksCalled && drainCount === 1) {
          done();
        }
      });

      // Track when all write callbacks have been called
      let callbacksPending = 3;
      const callback = () => {
        callbacksPending--;
        if (callbacksPending === 0) {
          allCallbacksCalled = true;
          // At this point all writes are complete
          // The drain event should fire now if the queue is empty
        }
      };

      // Perform multiple writes
      db.set('key1', { value: 1 }, callback);
      db.set('key2', { value: 2 }, callback);
      db.set('key3', { value: 3 }, callback);
    });

    // Timeout to ensure test fails if drain never emits
    setTimeout(() => {
      done(new Error('Drain event was not emitted'));
    }, 200);
  });
});