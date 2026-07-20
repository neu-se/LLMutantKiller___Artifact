import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream drain with backpressure', () => {
  it('should emit drain event on Dirty instance when write stream drains and queue is empty', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    const timeout = setTimeout(() => {
      done(new Error('Timeout: drain event never fired on Dirty instance'));
    }, 4000);

    db.on('load', () => {
      // Intercept the write stream to simulate backpressure:
      // make write() return false so _waitForDrain becomes true.
      // The real write still happens, so the write stream will eventually
      // emit 'drain', at which point the original code emits Dirty's 'drain'.
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);

      ws.write = function(data: any, cb: any): boolean {
        // Restore original write so subsequent calls work normally
        ws.write = originalWrite;
        // Call the real write but return false to simulate backpressure
        originalWrite(data, cb);
        return false;
      };

      db.once('drain', () => {
        clearTimeout(timeout);
        // Clean up
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (_) {}
        done();
      });

      // Set a single key - this will call _flush, which calls ws.write (returning false),
      // setting _waitForDrain = true. The write callback fires but won't emit drain
      // because _waitForDrain is true. Then the write stream emits 'drain', and
      // the original code checks: queue empty + inFlightWrites <= 0 => emit drain.
      // The mutated code skips the emit.
      db.set('testKey', { value: 'hello' });
    });

    db.on('error', (err: Error) => {
      clearTimeout(timeout);
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (_) {}
      done(err);
    });
  });
});