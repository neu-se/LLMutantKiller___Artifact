import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event via write stream backpressure path', () => {
  it('should emit drain event through the write stream drain handler when backpressure occurs with single write', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      // Monkey-patch the write stream to always return false (simulate backpressure)
      // so _waitForDrain becomes true, preventing drain from being emitted in write callback
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let patched = false;
      db._writeStream.write = function(data: any, cb: any) {
        if (!patched) {
          patched = true;
          // Call original but return false to signal backpressure
          originalWrite(data, cb);
          return false;
        }
        return originalWrite(data, cb);
      };

      const timeout = setTimeout(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(new Error('Timed out - drain event never fired, mutation likely present'));
      }, 3000);

      db.once('drain', () => {
        clearTimeout(timeout);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      // Single write - with patched write returning false, _waitForDrain=true
      // write callback fires: _inFlightWrites becomes 0 but _waitForDrain is true so no drain emitted
      // then stream's drain event fires: original emits drain, mutant does not
      db.set('key', 'value');
    });
  });
});