import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty _waitForDrain break behavior', () => {
  it('should emit drain exactly once when backpressure occurs during flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    let writeCount = 0;

    const fsModule = require('fs');
    const originalCreateWriteStream = fsModule.createWriteStream;

    fsModule.createWriteStream = (...args: any[]) => {
      fsModule.createWriteStream = originalCreateWriteStream;
      const stream = originalCreateWriteStream(...args);
      const originalWrite = stream.write.bind(stream);

      stream.write = function(data: any, cb: any) {
        writeCount++;
        const wc = writeCount;
        const wrappedCb = (err?: Error) => {
          cb(err);
          if (wc === 2) {
            // Emit drain after key1's write callback fires
            setImmediate(() => stream.emit('drain'));
          }
        };
        originalWrite(data, wrappedCb);
        if (wc === 2) return false;
        return true;
      };

      return stream;
    };

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 5;
      let drainCount = 0;
      let callbackCount = 0;

      db.on('drain', () => {
        drainCount++;
      });

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, i, () => {
          callbackCount++;
          if (callbackCount === numKeys) {
            setImmediate(() => {
              try {
                // Original: drain fires once (second batch completes, then setImmediate drain
                //   fires but queue was already processed → no spurious drain)
                // Mutation: drain fires twice (once from last callback, once from setImmediate
                //   drain that fires after all callbacks with _inFlightWrites=0)
                expect(drainCount).toBe(1);
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