import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() behavior with pending queue but no in-flight writes', () => {
  it('should wait for drain when queue has items but no in-flight writes yet', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}.dirty`);

    const cleanup = () => {
      try { fs.unlinkSync(file); } catch (_) {}
    };

    const db = new Dirty(file);

    db.on('load', () => {
      // We need a scenario where _queue.size > 0 but _inFlightWrites === 0
      // OR _queue.size === 0 but _inFlightWrites > 0
      //
      // Scenario: _queue.size > 0, _inFlightWrites === 0
      // This happens if we can call close() before _flush() runs.
      // But _flush() is called synchronously in set()...
      //
      // Let's try: pause the write stream so _waitForDrain is set,
      // meaning items stay in queue. Then call close().
      // _queue.size > 0, _inFlightWrites could be 0 or 1.
      //
      // Actually the simplest approach: just verify that after close(),
      // the write_close event eventually fires AND the data was persisted.
      // With mutation, close() may destroy the stream before write completes.

      let setCbFired = false;

      db.set('foo', 'bar', (err: Error | null) => {
        setCbFired = true;
      });

      // Call close immediately - queue may still have items or flush already happened
      // Original: waits if queue.size > 0 OR inFlightWrites > 0
      // Mutated: only waits if BOTH queue.size > 0 AND inFlightWrites > 0
      // After _flush(): queue.size === 0, inFlightWrites === 1
      // Mutated skips waiting → destroys stream → set callback never fires
      db.close();

      db.once('write_close', () => {
        cleanup();
        // In original: set callback must have fired before write_close
        // In mutated: stream destroyed early, set callback may never fire
        expect(setCbFired).toBe(true);
        done();
      });
    });
  });
});