import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  it('should emit drain event when all writes complete', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set multiple values to ensure we have items in the queue
      db.set('key1', { value: 1 }, () => {});
      db.set('key2', { value: 2 }, () => {});

      // Force immediate flush by setting path to null after initial writes
      // This simulates the condition where _queue.size would be checked
      const originalPath = db.path;
      db.path = null;

      // The drain event should be emitted when all writes complete
      db.on('drain', () => {
        db.path = originalPath;
        db.close();
        rimraf.sync(testDir);
        done();
      });
    });

    db.on('error', (err) => {
      db.close();
      rimraf.sync(testDir);
      done(err);
    });
  });
});