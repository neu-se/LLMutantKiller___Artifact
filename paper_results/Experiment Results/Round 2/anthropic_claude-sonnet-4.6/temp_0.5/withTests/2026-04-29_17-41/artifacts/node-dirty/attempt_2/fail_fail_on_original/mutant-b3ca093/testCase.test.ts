import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty _flush guard condition', () => {
  it('should not emit drain event more than once when set is called while waitForDrain is true but stream has capacity', (done) => {
    const file = path.join(os.tmpdir(), `dirty-flush-guard-${Date.now()}.dirty`);
    const db = new (Dirty as any)(file);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Write enough data to trigger backpressure (exceed 16KB high water mark)
      db.set('key0', 'x'.repeat(65536));

      // Call set in process.nextTick: fires before I/O events,
      // so _waitForDrain is still true, but the stream may have physically
      // drained (OS write completed). With the mutation, _flush() proceeds
      // and write() returns true (stream has capacity), setting _waitForDrain=false.
      // This causes drain to emit from the write callback AND from the stream
      // drain event handler — a double drain.
      process.nextTick(() => {
        db.set('key1', 'y');

        // Wait several event loop iterations to catch any extra drain events
        setImmediate(() => {
          setImmediate(() => {
            setImmediate(() => {
              expect(drainCount).toBe(1);
              try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
              done();
            });
          });
        });
      });
    });
  });
});