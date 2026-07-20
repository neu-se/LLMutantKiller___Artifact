import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty backpressure handling', () => {
  it('should break out of flush loop when write stream signals backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      let writeCallCount = 0;
      const originalWrite = writeStream.write.bind(writeStream);
      // Queue size captured immediately after the first write returns false
      let queueSizeAfterBackpressure = -1;

      writeStream.write = function(data: string, cb: Function) {
        writeCallCount++;
        if (writeCallCount === 1) {
          // Call original write but return false to signal backpressure
          originalWrite(data, cb);
          // Capture queue size BEFORE returning false - the loop hasn't broken yet
          // but _waitForDrain will be set to true from the return value
          // We need to capture after the assignment happens in _flush
          // So we use setImmediate to check after the synchronous loop finishes
          setImmediate(() => {
            queueSizeAfterBackpressure = (db as any)._queue.size;
          });
          return false; // Signal backpressure
        }
        return originalWrite(data, cb);
      };

      // Pre-populate the queue with multiple keys before flushing
      // We do this by setting _waitForDrain = true first to prevent auto-flush,
      // then manually trigger flush
      (db as any)._waitForDrain = true;
      db.set('alpha', 1);
      db.set('beta', 2);
      db.set('gamma', 3);
      // Now allow flushing
      (db as any)._waitForDrain = false;
      (db as any)._flush();

      // Wait for the setImmediate inside write mock + one more tick
      setImmediate(() => {
        setImmediate(() => {
          // Original: after first write returns false, loop breaks
          // 'beta' and 'gamma' remain in queue → size >= 2
          // Mutated: loop continues despite backpressure, all items written → size = 0
          expect(queueSizeAfterBackpressure).toBeGreaterThanOrEqual(2);

          // Cleanup
          try {
            fs.rmSync(tmpDir, { recursive: true, force: true });
          } catch (e) {
            // ignore cleanup errors
          }
          done();
        });
      });
    });

    db.on('error', (err: Error) => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        // ignore
      }
      done(err);
    });
  }, 10000);
});