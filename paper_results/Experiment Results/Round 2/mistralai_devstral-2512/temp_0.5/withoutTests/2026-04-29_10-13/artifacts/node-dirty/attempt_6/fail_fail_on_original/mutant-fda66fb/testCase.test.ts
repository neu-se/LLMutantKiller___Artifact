import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should emit drain only when all writes complete', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        // In original code, drain should only fire once after all writes complete
        // In mutated code, it might fire prematurely
        if (drainCount === 1) {
          expect(writeCount).toBe(3); // All writes should be complete
          db.close();
          fs.rmSync(testDir, { recursive: true });
          done();
        }
      });

      // Perform multiple writes with callbacks
      db.set('key1', { value: 1 }, () => {
        writeCount++;
      });
      db.set('key2', { value: 2 }, () => {
        writeCount++;
      });
      db.set('key3', { value: 3 }, () => {
        writeCount++;
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});