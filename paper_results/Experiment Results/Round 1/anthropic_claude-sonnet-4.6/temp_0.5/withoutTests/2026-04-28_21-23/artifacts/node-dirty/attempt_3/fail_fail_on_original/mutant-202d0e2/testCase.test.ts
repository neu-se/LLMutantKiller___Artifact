import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event handling', () => {
  it('should flush remaining queued items after write stream drain event', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    const cleanup = (err?: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      if (err) done(err);
      else done();
    };

    db.on('load', () => {
      const ws = (db as any)._writeStream as fs.WriteStream;
      const origWrite = ws.write.bind(ws);
      let writeCallCount = 0;
      let drainEmitted = false;

      // Override write: first call returns false (backpressure), 
      // then we manually set _waitForDrain=true and queue more items,
      // then let drain fire naturally
      (ws as any).write = (...args: any[]) => {
        writeCallCount++;
        if (writeCallCount === 1) {
          // Call original write but signal backpressure
          (origWrite as any)(...args);
          return false;
        }
        return (origWrite as any)(...args);
      };

      let callbackCount = 0;
      const totalKeys = 5;

      const timeout = setTimeout(() => {
        cleanup(new Error(`Only ${callbackCount}/${totalKeys} callbacks fired - drain did not trigger flush`));
      }, 4000);

      // Set first key - this will trigger _flush, write returns false, _waitForDrain=true
      db.set('key0', 'val0', () => {
        callbackCount++;
        if (callbackCount === totalKeys) {
          clearTimeout(timeout);
          db.close();
          cleanup();
        }
      });

      // Immediately set more keys - these will be queued since _waitForDrain=true
      // They need the drain event to trigger _flush() to get processed
      setImmediate(() => {
        for (let i = 1; i < totalKeys; i++) {
          db.set(`key${i}`, `val${i}`, () => {
            callbackCount++;
            if (callbackCount === totalKeys) {
              clearTimeout(timeout);
              db.close();
              cleanup();
            }
          });
        }
      });
    });

    db.on('error', (err: Error) => {
      cleanup(err);
    });
  }, 6000);
});