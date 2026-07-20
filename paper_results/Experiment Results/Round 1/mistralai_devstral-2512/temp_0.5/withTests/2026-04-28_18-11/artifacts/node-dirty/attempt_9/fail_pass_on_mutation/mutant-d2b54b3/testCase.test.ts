import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission test', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, which is fine
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, which is fine
    }
  });

  it('should emit drain event when write stream drains with empty queue and no in-flight writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Write data to trigger flush
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      let drainEmitted = false;
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Force a drain by closing the stream
      setTimeout(() => {
        db.close();
        setTimeout(() => {
          // The mutation changes the condition from `if (this._inFlightWrites <= 0)`
          // to `if (false)`, which prevents drain from being emitted when the
          // queue is empty and all writes have completed
          expect(drainEmitted).toBe(true);
          done();
        }, 100);
      }, 100);
    });
  });
});