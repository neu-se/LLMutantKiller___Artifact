import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event after write stream backpressure is relieved with inFlightWrites === 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      // We need to trigger the write stream drain path where _inFlightWrites === 0
      // This happens when:
      // 1. A write causes backpressure (_waitForDrain = true)
      // 2. The write stream emits 'drain'
      // 3. At that point _inFlightWrites should be 0 (the write callback already decremented it)
      // 4. The drain event should be emitted
      
      // Write a single key-value pair and wait for the drain event
      let drainReceived = false;
      
      db.on('drain', () => {
        drainReceived = true;
        
        // Cleanup
        db.close();
        db.on('write_close', () => {
          rimraf(tmpDir).then(() => {
            expect(drainReceived).toBe(true);
            done();
          }).catch(done);
        });
      });
      
      // Simulate the scenario where write stream drain fires with _inFlightWrites === 0
      // We do this by writing data and then manually triggering the drain scenario
      // by overriding the write stream to simulate backpressure
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let firstWrite = true;
      
      db._writeStream.write = function(data, cb) {
        if (firstWrite) {
          firstWrite = false;
          // Call original write
          const result = originalWrite(data, cb);
          // Simulate that write returned false (backpressure)
          // by setting _waitForDrain to true and then emitting drain on the stream
          db._waitForDrain = true;
          // Emit drain on the write stream after a tick to simulate backpressure relief
          setImmediate(() => {
            db._writeStream.emit('drain');
          });
          return false;
        }
        return originalWrite(data, cb);
      };
      
      db.set('testKey', 'testValue');
    });
    
    db.on('error', done);
    
    // Timeout safety
    setTimeout(() => {
      rimraf(tmpDir).catch(() => {});
      done(new Error('Test timed out - drain event was never emitted'));
    }, 5000);
  });
});