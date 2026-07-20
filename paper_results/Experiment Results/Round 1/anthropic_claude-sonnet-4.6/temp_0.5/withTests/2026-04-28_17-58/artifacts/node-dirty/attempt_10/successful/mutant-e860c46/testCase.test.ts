import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close waits for in-flight writes', () => {
  it('should emit drain even when close is called during backpressure with empty queue', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-close-drain-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let drainFired = false;

    db.on('error', () => {}); // suppress errors

    db.on('load', () => {
      db.on('drain', () => {
        drainFired = true;
      });

      // Write a large value to trigger backpressure so _waitForDrain becomes true
      // When _waitForDrain=true: write callback won't emit drain, only stream drain event will
      // After _flush with backpressure: _queue.size=0 (all flushed until backpressure)
      // _inFlightWrites=1, _waitForDrain=true
      // Original: close() sees _inFlightWrites>0, waits for drain
      //   stream drain fires -> _waitForDrain=false, _queue empty -> emit('drain')
      //   drain handler calls close() again -> writeStream.end()
      // Mutated: close() calls writeStream.end() immediately
      //   stream drain event may NOT fire after end() called
      //   write callback fires but _waitForDrain=true so drain NOT emitted from callback
      //   -> drain never fires!

      // Write enough to guarantee backpressure
      const bigValue = Buffer.alloc(1024 * 1024, 'x').toString(); // 1MB
      db.set('bigkey', bigValue);

      // Use setImmediate to ensure _flush has run and _waitForDrain may be true
      setImmediate(() => {
        db.close();

        // Give time for everything to settle
        setTimeout(() => {
          expect(drainFired).toBe(true);
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        }, 500);
      });
    });
  });
});