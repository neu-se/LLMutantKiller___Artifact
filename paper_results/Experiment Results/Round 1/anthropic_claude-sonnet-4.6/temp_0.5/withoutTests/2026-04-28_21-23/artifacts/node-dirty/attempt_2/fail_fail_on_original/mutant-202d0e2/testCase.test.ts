import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event handling', () => {
  it('should flush remaining queued items after write stream drain event', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    const cleanup = (err?: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      if (err) done(err);
      else done();
    };

    db.on('load', () => {
      const ws = (db as any)._writeStream as (fs.WriteStream & { write: any });
      const origWrite = ws.write.bind(ws);
      let intercepted = false;

      // Intercept write to force backpressure on the first write call
      ws.write = (data: any, cb: any) => {
        if (!intercepted) {
          intercepted = true;
          // Call original but return false to simulate backpressure
          origWrite(data, cb);
          return false;
        }
        return origWrite(data, cb);
      };

      let callbackCount = 0;
      const totalKeys = 20;

      const timeout = setTimeout(() => {
        cleanup(new Error(`Only ${callbackCount}/${totalKeys} callbacks fired - drain did not trigger flush`));
      }, 4000);

      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, `val${i}`, () => {
          callbackCount++;
          if (callbackCount === totalKeys) {
            clearTimeout(timeout);
            db.close();
            cleanup();
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      cleanup(err);
    });
  }, 6000);
});