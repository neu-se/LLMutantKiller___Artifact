import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  it('should correctly handle multiple rapid writes', (done) => {
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

      // Perform multiple rapid writes
      for (let i = 0; i < 10; i++) {
        db.set(`key${i}`, { value: i }, () => {});
      }

      // Check after a short delay that drain was emitted exactly once
      setTimeout(() => {
        expect(drainCount).toBe(1);
        expect(db.size()).toBe(10);
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