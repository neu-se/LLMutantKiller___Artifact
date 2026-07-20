import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event', () => {
  it('all set callbacks fire before or at the time drain is emitted', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-drain-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    const db = new Dirty(tmpFile);
    const NUM_KEYS = 50;
    // Use large values to increase chance of backpressure
    const LARGE_VALUE = 'x'.repeat(65536);
    let callbacksFired = 0;
    let drainFiredEarly = false;

    db.on('load', () => {
      db.on('drain', () => {
        // With mutation: drain fires when _inFlightWrites > 0,
        // meaning some write callbacks haven't fired yet.
        // With original: drain only fires when _inFlightWrites <= 0,
        // meaning all write callbacks have fired.
        // 
        // However the last callback fires drain itself, so at drain time
        // callbacksFired will be NUM_KEYS - 1 in original too.
        // 
        // The difference: with mutation, drain fires MULTIPLE times.
        // On the first (spurious) drain, callbacksFired will be much less than NUM_KEYS-1.
        if (callbacksFired < NUM_KEYS - 1) {
          drainFiredEarly = true;
        }
      });

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, LARGE_VALUE + i, () => {
          callbacksFired++;
          if (callbacksFired === NUM_KEYS) {
            setImmediate(() => {
              try {
                expect(drainFiredEarly).toBe(false);
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