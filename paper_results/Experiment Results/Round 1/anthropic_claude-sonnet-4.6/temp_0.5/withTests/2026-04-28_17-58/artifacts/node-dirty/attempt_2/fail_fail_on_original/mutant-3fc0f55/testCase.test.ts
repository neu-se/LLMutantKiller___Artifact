import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty write stream drain handling', () => {
  it('should complete all write callbacks even when write stream backpressure occurs', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-drain-${process.pid}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      const numKeys = 500;
      let callbackCount = 0;

      const checkDone = (err: Error | null) => {
        expect(err).toBeFalsy();
        callbackCount++;
        if (callbackCount === numKeys) {
          // All callbacks fired means all writes completed successfully
          // Verify all values are readable
          for (let i = 0; i < numKeys; i++) {
            expect(db.get(`key-${i}`)).toBe(`value-${i}`);
          }

          // Clean up
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        }
      };

      // Write many large items to trigger backpressure (_waitForDrain = true).
      // In the original code, the write stream 'drain' event resets _waitForDrain
      // and calls _flush() to process remaining queue items.
      // In the mutated code, the 'drain' handler is a no-op, so _waitForDrain
      // stays true forever and remaining queue items never get flushed,
      // meaning their callbacks never fire and this test times out.
      const largeValue = 'x'.repeat(65536); // 64KB per entry to trigger backpressure
      for (let i = 0; i < numKeys; i++) {
        db.set(`key-${i}`, `${largeValue}-${i}`, checkDone);
      }
    });
  }, 15000);
});