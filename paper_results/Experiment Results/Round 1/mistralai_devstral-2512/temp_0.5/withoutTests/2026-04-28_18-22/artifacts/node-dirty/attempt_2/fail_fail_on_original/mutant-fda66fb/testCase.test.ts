import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  it('should not emit drain event when queue is not empty', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Set a value to add to the queue
      db.set('key1', { value: 1 }, () => {});

      // Force a situation where _queue.size is not empty
      // by adding another item to the queue
      db.set('key2', { value: 2 }, () => {});

      // Listen for drain event
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Wait a bit to see if drain is emitted
      setTimeout(() => {
        if (drainEmitted) {
          db.close();
          rimraf.sync(testDir);
          done(new Error('Drain event was emitted when queue was not empty'));
        } else {
          db.close();
          rimraf.sync(testDir);
          done();
        }
      }, 100);
    });

    db.on('error', (err) => {
      db.close();
      rimraf.sync(testDir);
      done(err);
    });
  });
});