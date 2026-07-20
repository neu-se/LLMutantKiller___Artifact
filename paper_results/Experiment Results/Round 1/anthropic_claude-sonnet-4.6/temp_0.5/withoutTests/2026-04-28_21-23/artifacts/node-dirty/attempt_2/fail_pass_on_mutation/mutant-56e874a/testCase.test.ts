import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush waitForDrain guard inside loop', () => {
  it('should stop flushing remaining queue items when stream signals backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new (Dirty as any)(dbPath);

    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      const originalWrite = writeStream.write.bind(writeStream);
      let writeCallCount = 0;
      const writtenData: string[] = [];

      // Override write to simulate backpressure after first write
      writeStream.write = function(data: string, cb: (err?: Error | null) => void) {
        writeCallCount++;
        writtenData.push(data);
        const result = originalWrite(data, cb);
        if (writeCallCount === 1) {
          // Signal backpressure on first write
          return false;
        }
        return result;
      };

      // Queue multiple items at once by setting _waitForDrain manually
      // so that _flush processes all of them in one loop iteration
      (db as any)._waitForDrain = false;
      
      // Directly populate the queue with multiple items to ensure they're all
      // processed in a single _flush() call
      (db as any)._data.set('key1', 'value1');
      (db as any)._data.set('key2', 'value2');
      (db as any)._data.set('key3', 'value3');
      (db as any)._queue.set('key1', []);
      (db as any)._queue.set('key2', []);
      (db as any)._queue.set('key3', []);

      // Manually call _flush - this should write key1, get backpressure,
      // then in original: stop (due to `if (_waitForDrain) return` inside loop)
      // in mutated: continue writing key2, key3 despite backpressure
      (db as any)._flush();

      // In original: only 1 write call (stops after backpressure)
      // In mutated: 3 write calls (ignores backpressure, writes all)
      expect(writeCallCount).toBe(1);

      // Cleanup
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});