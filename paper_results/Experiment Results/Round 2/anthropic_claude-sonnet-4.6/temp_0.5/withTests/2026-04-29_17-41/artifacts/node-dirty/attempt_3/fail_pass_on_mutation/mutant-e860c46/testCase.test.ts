import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() behavior with in-flight writes', () => {
  it('should complete in-flight writes without error when close is called immediately after set', (done) => {
    const file = path.join(os.tmpdir(), `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let writeError: Error | null = null;

    db.on('error', (err: Error) => {
      writeError = err;
    });

    db.on('write_close', () => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      // In original: close() waits for drain (in-flight writes finish), no error
      // In mutated: close() destroys stream immediately, write callback gets error
      expect(writeError).toBeNull();
      done();
    });

    db.on('load', () => {
      // This set flushes immediately: queue is cleared, _inFlightWrites becomes 1
      // The write callback hasn't fired yet when we call close()
      db.set('key', 'value', (err: Error | null) => {
        // In mutated code, stream is destroyed before this fires -> err is set
        writeError = err;
      });
      // Call close synchronously before the write callback can fire
      db.close();
    });
  });
});