import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event after write stream backpressure with inFlightWrites at zero', () => {
  it('should emit drain event when stream drains and inFlightWrites equals 0', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    const timeout = setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Timed out: drain event never fired'));
    }, 8000);

    db.on('load', () => {
      // We need to cause exactly one write that triggers backpressure (_waitForDrain=true),
      // where the write callback fires (decrementing _inFlightWrites to 0) while _waitForDrain
      // is still true, so the write callback path does NOT emit drain.
      // Then when the stream drain event fires, _inFlightWrites===0:
      //   original (<=0): emits drain ✓
      //   mutated (<0): does NOT emit drain ✗

      // Monkey-patch the write stream to simulate backpressure on the first write
      // by making write() return false immediately
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let patchedOnce = false;

      db._writeStream.write = function(data, cb) {
        if (!patchedOnce) {
          patchedOnce = true;
          // Call the real write but force return false to simulate backpressure
          originalWrite(data, cb);
          return false; // Force _waitForDrain = true
        }
        return originalWrite(data, cb);
      };

      db.set('key1', 'value1');

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});