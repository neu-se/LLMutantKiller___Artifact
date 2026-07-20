import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event via write stream backpressure path', () => {
  it('should emit drain event through the write stream drain handler when backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file) as any;

    db.on('load', () => {
      const ws = db._writeStream;
      const originalWrite = ws.write.bind(ws);
      let callCount = 0;

      // Intercept write: first call returns false (backpressure), but still writes data
      // This makes _waitForDrain = true
      // The write callback will then NOT emit drain (because _waitForDrain is true)
      // Only the stream's own 'drain' event will emit db's drain - which the mutation removes
      ws.write = function(data: any, cb: any) {
        callCount++;
        if (callCount === 1) {
          originalWrite(data, cb);
          return false; // signal backpressure
        }
        return originalWrite(data, cb);
      };

      const timeout = setTimeout(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(new Error('Timed out - drain event never fired'));
      }, 3000);

      db.once('drain', () => {
        clearTimeout(timeout);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      db.set('key', 'value');
    });
  });
});