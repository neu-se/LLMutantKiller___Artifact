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

  it('should delay close when only _inFlightWrites > 0', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create a scenario where only _inFlightWrites > 0 (queue is empty)
      db._inFlightWrites = 1;
      db._queue.clear();

      // Track if close was delayed
      let drainFired = false;
      db.on('drain', () => {
        drainFired = true;
      });

      // Track close completion
      let closeCompleted = false;
      db.on('write_close', () => {
        closeCompleted = true;
      });

      // Try to close
      db.close();

      // In original code: should wait for drain event before closing
      // In mutated code: will close immediately without waiting for drain
      setImmediate(() => {
        if (closeCompleted && !drainFired) {
          // Mutated behavior: closed without waiting for drain
          done(new Error('Close completed without waiting for in-flight writes'));
        } else if (!closeCompleted && !drainFired) {
          // Original behavior: waiting for drain before closing
          done();
        } else {
          done(new Error('Unexpected behavior'));
        }
      });
    });
  });
});