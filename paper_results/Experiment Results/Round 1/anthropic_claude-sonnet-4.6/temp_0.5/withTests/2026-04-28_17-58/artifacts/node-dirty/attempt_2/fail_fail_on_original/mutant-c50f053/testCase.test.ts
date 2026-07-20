import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty _flush error emission without callback', () => {
  it('should emit error event when write fails and set was called without a callback', (done) => {
    const filePath = path.join(os.tmpdir(), `test-dirty-mutant-${process.pid}.dirty`);

    try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }

    const db = new Dirty(filePath);

    db.on('load', () => {
      // Intercept the write stream to simulate a write error
      const ws = db._writeStream;
      const originalWrite = ws.write.bind(ws);
      ws.write = (data: any, cb: Function) => {
        // Simulate a write error by calling callback with an error
        setImmediate(() => cb(new Error('Simulated disk write error')));
        return true;
      };

      // Listen for the error event
      // Original code: emits 'error' when !cbs.length && err != null
      // Mutated code: never emits 'error' (if false)
      db.once('error', (err: Error) => {
        expect(err.message).toBe('Simulated disk write error');
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
        done();
      });

      // Set without a callback so cbs.length === 0
      db.set('someKey', 'someValue');
    });

    // Fail the test if error is never emitted (mutated code behavior)
    setTimeout(() => {
      try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      done(new Error('Expected error event was never emitted (possible mutation detected)'));
    }, 2000);
  });
});