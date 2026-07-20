import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event fires only after all writes complete', () => {
  it('drain event should only fire after all write callbacks have been invoked', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-drain-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    const db = new Dirty(tmpFile);
    let callbacksFired = 0;
    const NUM_KEYS = 100;

    db.on('load', () => {
      db.once('drain', () => {
        // When drain fires, all write callbacks must have already been called.
        // The mutation emits drain even when _inFlightWrites > 0 (writes still pending),
        // causing drain to fire before all write callbacks complete.
        try {
          expect(callbacksFired).toBe(NUM_KEYS);
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

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, 'value'.repeat(100) + i, () => {
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