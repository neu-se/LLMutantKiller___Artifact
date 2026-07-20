import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event after write stream backpressure', () => {
  it('should emit drain when queue is empty after write stream drain, with no pending write callbacks', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-${process.pid}-${Date.now()}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      const ws = db._writeStream;
      const originalWrite = ws.write.bind(ws);
      let firstWrite = true;

      ws.write = function(data: any, cb: any) {
        if (firstWrite) {
          firstWrite = false;
          // Call cb synchronously to complete the in-flight write BEFORE drain fires
          // This means when drain fires: _inFlightWrites=0, _waitForDrain=true, queue=empty
          // The write callback path won't emit drain because _waitForDrain is still true at cb time
          const wrappedCb = (err: any) => {
            // call original cb
            cb(err);
            // Now manually emit drain on write stream
            // At this point: _inFlightWrites=0, _waitForDrain=true (cb ran, didn't emit drain)
            setImmediate(() => ws.emit('drain'));
          };
          originalWrite(data, wrappedCb);
          return false; // force _waitForDrain = true
        }
        return originalWrite(data, cb);
      };

      db.once('drain', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });

      db.set('key1', 'value1');
    });
  }, 10000);
});