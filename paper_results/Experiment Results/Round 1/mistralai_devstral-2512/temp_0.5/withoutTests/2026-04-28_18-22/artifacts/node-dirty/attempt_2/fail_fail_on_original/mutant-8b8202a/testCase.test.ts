import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event timing', () => {
  it('should not emit drain event prematurely during writes', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCompleted = false;

    db.on('load', () => {
      // Set a value that will trigger a write operation
      db.set('key1', { value: 1 }, () => {
        writeCompleted = true;
      });

      db.on('drain', () => {
        drainEmitted = true;
        // In the original code, drain should only be emitted after the write completes
        // In the mutated code, drain will be emitted immediately (before write completes)
        if (!writeCompleted) {
          done(new Error('drain event emitted before write completed'));
        }
      });

      // Check after a short delay to ensure proper ordering
      setTimeout(() => {
        if (writeCompleted && drainEmitted) {
          done();
        } else if (!writeCompleted && drainEmitted) {
          done(new Error('drain event emitted before write completed'));
        } else {
          done(new Error('Test timed out or events not emitted as expected'));
        }
      }, 50);
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});