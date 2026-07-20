import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure handling', () => {
  it('should have all write callbacks complete before emitting drain', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-cb-order-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const N = 200;
    const VALUE = 'x'.repeat(100);
    let callbackCount = 0;
    let drainFiredWithPendingCallbacks = false;

    db.on('load', () => {
      db.on('drain', () => {
        if (callbackCount < N) {
          drainFiredWithPendingCallbacks = true;
        }
      });

      for (let i = 0; i < N; i++) {
        db.set(`key${i}`, VALUE + i, () => {
          callbackCount++;
        });
      }

      db.close();
      db.on('write_close', () => {
        expect(drainFiredWithPendingCallbacks).toBe(false);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });

    db.on('error', done);
  });
});