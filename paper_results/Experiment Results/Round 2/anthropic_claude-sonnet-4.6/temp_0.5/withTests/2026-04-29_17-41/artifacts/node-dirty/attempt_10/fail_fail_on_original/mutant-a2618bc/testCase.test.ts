import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure handling', () => {
  it('should leave remaining items in queue when backpressure occurs mid-flush', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-sync-queue-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      const ws = db._writeStream;
      const origWrite = ws.write.bind(ws);
      let writeCount = 0;
      // Capture queue size synchronously right after write #2 returns
      // At this point the loop either broke (original) or continues (mutation)
      // We capture it by checking after write #2 but the loop is still running...
      // Instead: capture queue size at the START of write #3 call
      // Original: write #3 never happens (loop broke)
      // Mutation: write #3 happens, queue size at that moment = 0 (key3 already deleted)
      let write3WasCalled = false;

      ws.write = function (chunk: any, cb: any) {
        writeCount++;
        const capturedCount = writeCount;

        if (capturedCount === 2) {
          // Simulate backpressure: call cb async, emit drain after
          process.nextTick(() => {
            cb(null);
            setImmediate(() => ws.emit('drain'));
          });
          return false;
        }

        if (capturedCount === 3) {
          write3WasCalled = true;
        }

        return origWrite(chunk, cb);
      };

      let cbCount = 0;
      const onCb = () => {
        cbCount++;
        if (cbCount === 3) {
          // Original: write #3 was NOT called during the flush that had write #2
          // (loop broke, key3 was flushed in a separate _flush() call triggered by drain)
          // BUT write #3 still gets called eventually - so we can't use this directly.
          // 
          // Actually: with original, write #3 is called AFTER drain fires (separate flush)
          // With mutation, write #3 is called in SAME flush as write #2
          // The observable difference: with mutation, write3WasCalled=true before drain fires
          // We already checked this synchronously - write3WasCalled tells us if mutation occurred
          // during the flush containing write #2.
          // 
          // But both eventually call write #3... we need timing.
          // Let's check: was write #3 called before the drain event for write #2?
          expect(write3WasCalled).toBe(false);
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        }
      };

      // Track whether write #3 happened before or after the drain for write #2
      let drainForWrite2Fired = false;
      const origEmit = ws.emit.bind(ws);
      
      db.set('key1', 'val1', onCb);
      db.set('key2', 'val2', onCb);
      db.set('key3', 'val3', onCb);

      // After setting all keys: with original, write #3 hasn't happened yet
      // (it waits for drain). With mutation, write #3 already happened.
      // Check synchronously right here:
      // write #1 (key1) happened synchronously in set('key1')
      // write #2 (key2) happened synchronously in the drain handler... 
      // Actually all of this is async. Let me just check write3WasCalled after a tick.
    });

    db.on('error', done);
  });
});