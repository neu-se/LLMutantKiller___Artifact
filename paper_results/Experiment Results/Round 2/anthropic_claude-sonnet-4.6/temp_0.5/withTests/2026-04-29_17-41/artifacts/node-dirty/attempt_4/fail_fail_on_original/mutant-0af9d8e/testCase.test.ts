import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event emission path via write stream drain event', () => {
  it('should emit exactly one drain event after writes complete under backpressure conditions', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const file = path.join(tmpDir, 'backpressure.dirty');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);
        const timeout = setTimeout(() => {
          reject(new Error('Timed out: drain event was never emitted'));
        }, 10000);

        db.on('load', () => {
          // Monkey-patch the write stream to force backpressure on the very first write
          // so _waitForDrain = true, preventing the write callback from emitting drain.
          // The stream drain event must then be the one to emit drain.
          const originalWrite = db._writeStream.write.bind(db._writeStream);
          let firstWrite = true;
          db._writeStream.write = function(data: any, cb: any) {
            if (firstWrite) {
              firstWrite = false;
              // Call original but override return value to simulate backpressure
              originalWrite(data, cb);
              return false; // signal backpressure
            }
            return originalWrite(data, cb);
          };

          db.once('drain', () => {
            clearTimeout(timeout);
            resolve();
          });

          // Single write - with forced backpressure, _waitForDrain = true
          // write callback won't emit drain (because _waitForDrain is true)
          // stream drain event fires, queue is empty, _inFlightWrites = 0
          // original: emits drain; mutant: does NOT emit drain
          db.set('key1', 'value1');
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
    }
  });
});