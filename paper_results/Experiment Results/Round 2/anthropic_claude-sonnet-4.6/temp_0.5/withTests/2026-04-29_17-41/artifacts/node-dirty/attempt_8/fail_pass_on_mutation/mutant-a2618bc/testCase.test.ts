import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure handling', () => {
  it('should set _waitForDrain to true after a write returns false, preventing immediate re-flush', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-waitdrain-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      const ws = db._writeStream;
      const origWrite = ws.write.bind(ws);
      let writeCount = 0;

      ws.write = function (chunk: any, cb: any) {
        writeCount++;
        if (writeCount === 2) {
          // Force backpressure on 2nd write (key2, which is in queue with key3)
          // and manually schedule drain so the stream recovers
          origWrite(chunk, cb);
          setImmediate(() => ws.emit('drain'));
          return false;
        }
        return origWrite(chunk, cb);
      };

      let cbCount = 0;
      const onCb = () => {
        cbCount++;
        if (cbCount === 3) {
          setTimeout(() => {
            try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
            done();
          }, 200);
        }
      };

      // key1 flushes alone (write #1, returns true) -> _waitForDrain = false
      db.set('key1', 'val1', onCb);
      // key2 and key3 queue up after key1's flush
      // They flush together when stream drain fires
      // write #2 (key2) returns false:
      //   original: breaks, key3 stays in queue, _waitForDrain = true
      //   mutation: continues to key3, _waitForDrain = result of write #3
      db.set('key2', 'val2', onCb);
      db.set('key3', 'val3', onCb);

      // After key1 flushes and stream drain fires for key1,
      // _flush() runs with key2+key3. Write #2 returns false.
      // Original: _waitForDrain = true after loop (broke after key2)
      // Mutation: _waitForDrain = result of write #3 (may be false)
      // We check _waitForDrain right after the second flush completes
      // by observing it when key2's callback fires
      const origEmit = db.emit.bind(db);
      let key2CbFired = false;
      // Patch: check _waitForDrain state when key2 write callback fires
      // In original: _waitForDrain should be true (loop broke after key2)
      // In mutation: _waitForDrain may be false (loop continued to key3)
      const origWriteForKey2 = ws.write.bind(ws);
      // Instead check via queue size: after write #2 returns false,
      // original should have key3 still in queue; mutation should not
      let queueSizeAfterWrite2 = -1;
      const origWrite2 = ws.write.bind(ws);
      ws.write = function (chunk: any, cb: any) {
        writeCount++;
        const currentCount = writeCount;
        const wrappedCb = (err: any) => {
          if (currentCount === 2) {
            // key2 callback: check queue size
            queueSizeAfterWrite2 = db._queue.size;
          }
          cb(err);
        };
        if (currentCount === 2) {
          origWrite(chunk, wrappedCb);
          setImmediate(() => ws.emit('drain'));
          return false;
        }
        return origWrite(chunk, wrappedCb);
      };

      db.once('write_close', () => {
        // Original: key3 was still in queue when key2 callback fired (queue size = 1)
        // Mutation: key3 was already written (queue size = 0)
        expect(queueSizeAfterWrite2).toBe(1);
      });
    });

    db.on('error', done);
  });
});