import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _waitForDrain break behavior', () => {
  it('should not emit extra drain events when multiple writes signal backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // We need to intercept BEFORE Dirty constructor is called
    const originalCreateWriteStream = fs.createWriteStream;
    let writeCallCount = 0;
    
    const mockCreateWriteStream = (...args: Parameters<typeof fs.createWriteStream>) => {
      const stream = originalCreateWriteStream(...args);
      const originalWrite = stream.write.bind(stream);
      
      (stream as any).write = function(data: any, encodingOrCb: any, cb?: any) {
        writeCallCount++;
        const wc = writeCallCount;
        // Call original write
        let result: boolean;
        if (typeof encodingOrCb === 'function') {
          result = originalWrite(data, encodingOrCb);
        } else {
          result = originalWrite(data, encodingOrCb, cb);
        }
        // Force backpressure on writes 1 and 3 (to simulate multiple drain events needed)
        if (wc === 1 || wc === 3) {
          return false;
        }
        return result;
      };
      
      return stream;
    };
    
    (fs as any).createWriteStream = mockCreateWriteStream;
    const db = new Dirty(dbPath);
    (fs as any).createWriteStream = originalCreateWriteStream;

    db.on('load', () => {
      let drainCount = 0;
      let callbackCount = 0;
      const numKeys = 4;
      
      db.on('drain', () => {
        drainCount++;
      });

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, i, () => {
          callbackCount++;
          if (callbackCount === numKeys) {
            setTimeout(() => {
              try {
                // With original: drain fires exactly once (after all batches complete)
                // With mutation: drain may fire multiple times due to spurious drain events
                expect(drainCount).toBe(1);
                try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
                done();
              } catch (e) {
                try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
                done(e as Error);
              }
            }, 300);
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(err);
    });
  }, 10000);
});