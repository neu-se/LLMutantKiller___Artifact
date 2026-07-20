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
      // Force _inFlightWrites to be > 0 by setting a value
      db.set('key1', 'value1');

      // Immediately try to close while writes are in flight
      let closeCalled = false;
      db.close();

      // In original code, close should be delayed
      // In mutated code, close will proceed immediately
      setImmediate(() => {
        if (db._writeStream) {
          // Original behavior: write stream still exists (close delayed)
          done();
        } else {
          // Mutated behavior: write stream already destroyed (close not delayed)
          done(new Error('Close was not properly delayed for in-flight writes'));
        }
      });
    });
  });
});