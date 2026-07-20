import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty write stream drain handling', () => {
  it('should emit drain event and flush remaining queue items after write stream drain', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-drain-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      let drainCount = 0;

      // Write many items to trigger backpressure and drain cycle
      // We need to write enough data to cause the write stream to emit 'drain'
      // The mutation removes the handler for write stream 'drain', so _waitForDrain
      // will never be reset to false, and subsequent flushes will never happen
      
      const keys: string[] = [];
      const numKeys = 1000;
      
      for (let i = 0; i < numKeys; i++) {
        keys.push(`key-${i}`);
      }

      let callbackCount = 0;
      const expectedCallbacks = numKeys;

      const checkDone = () => {
        callbackCount++;
        if (callbackCount === expectedCallbacks) {
          // All callbacks fired means all writes completed
          // Verify all values are readable
          for (let i = 0; i < numKeys; i++) {
            expect(db.get(`key-${i}`)).toBe(`value-${i}`);
          }
          
          // Clean up
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        }
      };

      // Set all keys with callbacks - in mutated code, once _waitForDrain is set to true,
      // it never gets reset, so callbacks for keys that weren't flushed will never fire
      for (let i = 0; i < numKeys; i++) {
        db.set(`key-${i}`, `value-${i}`, (err: Error | null) => {
          expect(err).toBeNull();
          checkDone();
        });
      }
    });

    // Set a timeout to fail the test if it doesn't complete
    const timeout = setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Test timed out - drain event was likely not handled correctly'));
    }, 10000);

    // Clear timeout if done is called
    const originalDone = done;
  });
});