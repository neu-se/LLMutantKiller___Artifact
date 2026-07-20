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
      let intercepted = false;

      ws.write = function(data: any, cb: any) {
        if (!intercepted) {
          intercepted = true;
          // Call original so data is written and callback fires
          originalWrite(data, cb);
          // Return false to simulate backpressure - this causes _waitForDrain=true
          // So when callback fires with _inFlightWrites=0, it won't emit drain
          // Only the stream's drain event handler can emit drain
          return false;
        }
        return originalWrite(data, cb);
      };

      db.on('drain', () => {
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