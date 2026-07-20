import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: any;

  beforeEach(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
  });

  afterEach(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
  });

  it('should properly handle close with pending writes', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      let closeCompleted = false;
      let drainFired = false;

      // Set up listeners
      db.on('drain', () => {
        drainFired = true;
      });

      db.on('write_close', () => {
        closeCompleted = true;
        // In original code, drain should fire before write_close
        // In mutated code, write_close fires immediately without waiting for drain
        if (!drainFired) {
          done(new Error('write_close fired before drain - mutation detected'));
        } else {
          done();
        }
      });

      // Add data with callback to ensure it's queued
      db.set('key1', 'value1', () => {
        // Immediately call close while there are pending writes
        db.close();
      });
    });
  });
});