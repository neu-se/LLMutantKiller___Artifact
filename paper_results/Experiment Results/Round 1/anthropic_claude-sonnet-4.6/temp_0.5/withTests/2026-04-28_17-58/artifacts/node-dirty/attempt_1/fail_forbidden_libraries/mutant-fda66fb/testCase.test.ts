import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty write stream drain behavior', () => {
  it('should fire drain event only after all queued writes complete when backpressure occurs', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-drain-test-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Write many large values to try to trigger backpressure on the write stream
      // The key insight: we need to verify that after drain fires, all writes are complete
      const numWrites = 100;
      const largeValue = 'x'.repeat(10000);
      let callbackCount = 0;
      const expectedCallbacks = numWrites;

      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, largeValue + i, (err) => {
          expect(err).toBeNull();
          callbackCount++;
        });
      }

      db.on('drain', () => {
        // When drain fires, ALL callbacks should have been called
        // With the mutation (if this._queue.size), drain fires when queue is NOT empty
        // meaning callbacks won't all be called yet
        expect(callbackCount).toBe(expectedCallbacks);

        // Also verify all values are readable
        for (let i = 0; i < numWrites; i++) {
          expect(db.get(`key${i}`)).toBe(largeValue + i);
        }

        // Clean up
        db.close();
        db.on('write_close', () => {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        });
      });
    });
  });
});