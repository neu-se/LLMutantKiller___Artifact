import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  it('should not emit drain event when writes are still pending', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set a value with a callback
      db.set('key1', { value: 1 }, () => {
        // This callback should be called, but drain should not be emitted yet
        // because the mutation would incorrectly trigger drain when queue has items
      });

      // Immediately check that drain has NOT been emitted yet
      // (we'll verify this by setting a timeout to check if drain was emitted)
      let drainEmitted = false;
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Wait a bit to see if drain gets emitted (it shouldn't in original code)
      setTimeout(() => {
        expect(drainEmitted).toBe(false);
        db.close();
        rimraf.sync(testDir);
        done();
      }, 100);
    });

    db.on('error', (err) => {
      db.close();
      rimraf.sync(testDir);
      done(err);
    });
  });
});