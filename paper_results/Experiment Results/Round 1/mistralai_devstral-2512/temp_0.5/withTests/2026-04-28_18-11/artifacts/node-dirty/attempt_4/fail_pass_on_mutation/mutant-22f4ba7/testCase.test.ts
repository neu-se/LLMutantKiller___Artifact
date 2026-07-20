import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
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

  it('should wait for drain before closing', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      let drainFired = false;
      let closeCompleted = false;

      db.on('drain', () => {
        drainFired = true;
      });

      db.on('write_close', () => {
        closeCompleted = true;
        // In original code, drain should fire before write_close
        // In mutated code, write_close fires immediately
        if (!drainFired) {
          done(new Error('write_close fired before drain - mutation detected'));
        }
      });

      // Add data with callback to ensure it's queued
      db.set('key', 'value', () => {
        // Call close while there are pending writes
        db.close();
      });

      // Give time for events to fire
      setTimeout(() => {
        if (closeCompleted && !drainFired) {
          done(new Error('Close completed without drain firing'));
        } else {
          done();
        }
      }, 100);
    });
  });
});