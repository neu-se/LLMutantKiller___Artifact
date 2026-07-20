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

  it('should emit drain event only when queue is empty and no writes in flight', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let allWritesCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (!allWritesCompleted) {
          // This should never happen in original code
          done(new Error('Drain event emitted while writes still in progress'));
        } else if (!drainEmitted) {
          drainEmitted = true;
          // This is the expected drain event
          done();
        }
      });

      // First write
      db.set('key1', { value: 1 }, () => {
        // Second write
        db.set('key2', { value: 2 }, () => {
          // Third write
          db.set('key3', { value: 3 }, () => {
            allWritesCompleted = true;
            // Force a flush to ensure all writes are processed
            db.set('key4', { value: 4 }, () => {
              // At this point all writes should be complete
              // and queue should be empty
            });
          });
        });
      });
    });
  });
});