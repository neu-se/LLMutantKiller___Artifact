import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Writable } from 'stream';

describe('dirty _flush backpressure handling', () => {
  it('should not emit extra drain events when backpressure occurs mid-queue', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    // Use in-memory only (no file path) so there's no write stream setup
    // Then manually trigger the scenario by patching internals after construction
    const file = path.join(os.tmpdir(), `dirty-extra-drain-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Intercept the write stream's write method to control backpressure
      // write #1 (key1, standalone flush): returns false -> _waitForDrain = true
      // write #2 (key2, second flush with key2+key3): returns false -> mutation continues, original breaks
      // write #3 (key3): returns true -> _waitForDrain = false (mutation only)
      let writeCallCount = 0;
      const ws = db._writeStream;
      const origWrite = ws.write.bind(ws);

      // Track drain events emitted by dirty (not the stream)
      const drainEvents: number[] = [];
      db.on('drain', () => drainEvents.push(Date.now()));

      ws.write = function (chunk: any, cb: any) {
        writeCallCount++;
        const result = origWrite(chunk, cb);
        // Force false on write #2 to simulate backpressure mid-queue
        if (writeCallCount === 2) {
          return false;
        }
        return result;
      };

      let cbCount = 0;
      const onDone = () => {
        cbCount++;
        if (cbCount === 3) {
          // Wait for all async events to settle
          setTimeout(() => {
            // With original: drain fires once (stream drain -> flush key3 -> key3 cb emits drain)
            // With mutation: drain fires twice (key3 cb emits drain, then stream drain handler
            //                also emits drain because queue is empty and _inFlightWrites=0)
            expect(drainEvents.length).toBe(1);
            try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
            done();
          }, 500);
        }
      };

      db.set('key1', 'val1', onDone);
      db.set('key2', 'val2', onDone);
      db.set('key3', 'val3', onDone);
    });

    db.on('error', done);
  });
});