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

  it('should emit drain event when queue is empty and inFlightWrites reaches zero', (done) => {
    let drainEmitted = false;
    let writeCallbackCalled = false;

    dirty.on('drain', () => {
      if (writeCallbackCalled) {
        drainEmitted = true;
        done();
      }
    });

    dirty.set('testKey', { value: 'testValue' }, () => {
      writeCallbackCalled = true;
      // At this point, the write has completed and queue should be empty
      // The original code will emit drain when _queue.size is 0
      // The mutated code (if (false)) will never emit drain from this path
      setTimeout(() => {
        if (!drainEmitted) {
          done(new Error('drain event was not emitted when expected'));
        }
      }, 10);
    });
  });
});