import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty _waitForDrain break behavior', () => {
  it('should have remaining keys in queue when drain fires after backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    let queueSizeAtDrain = -1;
    let writeCount = 0;
    let streamRef: any = null;

    const fsModule = require('fs');
    const originalCreateWriteStream = fsModule.createWriteStream;

    fsModule.createWriteStream = (...args: any[]) => {
      fsModule.createWriteStream = originalCreateWriteStream;
      const stream = originalCreateWriteStream(...args);
      streamRef = stream;
      const originalWrite = stream.write.bind(stream);

      stream.write = function(data: any, cb: any) {
        writeCount++;
        const wc = writeCount;
        originalWrite(data, cb);
        if (wc === 2) {
          // Schedule drain after this write
          setImmediate(() => stream.emit('drain'));
          return false;
        }
        return true;
      };

      return stream;
    };

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    // Intercept the drain handler to capture queue size
    const originalEmit = db.emit.bind(db);

    db.on('load', () => {
      const numKeys = 5;
      let callbackCount = 0;

      // Listen to the stream drain to capture queue size at that moment
      // We need to capture _queue.size when stream drain fires
      // But _queue is private...

      // Alternative: count how many set() callbacks fire BEFORE vs AFTER drain
      let drainFired = false;
      let callbacksBeforeDrain = 0;
      let callbacksAfterDrain = 0;

      db.once('drain', () => {
        drainFired = true;
      });

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, i, () => {
          if (drainFired) {
            callbacksAfterDrain++;
          } else {
            callbacksBeforeDrain++;
          }
          callbackCount++;
          if (callbackCount === numKeys) {
            setImmediate(() => {
              try {
                // Original: write #2 breaks → keys 0,1 written first batch
                //   callbacks for key0,key1 fire before Dirty drain
                //   callbacks for key2,key3,key4 fire after Dirty drain
                //   callbacksAfterDrain = 3
                // Mutation: all 5 keys written in one batch
                //   all callbacks fire before Dirty drain (or at drain time)
                //   callbacksAfterDrain = 0
                expect(callbacksAfterDrain).toBeGreaterThan(0);
                try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
                done();
              } catch (e) {
                try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
                done(e as Error);
              }
            });
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(err);
    });
  }, 15000);
});