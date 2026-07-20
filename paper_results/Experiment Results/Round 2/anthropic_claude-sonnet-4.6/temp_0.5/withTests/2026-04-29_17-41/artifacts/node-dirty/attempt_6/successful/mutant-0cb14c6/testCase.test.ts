import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event with empty queue and zero inFlightWrites after backpressure', () => {
  it('should emit drain when stream drains with empty queue and inFlightWrites equals 0', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    const timeout = setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Timed out: drain event never fired'));
    }, 8000);

    db.on('load', () => {
      const ws = db._writeStream;

      // Strategy:
      // 1. Intercept write() to return false (_waitForDrain=true) but still call cb
      // 2. Queue is empty after the single write (only one key set)
      // 3. Write callback fires: _inFlightWrites goes to 0, but _waitForDrain=true so no drain
      // 4. Then manually emit stream 'drain': queue empty, _inFlightWrites===0
      //    Original (<=0): emits drain ✓
      //    Mutated (<0): does NOT emit drain ✗

      let capturedCb: ((err?: Error | null) => void) | null = null;

      const realWrite = ws.write.bind(ws);
      (ws as any).write = (data: string, cb: (err?: Error | null) => void): boolean => {
        // Restore so future writes work
        (ws as any).write = realWrite;
        capturedCb = cb;
        // Don't call cb yet - _inFlightWrites stays at 1
        // Return false -> _waitForDrain = true
        return false;
      };

      db.set('key1', 'value1');
      // queue is now empty (key1 was flushed into in-flight write)
      // _inFlightWrites = 1, _waitForDrain = true

      setImmediate(() => {
        // Fire the write callback: _inFlightWrites -> 0
        // Since _waitForDrain is still true, the callback won't emit drain
        if (capturedCb) capturedCb(null);

        setImmediate(() => {
          // Now: queue.size === 0, _inFlightWrites === 0, _waitForDrain === true
          // Emit stream drain event manually
          // Handler sets _waitForDrain=false, queue empty, _inFlightWrites===0
          // Original: emits drain; Mutated: does not
          ws.emit('drain');
        });
      });

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});