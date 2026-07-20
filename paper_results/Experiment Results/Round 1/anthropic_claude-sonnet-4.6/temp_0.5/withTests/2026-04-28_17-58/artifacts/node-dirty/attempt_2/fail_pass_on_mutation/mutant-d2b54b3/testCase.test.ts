import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event after write stream backpressure', () => {
  it('should emit drain when write stream drains with empty queue', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mutation-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      // Write a very large value to force write stream backpressure
      // This causes _waitForDrain=true and queue may be empty when stream drains
      const largeValue = 'x'.repeat(256 * 1024);

      db.on('drain', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      // Single large write: _writeStream.write() returns false -> _waitForDrain=true
      // queue becomes empty (only one key), inFlightWrites=1
      // When stream drains: queue.size==0, so enters the mutated branch
      // If inFlightWrites > 0 still, only the mutated path emits drain
      db.set('bigkey', largeValue);
    });
  }, 10000);
});