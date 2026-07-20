import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain via stream backpressure', () => {
  it('should emit drain when write stream drains with no in-flight writes', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-bp-${process.pid}-${Date.now()}.db`);

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Intercept the write stream to force backpressure on the first write
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let firstWrite = true;

      db._writeStream.write = function(data: any, cb: any) {
        if (firstWrite) {
          firstWrite = false;
          // Call original write
          originalWrite(data, cb);
          // Force _waitForDrain to be true by returning false
          return false;
        }
        return originalWrite(data, cb);
      };

      const timeout = setTimeout(() => {
        cleanup();
        done(new Error('drain event never fired'));
      }, 3000);

      db.once('drain', () => {
        clearTimeout(timeout);
        cleanup();
        done();
      });

      db.set('key1', { value: 'test' });
    });

    function cleanup() {
      try { fs.unlinkSync(dbPath); } catch {}
    }
  });
});