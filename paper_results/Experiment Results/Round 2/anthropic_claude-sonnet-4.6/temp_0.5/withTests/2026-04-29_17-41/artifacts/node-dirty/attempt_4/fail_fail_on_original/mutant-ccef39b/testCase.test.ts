import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with items remaining in queue', () => {
  it('should wait for drain when queue has items even if no in-flight writes', (done) => {
    const file = path.join(os.tmpdir(), `dirty-queue-test-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);

    db.on('load', () => {
      // Force _waitForDrain by overriding the write stream's write method
      // so it always returns false (backpressure), keeping items in queue
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let firstWrite = true;

      db._writeStream.write = function(data: any, cb: any) {
        if (firstWrite) {
          firstWrite = false;
          // First write: actually write but signal backpressure
          originalWrite(data, cb);
          db._waitForDrain = true;
          return false;
        }
        return originalWrite(data, cb);
      };

      // First set: triggers _flush(), writes 'foo', sets _waitForDrain=true
      db.set('foo', 'bar');

      // Second set: goes into _queue but _flush() returns early due to _waitForDrain
      // Now: _queue.size === 1, _inFlightWrites === 0 (first write callback already fired or pending)
      db.set('baz', 'qux');

      // At this point _queue has 'baz', _inFlightWrites may be 0
      // Original close(): (1 || 0) = true → waits for drain
      // Mutated close():  (1 && 0) = false → closes immediately, losing 'baz'
      db.close();

      db.once('write_close', () => {
        // Read the file to verify both keys were written
        const contents = fs.readFileSync(file, 'utf-8');
        cleanup();
        expect(contents).toContain('"baz"');
        expect(contents).toContain('"qux"');
        done();
      });
    });
  });
});