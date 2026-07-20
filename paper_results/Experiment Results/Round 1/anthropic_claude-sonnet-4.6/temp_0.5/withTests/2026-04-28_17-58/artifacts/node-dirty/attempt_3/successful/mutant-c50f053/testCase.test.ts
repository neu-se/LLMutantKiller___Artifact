import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty _flush error emission without callback', () => {
  it('should emit error event when write fails and set was called without a callback', (done) => {
    const filePath = path.join(os.tmpdir(), `test-dirty-mutant-nocb-${process.pid}.dirty`);

    try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }

    const db = new Dirty(filePath);

    db.on('load', () => {
      // Replace the write stream's write method to simulate a write error
      const ws = db._writeStream as any;
      ws.write = (data: any, cb?: (err: Error | null) => void) => {
        if (cb) setImmediate(() => cb(new Error('Simulated disk write error')));
        return true;
      };

      // In original code: emits 'error' when !cbs.length && err != null
      // In mutated code: never emits 'error' (if false branch)
      const errorTimeout = setTimeout(() => {
        done(new Error('Expected error event was never emitted'));
      }, 1000);
      errorTimeout.unref();

      db.once('error', (err: Error) => {
        clearTimeout(errorTimeout);
        expect(err.message).toBe('Simulated disk write error');
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
        done();
      });

      // Set without a callback so cbs array is empty (cbs.length === 0)
      db.set('someKey', 'someValue');
    });
  });
});