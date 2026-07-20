import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event via write stream drain handler', () => {
  it('should emit drain when write stream drains and _inFlightWrites is exactly 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(filePath);

    const cleanup = () => {
      try { rimrafSync(tmpDir); } catch (_) {}
    };

    const timeoutHandle = setTimeout(() => {
      cleanup();
      done(new Error('Timed out: drain event was never emitted'));
    }, 5000);

    db.on('load', () => {
      // Intercept the write stream to force backpressure on the next write
      const ws = db._writeStream;
      const originalWrite = ws.write.bind(ws);

      // Override write to return false (signal backpressure) for the first call
      let intercepted = false;
      ws.write = function(data: any, cb: any) {
        if (!intercepted) {
          intercepted = true;
          // Call original write but return false to simulate backpressure
          originalWrite(data, cb);
          return false;
        }
        return originalWrite(data, cb);
      };

      db.on('drain', () => {
        clearTimeout(timeoutHandle);
        cleanup();
        done();
      });

      db.set('key', 'value');
    });
  });
});