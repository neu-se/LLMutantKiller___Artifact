import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event', () => {
  it('drain fires exactly once when writes trigger backpressure', (done) => {
    // Force a tiny highWaterMark on the write stream by monkey-patching fs.createWriteStream
    const originalCreateWriteStream = fs.createWriteStream;
    let writeStreamCreated = false;

    (fs as any).createWriteStream = function(p: string, opts: any) {
      if (!writeStreamCreated && p === tmpFile) {
        writeStreamCreated = true;
        // Force tiny buffer to guarantee backpressure
        opts = { ...opts, highWaterMark: 1 };
      }
      return originalCreateWriteStream.call(fs, p, opts);
    };

    const tmpFile = path.join(os.tmpdir(), `dirty-drain-hw-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    const db = new Dirty(tmpFile);
    let drainCount = 0;
    const NUM_KEYS = 20;
    let callbacksFired = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, 'value' + i, () => {
          callbacksFired++;
          if (callbacksFired === NUM_KEYS) {
            setImmediate(() => {
              fs.createWriteStream = originalCreateWriteStream;
              try {
                expect(drainCount).toBe(1);
                db.close();
                db.on('write_close', () => {
                  try { fs.unlinkSync(tmpFile); } catch (_) {}
                  done();
                });
              } catch (e) {
                try { fs.unlinkSync(tmpFile); } catch (_) {}
                done(e);
              }
            });
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      fs.createWriteStream = originalCreateWriteStream;
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});