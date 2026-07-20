import { describe, it, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event after write stream drain', () => {
  it('should emit drain event even when write stream backpressure occurs', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      let drainCount = 0;

      // Write many keys to increase chance of triggering backpressure
      // but more importantly, we need to verify that after the write stream
      // emits 'drain', the dirty db also emits 'drain'
      
      // Force _waitForDrain to be set by writing a lot of data
      // The key test: after all writes, we should eventually get a drain event
      const numKeys = 100;
      let writesCompleted = 0;

      const checkDone = () => {
        writesCompleted++;
        if (writesCompleted === numKeys) {
          // All callbacks fired, now wait for drain
        }
      };

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, 'x'.repeat(1000), checkDone);
      }

      // The drain event should fire after all writes complete
      // In the mutated code, if _waitForDrain is set to true (backpressure),
      // the drain event on the write stream does nothing, so dirty never emits 'drain'
      // and the remaining queue items never get flushed
      const timeout = setTimeout(() => {
        fs.unlinkSync(file);
        done(new Error('Timed out waiting for drain event - mutation likely present'));
      }, 5000);

      db.on('drain', () => {
        drainCount++;
        // Once we get a drain event, verify all data was written
        if (drainCount >= 1) {
          clearTimeout(timeout);
          
          // Verify by reloading the db
          const db2 = new Dirty(file);
          db2.on('load', (size: number) => {
            try {
              expect(size).toBe(numKeys);
              fs.unlinkSync(file);
              done();
            } catch (err) {
              fs.unlinkSync(file);
              done(err);
            }
          });
          db2.on('error', (err: Error) => {
            fs.unlinkSync(file);
            done(err);
          });
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});