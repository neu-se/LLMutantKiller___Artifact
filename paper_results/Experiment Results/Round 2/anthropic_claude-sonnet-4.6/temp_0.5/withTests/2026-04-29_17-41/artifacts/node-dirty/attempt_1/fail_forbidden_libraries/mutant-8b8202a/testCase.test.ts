import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event fires only after all in-flight writes complete', () => {
  it('should fire drain exactly once and only after all set callbacks have been called', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}-${Math.floor(Math.random() * 1000000)}.dirty`);
    
    const db = new Dirty(tmpFile);
    
    db.on('load', () => {
      const callbackOrder: string[] = [];
      let drainCount = 0;
      const numWrites = 20;
      let callbacksReceived = 0;

      db.on('drain', () => {
        drainCount++;
        // At the time drain fires, all write callbacks should have been called
        // With the mutation, drain fires prematurely (before all callbacks)
        // We record when drain fires relative to callbacks
        callbackOrder.push(`drain-${drainCount}`);
        
        if (drainCount === 1) {
          // Give a tick for any remaining callbacks to fire
          setImmediate(() => {
            try {
              // All callbacks should have fired before or at the same time as drain
              expect(callbacksReceived).toBe(numWrites);
              // Drain should have fired exactly once
              expect(drainCount).toBe(1);
              
              // Clean up
              db.close();
              db.on('write_close', () => {
                try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
                done();
              });
            } catch (err) {
              try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
              done(err);
            }
          });
        }
      });

      // Write many items to increase chance of triggering backpressure
      for (let i = 0; i < numWrites; i++) {
        const largeVal = 'x'.repeat(1000) + i;
        db.set(`key-${i}`, largeVal, (err) => {
          callbacksReceived++;
          callbackOrder.push(`cb-${i}`);
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});