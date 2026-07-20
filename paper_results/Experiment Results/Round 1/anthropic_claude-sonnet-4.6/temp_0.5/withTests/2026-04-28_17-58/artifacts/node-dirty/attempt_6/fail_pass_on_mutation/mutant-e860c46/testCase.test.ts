import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('set callback should not receive an error when close is called immediately after set', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const errors: (Error | null)[] = [];

    // Add error handler to prevent unhandled error events from crashing
    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', () => {
      // Use many writes to ensure _waitForDrain becomes true
      // When _waitForDrain is true, _inFlightWrites > 0 when queue is empty
      const writeCount = 1000;
      let callbackCount = 0;

      for (let i = 0; i < writeCount; i++) {
        db.set(`key${i}`, 'x'.repeat(1000), (err: Error | null) => {
          if (err) errors.push(err);
          callbackCount++;
        });
      }

      // Force close while writes are in-flight and queue may still have items
      // but _inFlightWrites > 0
      // After _flush runs with waitForDrain, queue still has items
      // but we want the case where queue is empty and _inFlightWrites > 0
      // Let's just close after one tick to catch in-flight state
      setImmediate(() => {
        db.close();

        db.on('write_close', () => {
          // In mutated code: write stream ended prematurely, callbacks may have errors
          expect(errors).toHaveLength(0);
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        });
      });
    });
  });
});