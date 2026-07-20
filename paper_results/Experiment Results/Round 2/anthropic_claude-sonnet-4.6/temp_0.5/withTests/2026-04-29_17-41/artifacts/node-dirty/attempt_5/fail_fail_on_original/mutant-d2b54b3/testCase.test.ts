import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('emits drain when write stream drains with empty queue and zero in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-bp-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);

      // Patch write to: call original (so callback fires), but return false
      // AND ensure _waitForDrain remains true when callback executes
      ws.write = function(data: any, cb: any) {
        const wrappedCb = (err: any) => {
          // _waitForDrain is true here (we returned false), so callback won't emit drain
          cb(err);
          // After callback, _inFlightWrites=0, _waitForDrain=true, queue empty
          // Now simulate stream drain event - this is the only path to emit drain
          setImmediate(() => {
            ws.emit('drain');
          });
        };
        originalWrite(data, wrappedCb);
        return false; // force _waitForDrain = true
      };

      db.once('drain', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      db.set('key', 'value');
    });

    setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(new Error('Timed out - drain event not emitted'));
    }, 4000);
  });
});