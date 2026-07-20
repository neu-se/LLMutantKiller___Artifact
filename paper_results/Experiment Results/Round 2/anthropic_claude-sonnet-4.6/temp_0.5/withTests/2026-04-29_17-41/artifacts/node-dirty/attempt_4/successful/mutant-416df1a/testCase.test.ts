import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('error emission on write failure without callback', () => {
  it('emits error when write fails and no callback was provided for the key', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(tmpFile);

    let timeoutHandle: ReturnType<typeof setTimeout>;

    db.on('load', () => {
      // Monkey-patch the write method to call callback with an error
      db._writeStream.write = (data: any, cb: any) => {
        // Call the callback with an error asynchronously
        setImmediate(() => cb(new Error('simulated write error')));
        return true; // pretend no backpressure
      };

      db.on('error', (err: Error) => {
        // Original: emits error when !cbs.length && err != null (no callback → error emitted)
        // Mutated: does NOT emit error when cbs.length === 0
        clearTimeout(timeoutHandle);
        expect(err.message).toBe('simulated write error');
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        done();
      });

      // Set WITHOUT a callback → cbs array is empty (length === 0)
      db.set('testkey', 'testval');

      timeoutHandle = setTimeout(() => {
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        done(new Error('Expected error event was not emitted'));
      }, 2000);
    });
  });
});