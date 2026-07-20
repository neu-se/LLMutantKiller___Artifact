import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should wait for in-flight writes to complete before closing the write stream', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-inflight-test-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let writeCbCalled = false;

      // set() calls _flush() synchronously, which moves items from queue to in-flight.
      // After set() returns: _queue.size === 0, _inFlightWrites === 1
      db.set('foo', 'bar', (_err: unknown) => {
        writeCbCalled = true;
      });

      // close() is called while _queue.size === 0 but _inFlightWrites > 0
      // Original: condition is true (_inFlightWrites > 0), so it waits for drain
      // Mutated: condition is false (queue empty, false), so it closes immediately
      db.close();

      db.once('write_close', () => {
        try { fs.unlinkSync(dbPath); } catch (_e) {}

        // In original: close waited for drain (fired after write completed),
        //   so writeCbCalled must be true when write_close fires
        // In mutated: close didn't wait, write_close fires before write completes,
        //   so writeCbCalled is false
        try {
          expect(writeCbCalled).toBe(true);
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  });
});