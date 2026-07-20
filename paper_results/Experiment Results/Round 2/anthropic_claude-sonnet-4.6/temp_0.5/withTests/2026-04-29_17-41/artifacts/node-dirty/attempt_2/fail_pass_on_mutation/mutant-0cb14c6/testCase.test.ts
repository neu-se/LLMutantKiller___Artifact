import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event emission after write stream backpressure', () => {
  it('should emit drain when inFlightWrites is exactly 0 after write stream drain event', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    const timeout = setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Timed out waiting for drain event - mutation likely present'));
    }, 8000);

    db.on('load', () => {
      // Write large values to force write stream backpressure (_waitForDrain = true)
      // When the stream drains, _inFlightWrites should be 0
      // Original: <= 0 emits drain; Mutated: < 0 does NOT emit drain
      const largeValue = Buffer.alloc(64 * 1024, 'a').toString();

      for (let i = 0; i < 30; i++) {
        db.set(`key${i}`, largeValue);
      }

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});