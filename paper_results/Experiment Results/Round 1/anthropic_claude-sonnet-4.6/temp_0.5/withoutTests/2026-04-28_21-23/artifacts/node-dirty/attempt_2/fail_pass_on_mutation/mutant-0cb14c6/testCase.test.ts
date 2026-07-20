import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event when inFlightWrites is exactly 0 after write stream drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath) as any;
    let testDone = false;

    const finish = (err?: Error) => {
      if (testDone) return;
      testDone = true;
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    };

    db.on('load', () => {
      const ws = db._writeStream as NodeJS.WritableStream & { emit: (event: string) => boolean };

      // Intercept write to simulate backpressure scenario:
      // - The write callback fires (decrementing _inFlightWrites to 0)
      // - Then the stream emits 'drain'
      // - At that point _inFlightWrites === 0, so original code emits 'drain', mutated code doesn't
      const origWrite = (ws as any).write.bind(ws);
      (ws as any).write = (chunk: any, cb: any) => {
        // Perform the actual write so the callback fires (decrementing _inFlightWrites)
        origWrite(chunk, cb);
        // Force backpressure flag
        db._waitForDrain = true;
        // Emit 'drain' on the write stream after the write callback has fired
        setImmediate(() => setImmediate(() => ws.emit('drain')));
        return false;
      };

      db.once('drain', () => {
        finish();
      });

      db.set('testKey', { hello: 'world' });
    });

    db.on('error', (err: Error) => finish(err));
    setTimeout(() => finish(new Error('Timed out: drain event was never emitted')), 3000);
  });
});