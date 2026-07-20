import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with in-flight writes', () => {
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

      // Track when close is called
      let closeCalled = false;
      const originalClose = db.close.bind(db);
      db.close = () => {
        closeCalled = true;
        return originalClose();
      };

      // Try to close immediately
      db.close();

      // In original code, close should be delayed via 'drain' event
      // In mutated code, close will proceed immediately
      setImmediate(() => {
        if (closeCalled) {
          // If close was called immediately, check if write stream still exists
          if (db._writeStream) {
            // Original behavior: close was delayed
            done();
          } else {
            // Mutated behavior: close proceeded immediately
            done(new Error('Close was not properly delayed for in-flight writes'));
          }
        } else {
          // Original behavior: close was delayed
          done();
        }
      });
    });
  });
});