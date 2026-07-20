import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event with queue items and zero inFlightWrites after backpressure', () => {
  it('should emit drain when stream drains with queue pending and inFlightWrites equals 0', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    const timeout = setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Timed out: drain event never fired'));
    }, 8000);

    db.on('load', () => {
      const ws = db._writeStream;

      // We intercept write to:
      // 1. Return false (backpressure) so _waitForDrain=true and _flush breaks
      // 2. NOT call the callback yet, so _inFlightWrites stays > 0
      // 3. Then add more keys to queue
      // 4. Manually set _inFlightWrites to 0 and emit stream drain
      // so that queue.size > 0, _inFlightWrites === 0 -> original emits drain, mutated doesn't

      let capturedCb: ((err?: Error | null) => void) | null = null;

      const realWrite = ws.write.bind(ws);
      (ws as any).write = (data: string, cb: (err?: Error | null) => void): boolean => {
        (ws as any).write = realWrite;
        capturedCb = cb;
        // Don't call cb yet - keep _inFlightWrites at 1
        // Return false to set _waitForDrain = true
        return false;
      };

      db.set('key1', 'value1');

      // Now add more to queue while _waitForDrain is true (won't flush)
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Now manually: complete the in-flight write callback, then emit stream drain
      // After cb fires: _inFlightWrites goes 1->0, but _waitForDrain is true so no drain emitted
      // Then queue has key2, key3 pending
      // Then stream drain fires: _waitForDrain=false, queue.size>0, _inFlightWrites===0
      // Original: emits drain; Mutated: does not
      setImmediate(() => {
        if (capturedCb) capturedCb(null); // _inFlightWrites -> 0, _waitForDrain still true -> no drain
        setImmediate(() => {
          ws.emit('drain'); // triggers the handler: queue.size>0, _inFlightWrites===0
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