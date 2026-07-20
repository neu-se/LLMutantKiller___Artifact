import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event after write stream backpressure', () => {
  it('should emit drain event after all writes complete even under backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-${process.pid}-${Date.now()}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let timeoutHandle: ReturnType<typeof setTimeout>;

    const cleanup = () => {
      clearTimeout(timeoutHandle);
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    };

    db.on('load', () => {
      // Monkey-patch the write stream to force _waitForDrain = true
      // by making write() always return false (simulate backpressure)
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let callCount = 0;
      db._writeStream.write = function(data: any, cb: any) {
        callCount++;
        // Force backpressure on first write
        if (callCount === 1) {
          originalWrite(data, cb);
          return false; // signal backpressure
        }
        return originalWrite(data, cb);
      };

      db.once('drain', () => {
        cleanup();
        done();
      });

      timeoutHandle = setTimeout(() => {
        cleanup();
        done(new Error('Timed out: drain event was never emitted'));
      }, 5000);

      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });
  });
});