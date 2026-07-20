import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event emission', () => {
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

  it('should emit drain when write queue becomes empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Add multiple writes to create a queue
      db.set('key1', { value: 'data1' });
      db.set('key2', { value: 'data2' });
      db.set('key3', { value: 'data3' });

      // The drain event should be emitted when all writes complete
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify the queue is actually empty
          if (db.size() === 3) {
            done();
          } else {
            done(new Error('Database size incorrect'));
          }
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out - drain event was not emitted'));
    }, 2000);
  });
});