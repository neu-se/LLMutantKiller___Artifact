import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should not emit drain prematurely when queue has items', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCompleted = false;

    db.on('load', () => {
      // Set up drain listener
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Set a value with callback
      db.set('key1', { value: 1 }, () => {
        writeCompleted = true;
      });

      // Check immediately that drain hasn't been emitted yet
      // The mutation would incorrectly emit drain when queue has items
      setImmediate(() => {
        expect(drainEmitted).toBe(false);
        expect(writeCompleted).toBe(true);

        // Now wait for actual drain
        setTimeout(() => {
          expect(drainEmitted).toBe(true);
          db.close();
          fs.rmSync(testDir, { recursive: true });
          done();
        }, 100);
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});