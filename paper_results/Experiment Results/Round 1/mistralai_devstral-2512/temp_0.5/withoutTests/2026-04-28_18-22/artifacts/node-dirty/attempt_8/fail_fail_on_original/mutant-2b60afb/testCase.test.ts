import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database drain event', () => {
  const testDbPath = path.join(os.tmpdir(), 'test-db-mutant-2b60afb-' + process.pid);
  let dirty: any;

  beforeEach((done) => {
    dirty = new (require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js"))(testDbPath);
    dirty.on('load', () => done());
  });

  afterEach(() => {
    dirty.close();
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('should emit drain event when queue is empty after multiple writes', (done) => {
    let drainCount = 0;
    let writesCompleted = 0;

    dirty.on('drain', () => {
      drainCount++;
      // We expect drain to be emitted when all writes complete and queue is empty
      if (writesCompleted === 3 && drainCount >= 1) {
        done();
      }
    });

    // Perform multiple writes to ensure we test the queue empty condition
    dirty.set('key1', { value: 'test1' }, () => {
      writesCompleted++;
      dirty.set('key2', { value: 'test2' }, () => {
        writesCompleted++;
        dirty.set('key3', { value: 'test3' }, () => {
          writesCompleted++;
          // At this point, all writes are complete and queue should be empty
          // Original code will emit drain when _queue.size is 0
          // Mutated code (if (false)) will never emit drain from this path
          setTimeout(() => {
            if (writesCompleted === 3 && drainCount === 0) {
              done(new Error('drain event was not emitted when queue became empty'));
            }
          }, 10);
        });
      });
    });
  });
});