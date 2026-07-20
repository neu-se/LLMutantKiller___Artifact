import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close with in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-close-inflight.dirty');
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
      // Set a value to create in-flight writes
      db.set('key1', 'value1');

      // Force _inFlightWrites to be > 0
      db._inFlightWrites = 1;

      // Track close completion
      let closeCompleted = false;
      db.on('write_close', () => {
        closeCompleted = true;
      });

      // Try to close immediately
      db.close();

      // In original code, close should be delayed
      // In mutated code, close will proceed immediately
      setImmediate(() => {
        if (closeCompleted) {
          // Mutated behavior: close completed immediately
          done(new Error('Close completed immediately despite in-flight writes'));
        } else {
          // Original behavior: close was delayed
          done();
        }
      });
    });
  });
});