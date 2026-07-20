import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { EventEmitter } from 'events';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event mutation', () => {
  it('should emit drain via write stream drain handler when backpressure occurs and queue is empty', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      const db = new Dirty(dbPath);

      await new Promise<void>((resolve) => {
        db.on('load', () => resolve());
      });

      // At this point _writeStream exists. We'll intercept it to:
      // 1. Make write() return false (backpressure)
      // 2. Call the write callback synchronously (so _inFlightWrites goes to 0 while _waitForDrain is still true)
      // 3. Then emit 'drain' on the write stream (triggering the mutated code path)
      const ws = (db as any)._writeStream;
      
      let pendingWriteDrain: (() => void) | null = null;
      
      ws.write = function(data: string, cb: (err?: Error | null) => void) {
        // Call cb synchronously - _inFlightWrites will decrement
        // but _waitForDrain will be true (since we return false below)
        // so drain won't be emitted from the callback
        setImmediate(() => {
          cb(null);
          // After callback fires (_inFlightWrites=0, _waitForDrain=true),
          // now trigger the stream drain event
          setImmediate(() => {
            ws.emit('drain');
          });
        });
        return false; // signal backpressure -> _waitForDrain = true
      };

      const drainReceived = await new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => resolve(false), 3000);

        db.once('drain', () => {
          clearTimeout(timeout);
          resolve(true);
        });

        db.set('key1', { value: 'hello' });
      });

      expect(drainReceived).toBe(true);

    } finally {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        // ignore
      }
    }
  });
});