import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  it('should emit drain event only when all writes are complete', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Set multiple values to ensure multiple writes
      db.set('key1', { value: 1 }, () => {
        // This callback should be called before drain
      });
      db.set('key2', { value: 2 }, () => {
        // This callback should be called before drain
      });

      db.on('drain', () => {
        drainCount++;
        // In the original code, drain should only be emitted once when all writes complete
        // In the mutated code, drain will be emitted immediately after each write
        if (drainCount > 1) {
          // This should never happen in the original code
          done(new Error('drain event emitted too many times'));
        }
      });

      // Wait a bit to ensure all operations complete
      setTimeout(() => {
        if (drainCount === 1) {
          done();
        } else {
          done(new Error('drain event not emitted exactly once'));
        }
      }, 100);
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});