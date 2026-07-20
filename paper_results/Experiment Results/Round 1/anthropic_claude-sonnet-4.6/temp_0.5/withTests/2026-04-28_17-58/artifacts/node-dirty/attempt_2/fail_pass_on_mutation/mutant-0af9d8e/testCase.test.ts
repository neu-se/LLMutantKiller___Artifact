import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event after write stream backpressure', () => {
  it('should emit drain when write stream drains with empty queue and zero in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-bp-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(new Error('drain event was never emitted - mutation likely present'));
      }, 8000);

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done();
      });

      // Write many large values to force write stream backpressure,
      // ensuring _waitForDrain becomes true during _flush().
      // When the stream drains with empty queue and _inFlightWrites === 0,
      // original emits 'drain'; mutated code does NOT.
      const largeValue = 'x'.repeat(2000);
      for (let i = 0; i < 10000; i++) {
        db.set(`key${i}`, largeValue);
      }
    });
  });
});