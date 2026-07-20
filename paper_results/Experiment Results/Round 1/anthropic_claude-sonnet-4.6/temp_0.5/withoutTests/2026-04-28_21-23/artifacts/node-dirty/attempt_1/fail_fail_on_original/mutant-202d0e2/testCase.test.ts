import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event triggers flush for remaining queue items', () => {
  it('should call all callbacks when write stream drain causes remaining queue items to be flushed', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const callbackResults: string[] = [];
      let pendingCallbacks = 0;
      
      // We need to force a scenario where _waitForDrain becomes true
      // by writing enough data to fill the write stream buffer,
      // then having more items queued that need to be flushed on drain.
      
      // Write a large number of entries to try to trigger backpressure
      // The key is that some writes will be queued while waiting for drain
      const totalKeys = 100;
      pendingCallbacks = totalKeys;
      
      // Force _waitForDrain by patching the write stream to return false
      // We need to simulate backpressure: make the first write return false
      // so _waitForDrain = true, then queue more items, then drain fires
      
      // Access internal write stream and make it return false to simulate backpressure
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let writeCount = 0;
      db._writeStream.write = function(data: any, cb: any) {
        writeCount++;
        if (writeCount === 1) {
          // First write: call original but return false to simulate backpressure
          originalWrite(data, cb);
          return false; // Signal backpressure
        }
        return originalWrite(data, cb);
      };
      
      // Set multiple keys - first one will cause _waitForDrain = true
      // subsequent ones will be queued but not flushed until drain
      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, `value${i}`, (err: Error | null) => {
          callbackResults.push(`key${i}`);
          pendingCallbacks--;
          if (pendingCallbacks === 0) {
            // All callbacks received - test passes
            db.close();
            rimraf(tmpDir).then(() => done()).catch(done);
          }
        });
      }
      
      // Set a timeout to fail if not all callbacks are received
      setTimeout(() => {
        if (pendingCallbacks > 0) {
          db.close();
          rimraf(tmpDir).then(() => {
            done(new Error(`Expected all ${totalKeys} callbacks but only got ${totalKeys - pendingCallbacks}`));
          }).catch(done);
        }
      }, 3000);
    });
    
    db.on('error', (err: Error) => {
      rimraf(tmpDir).catch(() => {});
      done(err);
    });
  });
});