import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event via write stream drain handler', () => {
  it('should emit drain after backpressure resolves with empty queue and zero in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const file = path.join(tmpDir, 'backpressure.dirty');

    const db = new Dirty(file);

    const timeout = setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(new Error('Timed out: drain event was never emitted'));
    }, 15000);

    db.on('load', () => {
      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done();
      });

      // Write a huge number of large records to force real write stream backpressure.
      // The default highWaterMark for fs write streams is 16KB.
      // Each record is ~70KB, so after the first write returns false,
      // _waitForDrain = true, subsequent writes are blocked.
      // When the stream drains: queue is empty, _inFlightWrites = 0.
      // Original: emits 'drain'. Mutant: does NOT emit 'drain' (times out).
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB per record
      for (let i = 0; i < 5; i++) {
        db.set(`key${i}`, largeValue);
      }
    });

    db.on('error', (err: Error) => {
      clearTimeout(timeout);
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  }, 15000);
});