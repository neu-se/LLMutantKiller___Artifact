import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write queue drain behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
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

  it('should emit drain event when write queue is empty and in-flight writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Add multiple writes to create a queue
      db.set('key1', { value: 'data1' });
      db.set('key2', { value: 'data2' });

      // Force a drain check by adding a write that will trigger the condition
      db.set('key3', { value: 'data3' }, () => {
        // After this callback, the queue should be empty
        // The drain event should be emitted from the write stream drain handler
        setImmediate(() => {
          if (drainEmitted) {
            done();
          } else {
            done(new Error('drain event was not emitted when queue became empty'));
          }
        });
      });

      db.on('drain', () => {
        drainEmitted = true;
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out - drain event was not emitted'));
    }, 1000);
  });
});