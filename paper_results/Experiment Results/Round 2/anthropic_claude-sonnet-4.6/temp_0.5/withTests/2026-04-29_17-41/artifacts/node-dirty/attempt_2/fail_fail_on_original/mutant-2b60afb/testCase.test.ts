import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event after write stream backpressure', () => {
  it('should emit drain event even when write stream previously signaled backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-${process.pid}-${Date.now()}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Write many large values to force write stream backpressure (_waitForDrain = true)
      // When backpressure occurs, _flush breaks early and remaining keys stay in queue
      // After write stream drains, original code checks if queue is empty and emits 'drain'
      // Mutated code never emits 'drain' through this path
      const largeVal = Buffer.alloc(64 * 1024, 'a').toString();

      db.once('drain', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });

      // Write enough large entries to trigger backpressure
      for (let i = 0; i < 200; i++) {
        db.set(`key${i}`, largeVal);
      }
    });

    setTimeout(() => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(new Error('Timed out: drain event was never emitted (mutation may be active)'));
    }, 15000);
  });
});