import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes to complete', () => {
  it('should emit drain before write_close when close is called while writes are in-flight', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);
    let drainFired = false;

    db.on('load', () => {
      // set() calls _flush() synchronously, which moves the key from _queue to in-flight
      // After _flush(): _queue.size === 0, _inFlightWrites === 1
      // Original close(): (0 || 1>0) = true → registers drain listener and returns
      // Mutated close():  (0 && 1>0) = false → immediately destroys write stream
      db.set('foo', 'bar');
      db.close();

      db.once('drain', () => {
        drainFired = true;
      });

      db.once('write_close', () => {
        cleanup();
        // In the original code, close() waits for drain before closing the stream,
        // so drain must have fired before write_close.
        // In the mutated code, close() skips the wait and closes immediately,
        // so drain will NOT have fired before write_close.
        expect(drainFired).toBe(true);
        done();
      });
    });

    setTimeout(() => {
      cleanup();
      done(new Error('Test timed out - write_close never fired'));
    }, 5000);
  });
});