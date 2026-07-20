import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should not emit drain when queue has pending items', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;
    let callbackCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Set multiple values with callbacks
      db.set('key1', { value: 1 }, () => {
        callbackCount++;
        // After first callback, drain should not have been emitted yet
        // because there are still pending items in the queue
        if (callbackCount === 1) {
          expect(drainCount).toBe(0);
        }
      });

      db.set('key2', { value: 2 }, () => {
        callbackCount++;
      });

      db.set('key3', { value: 3 }, () => {
        callbackCount++;
      });

      // Wait for all operations to complete
      setTimeout(() => {
        expect(callbackCount).toBe(3);
        expect(drainCount).toBe(1); // Should only emit once at the end
        db.close();
        fs.rmSync(testDir, { recursive: true });
        done();
      }, 200);
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});