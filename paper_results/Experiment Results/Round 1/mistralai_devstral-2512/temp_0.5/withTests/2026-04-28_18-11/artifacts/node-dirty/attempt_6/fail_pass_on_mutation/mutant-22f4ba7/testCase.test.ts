import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close behavior with pending writes', () => {
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

  it('should wait for pending writes before closing', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      let closeCompleted = false;
      let drainFired = false;

      db.on('drain', () => {
        drainFired = true;
      });

      db.on('write_close', () => {
        closeCompleted = true;
      });

      // Add data to create pending writes
      db.set('key', 'value', () => {
        // Immediately call close while there are pending writes
        db.close();
      });

      // Check the order of events
      setImmediate(() => {
        if (closeCompleted && !drainFired) {
          // This should happen in mutated code
          done(new Error('write_close fired before drain - mutation detected'));
        } else {
          // Original behavior - drain fires before write_close
          done();
        }
      });
    });
  });
});