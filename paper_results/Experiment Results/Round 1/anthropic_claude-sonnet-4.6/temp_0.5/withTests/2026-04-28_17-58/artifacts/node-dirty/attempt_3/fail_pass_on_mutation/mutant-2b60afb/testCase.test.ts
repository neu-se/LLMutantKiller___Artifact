import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event emission after write stream drain with empty queue', () => {
  it('should emit drain event exactly once after all writes complete when backpressure occurred', async () => {
    const file = path.join(os.tmpdir(), `dirty-mutation-${process.pid}-${Date.now()}.dirty`);

    try {
      const db = new Dirty(file);
      await new Promise<void>((resolve) => db.on('load', resolve));

      // Force _waitForDrain=true by writing one huge chunk, then verify drain fires.
      // The write callback path emits drain only if !_waitForDrain at callback time.
      // If _waitForDrain is still true when callback fires, drain is NOT emitted there.
      // It must come from the stream 'drain' handler - which the mutation breaks.
      const hugeValue = 'z'.repeat(1024 * 1024 * 2); // 2MB to ensure backpressure

      const drainCount = await new Promise<number>((resolve, reject) => {
        let count = 0;
        const timeout = setTimeout(() => {
          resolve(count);
        }, 3000);

        db.on('drain', () => {
          count++;
          // Give time to see if more drain events fire
          clearTimeout(timeout);
          setTimeout(() => resolve(count), 200);
        });

        // Single write - if it causes backpressure, _waitForDrain=true
        // write callback fires: --_inFlightWrites=0 but _waitForDrain=true => no drain emitted
        // then stream drain fires: original checks queue empty => emits drain
        // mutation: calls _flush() which returns immediately, never emits drain
        db.set('bigkey', hugeValue);
      });

      expect(drainCount).toBe(1);

      db.close();
      await new Promise<void>((resolve) => db.on('write_close', resolve));
    } finally {
      try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
    }
  });
});