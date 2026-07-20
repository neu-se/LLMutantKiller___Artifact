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

  it('should emit drain event when write stream drains and queue is empty', (done) => {
    let drainEmitted = false;

    dirty.on('drain', () => {
      drainEmitted = true;
    });

    // Write data that will trigger the drain event path
    const testData = { value: 'x'.repeat(10000) };
    dirty.set('testKey', testData, () => {
      // After write completes, force a drain scenario
      // The original code checks: if (!this._queue.size)
      // The mutated code checks: if (false)
      setTimeout(() => {
        if (drainEmitted) {
          done();
        } else {
          done(new Error('drain event was not emitted when expected'));
        }
      }, 100);
    });
  });
});