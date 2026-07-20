import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure handling', () => {
  it('should leave remaining queue items unprocessed when backpressure occurs mid-flush', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-queue-check-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      const ws = db._writeStream;
      const origWrite = ws.write.bind(ws);
      let writeCount = 0;
      let queueSizeAtKey2Callback = -1;

      ws.write = function (chunk: any, cb: any) {
        writeCount++;
        const capturedCount = writeCount;

        if (capturedCount === 2) {
          // For write #2: call cb via nextTick (simulating async write),
          // then emit drain after cb fires, and return false for backpressure.
          // Do NOT call origWrite to avoid the real stream also emitting drain.
          process.nextTick(() => {
            queueSizeAtKey2Callback = db._queue.size;
            cb(null);
            // Emit drain after callback so _flush() can process remaining queue
            setImmediate(() => ws.emit('drain'));
          });
          return false;
        }
        return origWrite(chunk, cb);
      };

      let cbCount = 0;
      const onCb = () => {
        cbCount++;
        if (cbCount === 3) {
          // Original: when key2 cb fired, key3 was still in queue (size=1)
          // Mutation: when key2 cb fired, key3 was already dequeued (size=0)
          expect(queueSizeAtKey2Callback).toBe(1);
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        }
      };

      db.set('key1', 'val1', onCb);
      db.set('key2', 'val2', onCb);
      db.set('key3', 'val3', onCb);
    });

    db.on('error', done);
  });
});