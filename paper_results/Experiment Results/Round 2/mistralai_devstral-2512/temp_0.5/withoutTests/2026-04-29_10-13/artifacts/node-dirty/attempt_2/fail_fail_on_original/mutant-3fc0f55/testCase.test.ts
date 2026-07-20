import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write stream drain handling', () => {
  it('should properly handle drain events and continue flushing queue', (done) => {
    const testDir = path.join(__dirname, 'test-dirty-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let firstDrainCount = 0;
    let secondDrainCount = 0;
    let allDataWritten = false;

    db.on('load', () => {
      // Write first batch of data
      for (let i = 0; i < 50; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }

      // Force flush to trigger drain
      db._flush();

      // Write second batch after a small delay to ensure it's queued
      setImmediate(() => {
        for (let i = 50; i < 100; i++) {
          db.set(`key${i}`, { value: `data${i}` });
        }
        db._flush();
      });
    });

    db.on('drain', () => {
      if (db.size() === 50 && firstDrainCount === 0) {
        firstDrainCount++;
      } else if (db.size() === 100) {
        secondDrainCount++;
        allDataWritten = true;
        db.close();
      }
    });

    db.on('write_close', () => {
      expect(firstDrainCount).toBe(1);
      expect(secondDrainCount).toBe(1);
      expect(allDataWritten).toBe(true);
      expect(db.size()).toBe(100);
      rimraf.sync(testDir);
      done();
    });

    db.on('error', (err) => {
      rimraf.sync(testDir);
      done(err);
    });
  });
});