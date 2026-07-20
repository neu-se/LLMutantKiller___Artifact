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

  it('should emit drain event when write stream becomes available after backpressure', (done) => {
    let drainCount = 0;

    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 2) {
        done();
      }
    });

    // First write to establish baseline
    dirty.set('key1', { value: 'test1' }, () => {
      // Second write that might trigger backpressure
      dirty.set('key2', { value: 'test2' }, () => {
        // The drain event should be emitted when the write stream
        // becomes available again and the queue is empty
        // Original code: if (!this._queue.size) { this.emit('drain') }
        // Mutated code: if (false) { ... } - will never emit drain
      });
    });
  });
});