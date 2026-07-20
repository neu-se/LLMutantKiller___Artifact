import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for in-flight writes', () => {
  it('should not emit write_close until after the drain event fires', (done) => {
    const file = path.join(os.tmpdir(), `dirty-timing-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
      });

      // set() -> _flush() -> queue cleared, _inFlightWrites=1
      db.set('key', 'value');

      // Synchronously close: queue.size=0, _inFlightWrites=1
      // Original: registers once('drain', close), returns - write_close deferred
      // Mutated: calls _writeStream.end() immediately
      db.close();

      // In original, write_close fires only AFTER drain
      // In mutated, write_close fires before drain
      // So we check: when write_close fires, has drain fired at least once?
      db.once('write_close', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        // Original: drain fired before write_close (drainCount >= 1)
        // Mutated: write_close fires before drain (drainCount === 0)
        expect(drainCount).toBeGreaterThanOrEqual(1);
        done();
      });
    });
  });
});