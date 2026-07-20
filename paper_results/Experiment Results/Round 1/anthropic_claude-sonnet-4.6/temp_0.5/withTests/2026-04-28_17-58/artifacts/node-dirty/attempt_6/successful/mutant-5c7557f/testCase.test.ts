import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event emitted from write stream drain handler', () => {
  it('should emit drain when _waitForDrain resets with empty queue and no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file) as any;

    db.on('load', () => {
      const timeout = setTimeout(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(new Error('Timed out - drain event never fired'));
      }, 3000);

      db.once('drain', () => {
        clearTimeout(timeout);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      // Simulate the exact state that the write stream drain handler deals with:
      // - _waitForDrain was true (backpressure occurred)
      // - queue is now empty
      // - no in-flight writes
      // Then trigger the write stream's drain event directly
      db._waitForDrain = true;
      db._queue.clear();
      db._inFlightWrites = 0;
      db._writeStream.emit('drain');
    });
  });
});