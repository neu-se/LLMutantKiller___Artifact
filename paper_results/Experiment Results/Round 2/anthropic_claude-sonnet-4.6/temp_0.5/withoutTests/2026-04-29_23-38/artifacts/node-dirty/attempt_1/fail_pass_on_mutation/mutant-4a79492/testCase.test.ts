import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain behavior with pending queue', () => {
  it('should flush remaining queue items after write stream drain event', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const callbacksReceived: string[] = [];
      let totalExpected = 0;
      
      // We need to trigger a scenario where:
      // 1. A write causes backpressure (waitForDrain = true)
      // 2. More items are queued
      // 3. When drain fires, the remaining queue should be flushed
      
      // Write a large number of items to try to trigger backpressure
      // and ensure queue has pending items when drain fires
      const numItems = 100;
      totalExpected = numItems;
      
      let completedCount = 0;
      
      const checkDone = () => {
        completedCount++;
        if (completedCount === totalExpected) {
          // All callbacks received - verify all keys are in the db
          for (let i = 0; i < numItems; i++) {
            const val = db.get(`key${i}`);
            if (val === undefined || val.index !== i) {
              // Clean up
              try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
              done(new Error(`Key key${i} not found or has wrong value: ${JSON.stringify(val)}`));
              return;
            }
          }
          
          // Clean up
          db.close();
          db.once('write_close', () => {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
            done();
          });
        }
      };
      
      // Write all items - some may queue up while waiting for drain
      for (let i = 0; i < numItems; i++) {
        db.set(`key${i}`, { index: i, data: 'x'.repeat(100) }, (err: Error | null) => {
          if (err) {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
            done(err);
            return;
          }
          callbacksReceived.push(`key${i}`);
          checkDone();
        });
      }
    });
    
    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) {}
      done(err);
    });
    
    // Timeout to detect if callbacks are never called (mutation causes items to be dropped)
  }, 10000);
});