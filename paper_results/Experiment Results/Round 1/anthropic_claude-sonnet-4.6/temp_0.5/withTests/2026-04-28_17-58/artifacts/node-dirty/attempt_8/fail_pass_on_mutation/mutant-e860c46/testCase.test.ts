import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('should complete all set callbacks without error before closing', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let callbacksCalled = 0;
    const totalSets = 5;
    const errors: Error[] = [];

    db.on('error', (err: Error) => errors.push(err));

    db.on('load', () => {
      // Write enough data to trigger backpressure (_waitForDrain = true)
      // so that _inFlightWrites > 0 when stream drain fires
      const bigValue = 'x'.repeat(256 * 1024); // 256KB to trigger backpressure

      for (let i = 0; i < totalSets; i++) {
        db.set(`key${i}`, bigValue, (err: Error | null) => {
          if (err) errors.push(err);
          callbacksCalled++;
        });
      }

      // Close after flush has started but writes are still in-flight
      // _waitForDrain should be true here (backpressure), _queue.size > 0 still
      // Wait one tick so _flush() has been called and _waitForDrain may be set
      process.nextTick(() => {
        // Now queue may be partially flushed, _inFlightWrites > 0
        db.close();

        db.on('write_close', () => {
          // In original: waited for all in-flight writes
          // In mutated: may have closed prematurely when _inFlightWrites > 0
          expect(errors).toHaveLength(0);
          expect(callbacksCalled).toBe(totalSets);
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        });
      });
    });
  });
});