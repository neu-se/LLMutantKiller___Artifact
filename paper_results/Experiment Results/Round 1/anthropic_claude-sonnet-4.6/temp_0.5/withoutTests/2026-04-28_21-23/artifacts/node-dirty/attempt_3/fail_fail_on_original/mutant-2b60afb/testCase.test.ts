import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event when backpressure occurs and queue empties', () => {
  it('should emit drain after write stream drains when _waitForDrain was true and queue is empty', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.on('error', (err: Error) => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
        done(err);
      });

      // We need to make write() return false (backpressure).
      // Monkey-patch the write stream to always return false on the first write,
      // simulating backpressure. This forces _waitForDrain = true.
      // Then the only way 'drain' can be emitted is via the stream's drain handler.
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);
      let patchActive = true;

      ws.write = function(data: any, cb: any) {
        if (patchActive) {
          patchActive = false;
          // Call original write but return false to signal backpressure
          originalWrite(data, cb);
          return false;
        }
        return originalWrite(data, cb);
      };

      db.once('drain', () => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
        done();
      });

      // Single write - write() returns false (patched), so _waitForDrain = true
      // The write callback won't emit drain because _waitForDrain is true
      // Only the stream's 'drain' event handler can emit drain
      db.set('testKey', 'testValue');
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});