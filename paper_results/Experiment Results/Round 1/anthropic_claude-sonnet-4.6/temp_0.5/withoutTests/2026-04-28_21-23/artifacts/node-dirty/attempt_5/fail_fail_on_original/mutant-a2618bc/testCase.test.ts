import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _waitForDrain break behavior', () => {
  it('should write remaining queued keys after stream drain when backpressure occurs during flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    let firstDrainFired = false;
    let writesAfterFirstDrain = 0;

    const spy = jest.spyOn(fs, 'createWriteStream').mockImplementation((...args: any[]) => {
      spy.mockRestore();
      const stream = (fs.createWriteStream as any)(...args);
      const originalWrite = stream.write.bind(stream);

      // Add listener before Dirty's drain listener so it fires first
      stream.on('drain', () => {
        firstDrainFired = true;
      });

      stream.write = function (data: any, cb: any) {
        if (firstDrainFired) {
          writesAfterFirstDrain++;
        }
        return originalWrite(data, cb);
      };

      return stream;
    });

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 10;
      // ~5KB per entry × 10 = ~50KB, well above the 16KB stream high water mark
      const largeValue = 'x'.repeat(5000);
      let callbackCount = 0;

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, { data: largeValue, index: i }, () => {
          callbackCount++;
          if (callbackCount === numKeys) {
            setImmediate(() => {
              try {
                // Original: break on backpressure → remaining keys written after drain
                //   writesAfterFirstDrain > 0
                // Mutation: no break → all keys written before drain
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