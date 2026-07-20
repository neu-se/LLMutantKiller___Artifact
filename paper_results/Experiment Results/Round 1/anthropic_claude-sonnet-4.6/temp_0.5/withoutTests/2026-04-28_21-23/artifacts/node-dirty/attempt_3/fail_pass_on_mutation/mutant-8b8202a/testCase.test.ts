import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should emit drain exactly once after all writes complete', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainCount = 0;
      let allCallbacksFired = false;
      const total = 100;
      let callbacksReceived = 0;

      db.on('drain', () => {
        drainCount++;
      });

      for (let i = 0; i < total; i++) {
        db.set(`key${i}`, { data: 'x'.repeat(2000), index: i }, () => {
          callbacksReceived++;
          if (callbacksReceived === total) {
            allCallbacksFired = true;
            setTimeout(() => {
              try {
                // In original: drain fires exactly once (from the write callback path)
                // In mutated: drain fires more than once because the write stream drain
                // handler always emits it, plus the write callback also emits it
                expect(drainCount).toBe(1);
                db.close();
                db.on('write_close', () => {
                  try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
                  done();
                });
              } catch (e) {
                try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
                done(e);
              }
            }, 200);
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  }, 15000);
});