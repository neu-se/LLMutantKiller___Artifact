import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain behavior with pending queue', () => {
  it('should call _flush after drain when queue still has items', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Intercept the write stream to simulate backpressure on first write
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);
      let firstWrite = true;

      ws.write = function(data: any, cb: any) {
        if (firstWrite) {
          firstWrite = false;
          // Call original write but return false to simulate backpressure
          originalWrite(data, cb);
          return false; // Signal backpressure
        }
        return originalWrite(data, cb);
      };

      let cb1Called = false;
      let cb2Called = false;

      // First set - will trigger _flush, write returns false -> _waitForDrain = true
      db.set('key1', { v: 1 }, (err: Error | null) => {
        cb1Called = true;
      });

      // Second set - queued because _waitForDrain is true (set after flush starts)
      // We need to set this AFTER _flush runs, so use setImmediate
      setImmediate(() => {
        db.set('key2', { v: 2 }, (err: Error | null) => {
          cb2Called = true;
        });

        // Now emit drain on the write stream to simulate OS draining the buffer
        // With original code: checks queue.size > 0, calls _flush() -> cb2 eventually called
        // With mutated code: always emits 'drain', never calls _flush() -> cb2 never called
        setImmediate(() => {
          ws.emit('drain');

          // Give time for callbacks to fire
          setTimeout(() => {
            try {
              fs.rmSync(tmpDir, { recursive: true });
            } catch (e) {}

            if (!cb2Called) {
              done(new Error('cb2 was never called - queue items were not flushed after drain'));
            } else {
              done();
            }
          }, 500);
        });
      });
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
      done(err);
    });
  }, 10000);
});