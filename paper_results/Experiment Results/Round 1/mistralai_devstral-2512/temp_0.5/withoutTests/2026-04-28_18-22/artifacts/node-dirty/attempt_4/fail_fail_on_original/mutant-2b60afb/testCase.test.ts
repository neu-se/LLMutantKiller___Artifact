import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database drain event', () => {
  const testDbPath = path.join(os.tmpdir(), 'test-db-mutant-2b60afb-' + Date.now());
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

  it('should emit drain event when queue is empty after write completes', (done) => {
    dirty.on('drain', () => {
      done();
    });

    // The drain event should be emitted after this write completes
    // In the original code, when _queue.size is 0, drain is emitted
    // In the mutated code (if (false)), drain will never be emitted from this path
    dirty.set('testKey', { value: 'testValue' }, () => {
      // This callback fires when the write is complete
      // The drain event should follow shortly after
    });

    // Set a timeout to fail the test if drain isn't emitted
    setTimeout(() => {
      done(new Error('drain event was not emitted'));
    }, 1000);
  });
});