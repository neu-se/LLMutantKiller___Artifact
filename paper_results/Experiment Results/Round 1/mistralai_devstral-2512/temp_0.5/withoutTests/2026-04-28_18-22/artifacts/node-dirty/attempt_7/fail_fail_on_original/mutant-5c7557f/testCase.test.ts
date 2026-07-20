import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
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

  it('should emit drain event when queue is empty and inFlightWrites is zero', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, force a situation where queue is empty
          // but we need to check if drain is emitted again
          setImmediate(() => {
            // Manually set conditions that should trigger drain
            db._inFlightWrites = 0;
            db._flush();
          });
        } else if (drainCount === 2) {
          // This should only happen in original code
          done();
        }
      });

      // Add an item to trigger initial flush
      db.set('key1', { value: 1 }, () => {});
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out - second drain event not emitted'));
    }, 500);
  });
});