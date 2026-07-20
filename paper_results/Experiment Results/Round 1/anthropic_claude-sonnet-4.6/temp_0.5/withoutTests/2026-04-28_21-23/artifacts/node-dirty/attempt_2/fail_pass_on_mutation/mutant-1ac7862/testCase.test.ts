import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush behavior with multiple keys', () => {
  it('should invoke callbacks for all keys when multiple keys are set simultaneously', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      let callbacksFired = 0;
      const totalKeys = 3;

      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
        done(new Error(`Timeout: only ${callbacksFired}/${totalKeys} callbacks fired`));
      }, 2000);

      const onSet = (err?: Error) => {
        if (err) {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
          done(err);
          return;
        }
        callbacksFired++;
        if (callbacksFired === totalKeys) {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
          done();
        }
      };

      db.set('key1', 'val1', onSet);
      db.set('key2', 'val2', onSet);
      db.set('key3', 'val3', onSet);
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  });
});