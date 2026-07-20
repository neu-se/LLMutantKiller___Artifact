import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should correctly handle empty queue state', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Set a value without callback
      db.set('key1', { value: 1 });

      // Immediately check that drain was emitted (since no callbacks were queued)
      setImmediate(() => {
        expect(drainCount).toBe(1);
        expect(db.size()).toBe(1);

        // Now set another value with callback
        db.set('key2', { value: 2 }, () => {
          // This should trigger another drain after write completes
          setTimeout(() => {
            expect(drainCount).toBe(2);
            db.close();
            fs.rmSync(testDir, { recursive: true });
            done();
          }, 100);
        });
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});