import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write stream drain handling', () => {
  it('should emit drain event when write stream is drained', (done) => {
    const testDir = path.join(__dirname, 'test-dirty-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Write enough data to potentially trigger drain
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, { value: `data${i}` }, (err) => {
          if (err) done(err);
        });
      }

      // Force flush to ensure we're testing the drain behavior
      db._flush();

      db.on('drain', () => {
        drainEmitted = true;
        db.close();
      });
    });

    db.on('write_close', () => {
      expect(drainEmitted).toBe(true);
      rimraf.sync(testDir);
      done();
    });

    db.on('error', (err) => {
      rimraf.sync(testDir);
      done(err);
    });
  });
});