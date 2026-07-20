import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event after write stream backpressure', () => {
  it('should emit drain event when queue is empty after write stream drain event', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-${process.pid}-${Date.now()}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Intercept the write stream to force backpressure on first write
      const ws = db._writeStream;
      const originalWrite = ws.write.bind(ws);
      let forcedBackpressure = false;

      ws.write = function(data: any, cb: any) {
        if (!forcedBackpressure) {
          forcedBackpressure = true;
          // Call the real write but return false to signal backpressure
          originalWrite(data, cb);
          // Schedule a fake drain event after the real write completes
          setImmediate(() => ws.emit('drain'));
          return false;
        }
        return originalWrite(data, cb);
      };

      db.once('drain', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });

      // Set only one key - after backpressure + drain, queue will be empty
      // Original: emits 'drain' because queue is empty
      // Mutated: calls _flush() which returns early (queue empty, waitForDrain false), never emits 'drain'
      db.set('key1', 'value1');
    });
  }, 10000);
});