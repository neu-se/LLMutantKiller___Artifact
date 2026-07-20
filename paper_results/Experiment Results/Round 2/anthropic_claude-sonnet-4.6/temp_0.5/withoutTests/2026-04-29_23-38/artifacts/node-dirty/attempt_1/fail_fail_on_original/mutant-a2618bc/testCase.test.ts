import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty backpressure handling', () => {
  it('should respect write stream backpressure and only flush remaining items after drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // We'll track how many times _flush is called by monitoring the queue behavior
      // The key observable: with original code, when backpressure occurs mid-loop,
      // remaining keys stay in queue until drain. With mutation, all keys are written immediately.
      
      // To observe this, we intercept the writeStream's write method to simulate backpressure
      // after the first write, then check queue state
      
      const writeStream = (db as any)._writeStream;
      let writeCount = 0;
      const originalWrite = writeStream.write.bind(writeStream);
      
      // Track queue sizes after each write call
      const queueSizesAfterWrite: number[] = [];
      
      writeStream.write = function(data: string, cb: Function) {
        writeCount++;
        const result = originalWrite(data, cb);
        // After each write, record queue size
        queueSizesAfterWrite.push((db as any)._queue.size);
        
        // Return false after first write to simulate backpressure
        if (writeCount === 1) {
          (db as any)._waitForDrain = true;
          return false;
        }
        return result;
      };

      // Set multiple keys to fill the queue
      db.set('key1', 'val1');
      db.set('key2', 'val2');
      db.set('key3', 'val3');

      // Give a tick for the flush to happen
      setImmediate(() => {
        // In original code: after first write triggers backpressure, loop breaks
        // So key2 and key3 should remain in queue (queue size >= 2 after first write)
        // In mutated code: loop continues despite backpressure, all items written
        // So queue would be empty after flush
        
        // The observable difference: with original, queue still has items after partial flush
        // With mutation, queue is empty because all items were written despite backpressure
        
        // Check: in original, queueSizesAfterWrite[0] should be > 0 (items remain after first write)
        // In mutation, all items are written so queue drains to 0 quickly
        
        if (queueSizesAfterWrite.length > 0) {
          // Original: after first write with backpressure, remaining keys stay in queue
          // The queue should have had items remaining after the first write
          expect(queueSizesAfterWrite[0]).toBeGreaterThan(0);
        } else {
          // If no writes happened, that's also a problem
          expect(queueSizesAfterWrite.length).toBeGreaterThan(0);
        }

        db.close();
        
        db.on('write_close', () => {
          rimraf(tmpDir).then(() => done()).catch(done);
        });
      });
    });

    db.on('error', done);
  });
});