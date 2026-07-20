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

      // Intercept the drain event: when drain fires, first add more items to queue
      // then re-emit drain so the handler runs with items in the queue
      let drainIntercepted = false;
      const origEmit = ws.emit.bind(ws);
      (ws as any).emit = (event: string, ...args: any[]) => {
        if (event === 'drain' && !drainIntercepted) {
          drainIntercepted = true;
          // Force _waitForDrain to true so _flush() won't run when we call set()
          (db as any)._waitForDrain = true;
          // Add items to queue directly
          (db as any)._queue.set('queued1', [cb1]);
          (db as any)._queue.set('queued2', [cb2]);
          (db as any)._data.set('queued1', 'val1');
          (db as any)._data.set('queued2', 'val2');
          // Now set _waitForDrain to false and emit drain
          (db as any)._waitForDrain = false;
          return origEmit(event, ...args);
        }
        return origEmit(event, ...args);
      };

      let callbackCount = 0;
      const totalExpected = 3; // key0 + queued1 + queued2

      const timeout = setTimeout(() => {
        cleanup(new Error(`Only ${callbackCount}/${totalExpected} callbacks fired`));
      }, 3000);

      const cb1 = () => {
        callbackCount++;
        checkDone();
      };
      const cb2 = () => {
        callbackCount++;
        checkDone();
      };

      const checkDone = () => {
        if (callbackCount === totalExpected) {
          clearTimeout(timeout);
          db.close();
          cleanup();
        }
      };

      // Set first key to trigger a write and eventually a drain
      db.set('key0', 'val0', () => {
        callbackCount++;
        checkDone();
      });
    });

    db.on('error', (err: Error) => {
      cleanup(err);
    });
  }, 5000);
});