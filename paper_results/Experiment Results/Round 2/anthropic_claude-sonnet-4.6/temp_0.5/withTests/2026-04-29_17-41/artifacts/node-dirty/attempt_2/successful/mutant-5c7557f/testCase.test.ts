import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', async () => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-drain-${Date.now()}-${process.pid}.dirty`);

    try {
      const DirtyModule = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
      const Dirty = DirtyModule.Dirty;
      const db = new Dirty(file);

      await new Promise<void>((resolve) => db.on('load', () => resolve()));

      const drainPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(
          () => reject(new Error('drain event was never emitted')),
          3000
        );
        db.once('drain', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      // Set up the exact state that occurs after backpressure:
      // - _waitForDrain is true (write returned false, signaling backpressure)
      // - _queue is empty (no pending writes)
      // - _inFlightWrites is 0 (all writes completed)
      db._waitForDrain = true;
      db._inFlightWrites = 0;

      // Emit drain on the write stream to trigger the handler in dirty.js.
      // Original code: checks queue size, finds it empty, checks inFlightWrites <= 0, emits 'drain' on db.
      // Mutated code: checks queue size, finds it empty, does nothing (drain never emitted on db).
      db._writeStream.emit('drain');

      await drainPromise;
    } finally {
      try {
        fs.unlinkSync(file);
      } catch (_) {
        // ignore cleanup errors
      }
    }
  });
});