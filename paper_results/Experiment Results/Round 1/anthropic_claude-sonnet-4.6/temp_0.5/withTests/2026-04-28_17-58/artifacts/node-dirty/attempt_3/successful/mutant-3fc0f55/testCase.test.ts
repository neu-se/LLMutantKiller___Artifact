import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty write stream drain handling', () => {
  it('should emit the drain event after writing when write stream backpressure is triggered', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-drain-mutation-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // We need to force _waitForDrain to become true by making the write stream
      // return false. We do this by writing directly to the underlying stream
      // to fill its buffer, then set a key so _flush() runs and sets _waitForDrain=true.
      // After the stream drains, the original code resets _waitForDrain and calls _flush()
      // again. The mutated code never resets it, so the db 'drain' event never fires.

      // Fill the write stream buffer to force backpressure
      const writeStream = db._writeStream;
      // Write a large chunk directly to force the stream into a "wait for drain" state
      const bigChunk = Buffer.alloc(1024 * 1024, 'x'); // 1MB
      let drained = false;
      // Keep writing until the stream signals backpressure
      while (writeStream.write(bigChunk)) { /* keep writing */ }

      // Now set a key - _flush will run, write() will return false (backpressure),
      // setting _waitForDrain = true. The original code handles the subsequent
      // 'drain' event to reset this and emit 'drain'. The mutated code does not.
      db.set('testkey', 'testval');

      const timeout = setTimeout(() => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(new Error('Timed out waiting for drain event - mutation likely present'));
      }, 5000);

      db.once('drain', () => {
        clearTimeout(timeout);
        expect(db.get('testkey')).toBe('testval');
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  }, 10000);
});