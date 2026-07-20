import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should emit drain only when queue is empty', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Set up drain listener
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Set a value with callback
      db.set('key1', { value: 1 }, () => {
        // Callback executed, but drain should not be emitted yet
        // because the mutation would incorrectly check if queue has items
        expect(drainEmitted).toBe(false);

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