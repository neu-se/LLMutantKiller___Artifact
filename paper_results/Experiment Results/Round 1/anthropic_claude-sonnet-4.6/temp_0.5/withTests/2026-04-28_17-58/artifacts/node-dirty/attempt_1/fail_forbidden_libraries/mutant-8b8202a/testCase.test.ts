import { jest } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event timing with in-flight writes', () => {
  it('should not emit drain before all write callbacks have completed', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      const callbackOrder: string[] = [];
      let drainEmitted = false;
      let pendingCallbacks = 0;

      db.on('drain', () => {
        drainEmitted = true;
        // When drain fires, all write callbacks should have already been called
        // In the mutated version, drain fires even with in-flight writes,
        // so some callbacks may not have fired yet
        callbackOrder.push('drain');
      });

      // Write many large records to trigger backpressure
      const largeValue = 'x'.repeat(65536); // 64KB per record
      const numWrites = 20;
      pendingCallbacks = numWrites;

      for (let i = 0; i < numWrites; i++) {
        const index = i;
        db.set(`key${index}`, largeValue, (err) => {
          callbackOrder.push(`cb${index}`);
          pendingCallbacks--;

          if (pendingCallbacks === 0) {
            // All callbacks done - check that drain came after all callbacks
            // In original: drain fires only when _inFlightWrites <= 0
            // In mutated: drain may fire prematurely
            
            // Give a tick for any pending drain events
            setImmediate(() => {
              // Verify drain was emitted
              expect(drainEmitted).toBe(true);
              
              // The last item in callbackOrder should be 'drain' 
              // OR drain should appear after all callbacks
              const drainIndex = callbackOrder.lastIndexOf('drain');
              const lastCbIndex = Math.max(
                ...Array.from({length: numWrites}, (_, i) => callbackOrder.lastIndexOf(`cb${i}`))
              );
              
              // drain should not appear before all callbacks complete
              // i.e., the last drain should come after or at the same position as the last callback
              expect(drainIndex).toBeGreaterThanOrEqual(lastCbIndex);
              
              rimrafSync(tmpDir);
              done();
            });
          }
        });
      }
    });
  });
});