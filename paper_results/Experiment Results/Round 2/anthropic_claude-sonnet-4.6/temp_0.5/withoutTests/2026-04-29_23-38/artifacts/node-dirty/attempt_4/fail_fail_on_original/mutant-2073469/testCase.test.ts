import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event mutation', () => {
  it('should emit drain when write stream drains after backpressure with no pending writes', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      const db = new Dirty(dbPath);

      await new Promise<void>((resolve) => {
        db.on('load', () => resolve());
      });

      // Monkey-patch the write stream to force backpressure:
      // Make write() return false so _waitForDrain = true,
      // then manually trigger the drain event after write callbacks fire
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);
      let drainCallback: (() => void) | null = null;

      // Override write to always return false (simulate backpressure)
      // and capture so we can trigger drain manually after callbacks run
      ws.write = function(data: string, cb: (err?: Error | null) => void) {
        // Call original write but ignore its return value, return false to signal backpressure
        originalWrite(data, cb);
        return false;
      };

      const drainReceived = await new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => {
          resolve(false);
        }, 5000);

        db.once('drain', () => {
          clearTimeout(timeout);
          resolve(true);
        });

        // Set one key - this will set _waitForDrain = true because write returns false
        db.set('key1', { value: 'hello' });
        // After this, _inFlightWrites=1, _waitForDrain=true, queue is empty
        // The write callback will fire: _inFlightWrites becomes 0, but since _waitForDrain=true, no drain emitted
        // Then the stream's drain event fires: queue empty, _inFlightWrites=0 -> should emit 'drain'
      });

      expect(drainReceived).toBe(true);

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('close timeout')), 3000);
        db.close();
        db.once('write_close', () => {
          clearTimeout(timeout);
          resolve();
        });
      });
    } finally {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        // ignore
      }
    }
  });
});