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

  it('should emit drain event when queue becomes empty during write stream drain', (done) => {
    let drainEmitted = false;

    dirty.on('drain', () => {
      drainEmitted = true;
    });

    // Write enough data to potentially trigger backpressure
    const largeData = { value: 'x'.repeat(10000) };
    dirty.set('largeKey', largeData, () => {
      // After the write completes, the drain event should be emitted
      // when the queue becomes empty in the drain handler
      setTimeout(() => {
        if (drainEmitted) {
          done();
        } else {
          done(new Error('drain event was not emitted when queue became empty'));
        }
      }, 50);
    });
  });
});