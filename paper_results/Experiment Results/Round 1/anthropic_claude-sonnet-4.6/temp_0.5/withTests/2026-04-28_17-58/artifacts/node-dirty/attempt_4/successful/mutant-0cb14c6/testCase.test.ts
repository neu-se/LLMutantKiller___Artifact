import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const rimraf = require('rimraf');
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event via write stream drain handler when _inFlightWrites is 0', () => {
  it('should emit drain when write stream drain fires and _inFlightWrites equals 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(filePath);

    const cleanup = () => {
      try { rimraf.sync(tmpDir); } catch (_) {}
    };

    const timeoutHandle = setTimeout(() => {
      cleanup();
      done(new Error('Timed out: drain event was never emitted'));
    }, 5000);

    db.on('load', () => {
      // Manually set the internal state to simulate what happens after backpressure:
      // _waitForDrain = true means we're waiting for the stream to drain
      // _inFlightWrites = 0 means all writes have completed their callbacks
      // In this state, only the write stream 'drain' handler can emit 'drain'
      // Original: if (_inFlightWrites <= 0) => emits 'drain' (0 <= 0 is true)
      // Mutated:  if (_inFlightWrites < 0)  => does NOT emit 'drain' (0 < 0 is false)
      db._waitForDrain = true;
      db._inFlightWrites = 0;

      db.on('drain', () => {
        clearTimeout(timeoutHandle);
        cleanup();
        done();
      });

      // Trigger the write stream's drain event directly
      db._writeStream.emit('drain');
    });
  });
});