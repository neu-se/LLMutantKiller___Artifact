import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush waitForDrain guard inside loop', () => {
  it('should stop writing to stream after backpressure signal within a single flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new (Dirty as any)(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      const originalWrite = writeStream.write.bind(writeStream);
      let writeCallCount = 0;

      // Override write: first call returns false (backpressure), subsequent calls return true
      writeStream.write = function(data: string, cb: (err?: Error | null) => void) {
        writeCallCount++;
        if (writeCallCount === 1) {
          // Call original but return false to signal backpressure
          originalWrite(data, cb);
          return false;
        }
        return originalWrite(data, cb);
      };

      // Directly populate queue with 3 items so _flush processes them in one call
      (db as any)._data.set('key1', 'value1');
      (db as any)._data.set('key2', 'value2');
      (db as any)._data.set('key3', 'value3');
      (db as any)._queue.set('key1', []);
      (db as any)._queue.set('key2', []);
      (db as any)._queue.set('key3', []);
      (db as any)._waitForDrain = false;
      (db as any)._inFlightWrites = 0;

      // Call _flush directly
      (db as any)._flush();

      // Original: writes key1, gets backpressure (false), breaks out of loop -> 1 write
      // Mutated: writes key1, gets backpressure but continues -> writes key2, key3 -> 3 writes
      expect(writeCallCount).toBe(1);

      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});