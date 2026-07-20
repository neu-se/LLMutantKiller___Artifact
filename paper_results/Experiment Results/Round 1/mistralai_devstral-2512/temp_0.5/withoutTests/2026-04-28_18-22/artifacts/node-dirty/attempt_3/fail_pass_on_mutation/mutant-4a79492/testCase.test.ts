import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event only when queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Add multiple items to the queue
      db.set('key1', { value: 1 });
      db.set('key2', { value: 2 });

      // Force a drain event by writing enough data to trigger backpressure
      const largeData = { value: 'x'.repeat(10000) };
      db.set('key3', largeData);

      // Check if drain was emitted prematurely
      setImmediate(() => {
        if (drainEmitted) {
          done(new Error('Drain event was emitted while queue still had items'));
        } else {
          // Now wait for actual drain
          db.on('drain', () => {
            drainEmitted = true;
            // Verify queue is actually empty
            if (db._queue.size !== 0) {
              done(new Error('Drain emitted but queue is not empty'));
            } else {
              done();
            }
          });
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});