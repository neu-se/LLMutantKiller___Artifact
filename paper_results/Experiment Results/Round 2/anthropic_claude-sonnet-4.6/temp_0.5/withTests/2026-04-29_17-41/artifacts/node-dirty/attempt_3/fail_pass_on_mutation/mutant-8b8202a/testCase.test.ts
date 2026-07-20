import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event count', () => {
  it('should emit exactly one drain event after all writes complete, not spurious extra drains', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-drain-count-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    const db = new Dirty(tmpFile);
    let drainCount = 0;
    let allCallbacksFired = false;
    let callbacksFired = 0;
    const NUM_KEYS = 200;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, 'value'.repeat(200) + i, () => {
          callbacksFired++;
          if (callbacksFired === NUM_KEYS) {
            allCallbacksFired = true;
            // After all callbacks fired, give a tick to let any extra drains accumulate
            setImmediate(() => {
              try {
                // With the mutation, extra drain events fire spuriously during backpressure handling
                // The close() call triggers drain if queue is empty, so we expect exactly 1 drain
                // With mutation, drainCount will be > 1 due to spurious emissions
                expect(drainCount).toBe(1);
                db.close();
                db.on('write_close', () => {
                  try { fs.unlinkSync(tmpFile); } catch (_) {}
                  done();
                });
              } catch (e) {
                try { fs.unlinkSync(tmpFile); } catch (_) {}
                done(e);
              }
            });
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});