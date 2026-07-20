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

  it('should emit drain event when write stream drains and queue becomes empty', (done) => {
    let drainCount = 0;
    let writeCompleted = false;

    dirty.on('drain', () => {
      drainCount++;
      if (writeCompleted && drainCount === 1) {
        done();
      }
    });

    // Perform a write operation
    dirty.set('key1', { value: 'test1' }, () => {
      writeCompleted = true;
      // At this point, the write is complete and queue should be empty
      // The original code will emit drain when _queue.size is 0 in the drain handler
      // The mutated code (if (false)) will never emit drain from this path
    });

    // Set a timeout to fail the test if drain isn't emitted
    setTimeout(() => {
      if (!drainCount) {
        done(new Error('drain event was not emitted when queue became empty'));
      }
    }, 200);
  });
});