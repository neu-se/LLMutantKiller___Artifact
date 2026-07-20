import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event after write stream backpressure with inFlightWrites at zero', () => {
  it('should emit drain event when stream drains and inFlightWrites equals 0', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    const timeout = setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Timed out: drain event never fired'));
    }, 8000);

    db.on('load', () => {
      // Wait until write stream is ready, then patch it
      // We need write() to return false (backpressure) so _waitForDrain=true
      // but still invoke the callback so _inFlightWrites goes to 0
      // Then stream drain fires with _inFlightWrites===0 and empty queue
      const ws = db._writeStream;
      const realWrite = ws.write.bind(ws);

      (ws as any).write = (data: string, cb: (err?: Error | null) => void): boolean => {
        // Restore immediately so future writes work normally
        (ws as any).write = realWrite;
        // Call real write (which invokes cb asynchronously)
        realWrite(data, cb);
        // Return false to force _waitForDrain = true
        return false;
      };

      db.set('key1', 'value1');

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});