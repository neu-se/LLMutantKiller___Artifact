import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event behavior', () => {
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

  it('should emit drain only when queue is empty and no writes are in flight', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let allWritesCompleted = false;

    db.on('load', () => {
      // Add multiple items to queue
      db.set('key1', { value: 1 }, () => {
        db.set('key2', { value: 2 }, () => {
          db.set('key3', { value: 3 }, () => {
            allWritesCompleted = true;
          });
        });
      });
    });

    db.on('drain', () => {
      drainCount++;
      if (!allWritesCompleted) {
        done(new Error('Drain emitted before all writes completed'));
      } else if (drainCount > 1) {
        done(new Error('Drain emitted multiple times'));
      } else if (db._queue.size > 0 || db._inFlightWrites > 0) {
        done(new Error('Drain emitted while queue or in-flight writes are not empty'));
      } else {
        done();
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});