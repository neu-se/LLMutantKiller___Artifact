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

  it('should delay close when _inFlightWrites > 0 but queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Create a scenario where only _inFlightWrites > 0 (queue is empty)
      db._inFlightWrites = 1;
      db._queue.clear();

      // Track close completion
      let closeCompleted = false;
      db.on('write_close', () => {
        closeCompleted = true;
      });

      // Try to close
      db.close();

      // In original code: close should be delayed (closeCompleted remains false)
      // In mutated code: close will proceed immediately (closeCompleted becomes true)
      setImmediate(() => {
        if (closeCompleted) {
          done(new Error('Close completed immediately despite in-flight writes'));
        } else {
          // Verify the drain event will eventually fire
          db.on('drain', () => {
            setImmediate(() => {
              if (!closeCompleted) {
                done(new Error('Close was delayed but never completed'));
              } else {
                done();
              }
            });
          });
        }
      });
    });
  });
});