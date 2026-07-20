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
    let loadFired = false;
    let drainCount = 0;

    db.on('load', () => {
      loadFired = true;
      // Set up drain listener after load
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // First drain should occur after the write completes
          // Now force a situation where queue is empty but we need another drain
          setImmediate(() => {
            // The mutation would prevent this second drain from firing
            // because it removes the condition checking inFlightWrites
            expect(drainCount).toBe(2);
            done();
          });
        }
      });

      // Add an item to trigger flush
      db.set('key1', { value: 1 }, () => {});
    });
  });
});