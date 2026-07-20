import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty write stream drain handling', () => {
  it('should reset _waitForDrain and flush remaining queue when write stream emits drain', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      // Directly simulate the backpressure scenario:
      // 1. Set _waitForDrain = true (as if write returned false)
      // 2. Add items to the queue manually
      // 3. Emit 'drain' on the write stream
      // Original code: resets _waitForDrain, flushes queue, emits 'drain' on db
      // Mutated code: does nothing, queue never flushed, db 'drain' never fires

      db._waitForDrain = true;

      // Add a key to the queue without calling _flush (since _waitForDrain is true, _flush would return early)
      db._data.set('key1', 'value1');
      const cbs: any[] = [];
      db._queue.set('key1', cbs);

      const timeout = setTimeout(() => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(new Error('Timed out: drain event never fired after write stream drain'));
      }, 3000);

      db.on('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });

      // Trigger the write stream's drain event to simulate backpressure relief
      db._writeStream.emit('drain');
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});