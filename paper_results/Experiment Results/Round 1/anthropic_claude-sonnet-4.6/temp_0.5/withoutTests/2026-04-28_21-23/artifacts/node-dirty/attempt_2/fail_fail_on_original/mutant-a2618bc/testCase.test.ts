import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush backpressure behavior', () => {
  it('should emit drain only after all write callbacks have been called', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 500;
      let callbacksFired = 0;
      let drainFired = false;

      db.once('drain', () => {
        drainFired = true;
        try {
          expect(callbacksFired).toBe(numKeys);
          // Cleanup
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
          done();
        } catch (e) {
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
          done(e as Error);
        }
      });

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, { index: i }, () => {
          callbacksFired++;
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      done(err);
    });
  }, 15000);
});