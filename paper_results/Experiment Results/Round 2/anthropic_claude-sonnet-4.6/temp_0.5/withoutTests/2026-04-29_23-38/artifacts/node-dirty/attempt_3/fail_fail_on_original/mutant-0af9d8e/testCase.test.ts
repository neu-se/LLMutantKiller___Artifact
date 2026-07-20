import { promises as fsPromises } from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event with write stream backpressure', () => {
  it('should emit drain event after write stream backpressure when inFlightWrites reaches zero', async () => {
    const tmpDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(dbPath);

        db.on('error', (err: Error) => reject(err));

        db.on('load', () => {
          const timeout = setTimeout(() => {
            reject(new Error('Timed out: drain event was never emitted'));
          }, 5000);

          // We need exactly ONE write that causes backpressure.
          // When _writeStream.write() returns false:
          //   - _waitForDrain = true, _inFlightWrites = 1
          // When write callback fires:
          //   - _inFlightWrites becomes 0, but _waitForDrain is still true
          //   - so drain is NOT emitted from callback
          // When write stream emits 'drain':
          //   - queue is empty, so we check _inFlightWrites
          //   - Original: _inFlightWrites <= 0 → emit drain ✓
          //   - Mutated:  _inFlightWrites > 0  → don't emit drain ✗
          
          // Monkey-patch the write stream to force it to return false (simulate backpressure)
          // We need to wait until _writeStream is set up
          const origFlush = (db as any)._flush.bind(db);
          (db as any)._flush = function() {
            const ws = (db as any)._writeStream;
            if (ws) {
              const origWrite = ws.write.bind(ws);
              ws.write = function(data: any, cb: any) {
                // Call original but force return false to simulate backpressure
                origWrite(data, cb);
                return false; // simulate backpressure
              };
              // Restore after first call
              (db as any)._flush = origFlush;
            }
            origFlush();
          };

          db.once('drain', () => {
            clearTimeout(timeout);
            resolve();
          });

          db.set('key1', 'value1');
        });
      });
    } finally {
      try {
        await fsPromises.rm(tmpDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });
});