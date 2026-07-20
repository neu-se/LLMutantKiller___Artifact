import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('close() with in-flight writes', () => {
  it('should not call _writeStream.end() while writes are still in flight', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-mutant-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Perform a write - this flushes immediately, leaving _queue.size=0, _inFlightWrites=1
      db.set('key1', 'val1');

      // Call close() while write is in flight
      // Original: _queue.size(0) || _inFlightWrites(1)>0 = true → waits, stream stays open
      // Mutated:  _queue.size(0) && _inFlightWrites(1)>0 = false → calls _writeStream.end() now
      db.close();

      // In original: stream is still open, so another set() works fine
      // In mutated: stream is in 'ending' state, write() throws ERR_STREAM_WRITE_AFTER_END
      let errorFromSet: Error | null = null;
      try {
        db.set('key2', 'val2');
      } catch (err: any) {
        errorFromSet = err;
      }

      // Add error listener to prevent unhandled error events from crashing
      db.on('error', () => { /* suppress */ });

      db.once('write_close', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        // Original: no error thrown → passes
        // Mutated: ERR_STREAM_WRITE_AFTER_END thrown → fails
        expect(errorFromSet).toBeNull();
        done();
      });
    });
  });
});