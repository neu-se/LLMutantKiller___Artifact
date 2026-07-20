import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty _flush backpressure handling', () => {
  it('should emit drain exactly once when backpressure occurs mid-flush', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-drain-once-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Replace the write stream with a fake one where:
      // - callbacks fire synchronously
      // - 'drain' is emitted asynchronously (via setImmediate) when write returns false
      // This ensures write callbacks fire before drain, exposing the double-drain bug in the mutation
      let writeCount = 0;
      const fakeStream = new EventEmitter() as any;
      fakeStream.cork = () => {};
      fakeStream.uncork = () => {};
      fakeStream.end = (cb?: () => void) => { if (cb) cb(); setImmediate(() => fakeStream.emit('close')); };
      fakeStream.destroy = () => {};
      fakeStream.write = function(data: string, cb: (err: Error | null) => void): boolean {
        writeCount++;
        // Call callback synchronously so _inFlightWrites is decremented before drain fires
        cb(null);
        // write1 returns false (triggers backpressure, key2/key3 queue up)
        // write2 returns false (mid-flush backpressure - this is where the mutation matters)
        // write3 returns true
        const returnValue = writeCount !== 1 && writeCount !== 2;
        if (!returnValue) {
          // Emit drain asynchronously - by this time all synchronous callbacks have fired
          setImmediate(() => fakeStream.emit('drain'));
        }
        return returnValue;
      };

      // Replace the write stream
      db._writeStream = fakeStream;

      let drainCount = 0;
      db.on('drain', () => { drainCount++; });

      let cbCount = 0;
      const onCb = () => {
        cbCount++;
        if (cbCount === 3) {
          // Schedule check after all pending setImmediate callbacks (drain events) have fired
          setImmediate(() => setImmediate(() => {
            // Original: drain fires exactly once (from key3 callback after third flush)
            // Mutation: drain fires twice (from key3 callback + stream drain handler finding empty queue)
            expect(drainCount).toBe(1);
            done();
          }));
        }
      };

      db.set('key1', 'val1', onCb);
      db.set('key2', 'val2', onCb);
      db.set('key3', 'val3', onCb);
    });

    db.on('error', done);
  });
});