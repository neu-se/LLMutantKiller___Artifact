import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event triggers flush of remaining queue items', () => {
  it('should call all set callbacks even when write stream emits drain mid-flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const timeout = setTimeout(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error('Test timed out - not all callbacks were called (mutation likely detected)'));
    }, 8000);

    const db = new Dirty(file);

    db.on('load', () => {
      const totalKeys = 200;
      let callbackCount = 0;

      // Large value to force write stream buffering and drain events
      const largeValue = 'x'.repeat(65536);

      const checkDone = (err?: Error | null) => {
        if (err) {
          clearTimeout(timeout);
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
          return;
        }
        callbackCount++;
        if (callbackCount === totalKeys) {
          clearTimeout(timeout);
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        }
      };

      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, largeValue + i, checkDone);
      }
    });

    db.on('error', (err: Error) => {
      clearTimeout(timeout);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  });
});