import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() mutation detection', () => {
  it('should emit drain before closing when queue has pending items', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutant-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);

    db.on('load', () => {
      // Write first item and wait for it to complete (drain fires)
      db.set('key1', 'val1');

      db.once('drain', () => {
        // Now: _queue.size === 0, _inFlightWrites === 0
        // Manually set _waitForDrain = true to prevent _flush() from running
        db._waitForDrain = true;

        // Add item to queue - _flush() will return early due to _waitForDrain
        // So: _queue.size === 1, _inFlightWrites === 0
        db.set('key2', 'val2');

        // Verify our setup: queue has item, no in-flight writes
        // Original close(): (1 || 0>0) = true → waits for drain
        // Mutated close():  (1 && 0>0) = false → closes immediately, key2 lost

        // Now reset _waitForDrain so the drain event can eventually fire
        // when close() registers its drain listener and something triggers drain
        db._waitForDrain = false;

        db.close();

        db.once('write_close', () => {
          const contents = fs.readFileSync(file, 'utf-8');
          cleanup();
          expect(contents).toContain('"key2"');
          expect(contents).toContain('"val2"');
          done();
        });
      });
    });
  });
});