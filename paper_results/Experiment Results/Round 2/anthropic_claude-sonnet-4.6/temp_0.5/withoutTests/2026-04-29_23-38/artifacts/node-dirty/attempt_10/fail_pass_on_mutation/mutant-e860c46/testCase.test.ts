import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should flush all queued writes before closing even under backpressure', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-backpressure-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Manually force _waitForDrain = true to simulate backpressure
      // then add items to queue, then call close()
      // In original: close() sees _queue.size > 0, waits for drain, then flushes remaining
      // In mutated: same behavior when _queue.size > 0
      
      // The mutation only differs when _queue.size === 0 but _inFlightWrites > 0
      // Let's force this by patching _writeStream.write to intercept
      
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);
      let intercepted = false;
      let closeCalledDuringWrite = false;
      
      ws.write = function(data: string, cb: Function) {
        if (!intercepted) {
          intercepted = true;
          // Call original write
          const result = originalWrite(data, cb);
          // Now: _queue.size=0, _inFlightWrites=1
          // Call close() right here
          closeCalledDuringWrite = true;
          db.close();
          return result;
        }
        return originalWrite(data, cb);
      };

      let writeCbCalled = false;
      db.set('testkey', 'testval', (_err: unknown) => {
        writeCbCalled = true;
      });

      db.once('write_close', () => {
        try { fs.unlinkSync(dbPath); } catch (_e) {}
        try {
          expect(closeCalledDuringWrite).toBe(true);
          expect(writeCbCalled).toBe(true);
          done();
        } catch (e) {
          done(e as Error);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  }, 10000);
});