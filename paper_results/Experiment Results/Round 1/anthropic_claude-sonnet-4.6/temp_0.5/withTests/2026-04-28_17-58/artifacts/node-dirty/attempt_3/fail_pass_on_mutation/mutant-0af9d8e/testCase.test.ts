import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event emitted correctly after write stream backpressure', () => {
  it('should emit drain event when stream drains, queue is empty, and inFlightWrites is zero', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      // We need to get into the state where:
      // 1. _waitForDrain becomes true (backpressure triggered)
      // 2. All write callbacks fire (inFlightWrites goes to 0) before stream drain event
      // 3. Queue is empty when stream drain fires
      //
      // Strategy: write one large batch that triggers backpressure.
      // The write callbacks for the in-flight writes will fire, decrementing
      // _inFlightWrites to 0. But since _waitForDrain is true, the write callback
      // won't emit 'drain'. Then when the stream drain event fires, queue is empty
      // and _inFlightWrites === 0, so original emits 'drain' but mutation doesn't.

      // Use a large highWaterMark-exceeding write to force backpressure
      // Default highWaterMark for streams is 16KB
      // Write one very large value to exceed it in a single write call
      const largeValue = 'x'.repeat(100 * 1024); // 100KB, well over 16KB highWaterMark

      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(new Error('drain event was never emitted'));
      }, 8000);

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done();
      });

      // Set a single large value - this single write should exceed highWaterMark
      // causing _waitForDrain = true, and since queue is now empty after this one
      // write, when stream drains: queue empty, inFlightWrites should be 0
      db.set('bigkey', largeValue);
    });
  });
});