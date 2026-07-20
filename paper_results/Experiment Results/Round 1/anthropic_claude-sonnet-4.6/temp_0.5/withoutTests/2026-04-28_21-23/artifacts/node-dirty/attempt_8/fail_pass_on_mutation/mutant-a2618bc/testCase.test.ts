import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty _waitForDrain break behavior', () => {
  it('should stop processing queue when stream signals backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    let firstDrainFired = false;
    let writesAfterFirstDrain = 0;
    let writeCount = 0;

    const fsModule = require('fs');
    const originalCreateWriteStream = fsModule.createWriteStream;

    fsModule.createWriteStream = (...args: any[]) => {
      fsModule.createWriteStream = originalCreateWriteStream;
      const stream = originalCreateWriteStream(...args);
      const originalWrite = stream.write.bind(stream);

      stream.on('drain', () => {
        if (!firstDrainFired) {
          firstDrainFired = true;
        }
      });

      stream.write = function(data: any, cb: any) {
        writeCount++;
        const wc = writeCount;
        if (firstDrainFired) {
          writesAfterFirstDrain++;
        }
        originalWrite(data, cb);
        // On write #2, signal backpressure and schedule a drain
        if (wc === 2) {
          setImmediate(() => stream.emit('drain'));
          return false;
        }
        return true;
      };

      return stream;
    };

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 5;
      let callbackCount = 0;

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, i, () => {
          callbackCount++;
          if (callbackCount === numKeys) {
            setImmediate(() => {
              try {
                // Original: write #2 returns false → break, keys 2-4 written after drain
                //   writesAfterFirstDrain = 3
                // Mutation: no break → all 5 keys written before drain
                //   writesAfterFirstDrain = 0
                expect(writesAfterFirstDrain).toBeGreaterThan(0);
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