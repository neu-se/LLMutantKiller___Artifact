import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() ordering', () => {
  it('drain event should fire before write_close when close is called during in-flight write', (done) => {
    const file = path.join(os.tmpdir(), `dirty-order-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);

    db.on('load', () => {
      const events: string[] = [];

      // After set(), _flush() runs synchronously:
      // _queue becomes empty, _inFlightWrites becomes 1
      // write callback fires async
      db.set('foo', 'bar');

      // At this point: _queue.size === 0, _inFlightWrites === 1
      // Original: (0 || 1>0) = true → registers drain listener, returns
      //   → write cb fires → _inFlightWrites=0 → drain emitted
      //   → close() called again → _writeStream.end() → write_close
      // Mutated: (0 && 1>0) = false → immediately calls _writeStream.end()
      //   → write_close fires WITHOUT drain having fired first
      db.close();

      db.on('drain', () => {
        events.push('drain');
      });

      db.once('write_close', () => {
        cleanup();
        // In original: drain fires first, then close() called again → write_close
        // In mutated: write_close fires without drain
        expect(events).toContain('drain');
        done();
      });

      // Safety timeout
      setTimeout(() => {
        cleanup();
        done(new Error('Timed out waiting for write_close'));
      }, 4000);
    });
  });
});