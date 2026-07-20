import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with in-flight writes ordering', () => {
  it('should emit drain before write_close when close is called with in-flight writes', (done) => {
    const file = path.join(os.tmpdir(), `dirty-order-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let drainFiredBeforeWriteClose = false;
    let drainFired = false;

    db.on('drain', () => {
      drainFired = true;
    });

    db.on('write_close', () => {
      drainFiredBeforeWriteClose = drainFired;
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      // Original: drain fires first (close deferred until drain), then close fires drain again after write_close
      // Mutated: streams closed immediately, write_close fires before drain
      expect(drainFiredBeforeWriteClose).toBe(true);
      done();
    });

    db.on('load', () => {
      db.set('key', 'value');
      // Force the flush to happen, then immediately close
      // At this point queue is empty but _inFlightWrites = 1
      setImmediate(() => {
        // Queue should be empty now, _inFlightWrites still > 0
        db.close();
      });
    });
  });
});