import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('should emit db drain event before write_close when close called during in-flight write', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-inflight-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let drainEmitted = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainEmitted = true;
      });

      db.set('key1', 'value1');

      // At this point _flush() has run: _queue.size === 0, _inFlightWrites === 1
      // Original: close() sees _inFlightWrites > 0, registers once('drain', close), returns
      //   -> write callback fires, _inFlightWrites becomes 0, drain emitted
      //   -> drain handler calls close() again, write stream ends
      // Mutated: close() sees _queue.size === 0 and false, skips wait, calls writeStream.end()
      //   -> write callback fires AFTER end() called, but drain may not be emitted
      //      because _waitForDrain check or stream already ending
      db.close();

      db.on('write_close', () => {
        // In original: drain was emitted (from write callback) before close() was re-called
        // In mutated: close() called writeStream.end() immediately, drain may not have fired
        expect(drainEmitted).toBe(true);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});