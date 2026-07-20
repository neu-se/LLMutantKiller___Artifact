import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with queue items and no in-flight writes', () => {
  it('should write queued items to disk before closing', (done) => {
    const file = path.join(os.tmpdir(), `dirty-q3-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);

    db.on('load', () => {
      // Directly manipulate internal state:
      // 1. Add item to _queue manually (bypassing _flush)
      // 2. Ensure _inFlightWrites === 0
      // 3. Call close()
      // 4. Then manually trigger _flush() to process the queue
      //    (simulating what would happen when writeStream drain fires)

      db._data.set('key2', 'val2');
      db._queue.set('key2', []);
      // _inFlightWrites is already 0, _waitForDrain is false

      // Now: _queue.size === 1, _inFlightWrites === 0
      // Original close(): (1 || false) = true → registers drain listener
      // Mutated close():  (1 && false) = false → ends stream immediately

      db.close();

      // In original: drain listener registered, now call _flush to process queue
      // _flush will write key2, then emit drain, then close() called again
      db._flush();

      db.once('write_close', () => {
        const contents = fs.readFileSync(file, 'utf-8');
        cleanup();
        expect(contents).toContain('"key2"');
        done();
      });
    });
  });
});