import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty write stream drain handling', () => {
  it('should flush remaining queue items and emit drain after write stream backpressure is relieved', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      // We need to trigger the scenario where _waitForDrain becomes true.
      // When the write stream emits 'drain', the original code resets _waitForDrain
      // and continues flushing. The mutated code does nothing on drain.
      //
      // Strategy: monkey-patch the write stream's write method to return false
      // (simulating backpressure) so that _waitForDrain gets set to true,
      // then verify that the dirty 'drain' event eventually fires.

      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let callCount = 0;

      // Override write to return false on first call, simulating backpressure
      db._writeStream.write = function(data: any, cb: any) {
        callCount++;
        if (callCount === 1) {
          // Call original but ignore its return value, force backpressure
          originalWrite(data, cb);
          return false; // Signal backpressure
        }
        return originalWrite(data, cb);
      };

      // Set two keys - the first write will signal backpressure (_waitForDrain = true)
      // The second key stays in the queue. When the write stream emits 'drain',
      // original code resets _waitForDrain and flushes the second key.
      // Mutated code does nothing, so second key never gets written and drain never fires.
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      const timeout = setTimeout(() => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(new Error('Timed out waiting for drain event'));
      }, 4000);

      db.on('drain', () => {
        clearTimeout(timeout);

        // Verify both keys are in memory
        try {
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});