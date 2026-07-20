import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event', () => {
  it('drain fires exactly once after all sets complete when backpressure occurs', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    const db = new Dirty(tmpFile);
    const NUM_KEYS = 500;
    let drainCount = 0;
    let allSetsIssued = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (!allSetsIssued) {
          // drain fired before we even finished issuing all sets - definitely spurious
          // This can happen with mutation when backpressure triggers during our loop
        }
      });

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, 'x'.repeat(2048) + i, undefined);
      }
      allSetsIssued = true;

      // Wait for everything to settle
      const checkDone = () => {
        if (drainCount >= 1) {
          // Give extra time for any additional spurious drains
          setTimeout(() => {
            try {
              // With mutation: drain fires spuriously during backpressure recovery
              // while queue still has items, so it fires more than once
              // With original: drain fires exactly once when all in-flight writes complete
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
          }, 200);
        } else {
          setTimeout(checkDone, 50);
        }
      };
      checkDone();
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});