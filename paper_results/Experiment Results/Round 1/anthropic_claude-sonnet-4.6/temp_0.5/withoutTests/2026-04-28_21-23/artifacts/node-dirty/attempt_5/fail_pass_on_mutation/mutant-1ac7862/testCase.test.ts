import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event count', () => {
  it('should emit drain exactly once after all keys set simultaneously are flushed', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
      });

      let callbackCount = 0;
      const totalKeys = 3;

      const onSet = (err?: Error) => {
        if (err) {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
          done(err);
          return;
        }
        callbackCount++;
        if (callbackCount === totalKeys) {
          // All callbacks fired - check drain was emitted exactly once
          setImmediate(() => {
            try {
              expect(drainCount).toBe(1);
              try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
              done();
            } catch (e) {
              try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
              done(e);
            }
          });
        }
      };

      db.set('key1', 'val1', onSet);
      db.set('key2', 'val2', onSet);
      db.set('key3', 'val3', onSet);
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
      done(err);
    });
  });
});