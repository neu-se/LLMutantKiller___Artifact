import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush with waitForDrain scenario', () => {
  it('should flush all queued keys after drain when write buffer was full', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write a large value to force _waitForDrain = true
      const largeValue = 'x'.repeat(1024 * 1024 * 16); // 16MB to force drain
      let callbackCount = 0;
      const totalKeys = 3;

      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
        done(new Error(`Timeout: only ${callbackCount}/${totalKeys} callbacks fired`));
      }, 5000);

      const onSet = (err?: Error) => {
        if (err) {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
          done(err);
          return;
        }
        callbackCount++;
        if (callbackCount === totalKeys) {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
          done();
        }
      };

      // First write is large to force _waitForDrain = true
      db.set('key1', largeValue, onSet);
      // These get queued because _waitForDrain is true
      db.set('key2', 'val2', onSet);
      db.set('key3', 'val3', onSet);
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch {}
      done(err);
    });
  });
});