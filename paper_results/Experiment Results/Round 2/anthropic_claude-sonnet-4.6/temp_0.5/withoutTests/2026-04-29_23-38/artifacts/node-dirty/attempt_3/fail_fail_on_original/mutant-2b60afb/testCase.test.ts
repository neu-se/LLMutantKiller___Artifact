import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event mutation detection', () => {
  it('should emit drain when write stream drains with empty queue after backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-mutation-test-${process.pid}.db`);

    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Strategy: intercept the writeStream to force write() to return false
      // so _waitForDrain becomes true with exactly one item in queue
      const writeStream = (db as any)._writeStream;
      const originalWrite = writeStream.write.bind(writeStream);
      let forceBackpressure = true;

      writeStream.write = function(data: any, cb: any) {
        if (forceBackpressure) {
          forceBackpressure = false;
          // Call original write but return false to simulate backpressure
          originalWrite(data, cb);
          return false;
        }
        return originalWrite(data, cb);
      };

      const timeout = setTimeout(() => {
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done(new Error('drain event was never emitted'));
      }, 5000);

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done();
      });

      // Write one item - this will trigger _flush, which calls write() returning false
      // so _waitForDrain = true, queue is now empty
      // write callback fires: _inFlightWrites becomes 0, but _waitForDrain is true -> no drain emit
      // stream drain fires: original -> queue empty -> emit drain; mutated -> _flush() no-op -> no drain
      db.set('key1', { value: 'test' });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});