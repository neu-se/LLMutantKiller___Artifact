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

  it('should emit drain event only when in-flight writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writesInProgress = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (writesInProgress > 0) {
          // This should never happen in original code
          done(new Error(`Drain emitted while ${writesInProgress} writes still in progress`));
        }
      });

      // Track write operations
      const writeComplete = () => {
        writesInProgress--;
        if (writesInProgress === 0) {
          // All writes complete, now we expect drain
          setTimeout(() => {
            if (drainCount === 0) {
              done(new Error('Expected drain event was not emitted'));
            } else {
              done();
            }
          }, 100);
        }
      };

      // Perform writes with callbacks
      writesInProgress++;
      db.set('key1', { value: 1 }, writeComplete);

      writesInProgress++;
      db.set('key2', { value: 2 }, writeComplete);

      writesInProgress++;
      db.set('key3', { value: 3 }, writeComplete);
    });
  });
});