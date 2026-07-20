import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close when _inFlightWrites > 0', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create a pending write operation
      db.set('key1', 'value1');

      // Manually set _inFlightWrites to simulate pending writes
      db._inFlightWrites = 1;

      // Track when close actually completes
      let closeCompleted = false;
      db.on('write_close', () => {
        closeCompleted = true;
      });

      // Attempt to close
      db.close();

      // Check immediately if close completed
      setImmediate(() => {
        if (closeCompleted) {
          // This should happen in mutated code (false condition)
          done(new Error('Close completed immediately despite pending writes'));
        } else {
          // This should happen in original code (proper delay)
          done();
        }
      });
    });
  });
});