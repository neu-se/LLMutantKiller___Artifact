import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event ordering', () => {
  it('close should not be called prematurely when drain fires during backpressure', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-drain-order-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    const db = new Dirty(tmpFile);
    const NUM_KEYS = 300;
    let callbacksFired = 0;
    let closedPrematurely = false;

    db.on('load', () => {
      // Use close() behavior as a proxy: close() waits for drain before closing.
      // If drain fires prematurely (mutation), close() will proceed while writes
      // are still in flight, causing write_close to fire before all callbacks complete.
      db.on('drain', () => {
        db.close();
      });

      db.on('write_close', () => {
        // At this point, all writes should have completed (all callbacks fired)
        // With the mutation, write_close fires prematurely because drain fired early
        try {
          expect(callbacksFired).toBe(NUM_KEYS);
          try { fs.unlinkSync(tmpFile); } catch (_) {}
          done();
        } catch (e) {
          try { fs.unlinkSync(tmpFile); } catch (_) {}
          done(e);
        }
      });

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, 'x'.repeat(1024) + i, () => {
          callbacksFired++;
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});