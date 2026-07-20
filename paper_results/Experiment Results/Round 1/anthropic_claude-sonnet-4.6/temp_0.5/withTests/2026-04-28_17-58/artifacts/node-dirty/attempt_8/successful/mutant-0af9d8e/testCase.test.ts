import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event count with backpressure', () => {
  it('should emit drain exactly once per write batch', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-count-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(new Error('timed out'));
      }, 8000);

      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
      });

      // Write large values to trigger backpressure
      const largeValue = 'x'.repeat(64 * 1024);
      db.set('key1', largeValue);
      db.set('key2', largeValue);
      db.set('key3', largeValue);

      // After enough time for all writes to complete, check drain count
      // Original: drain fires exactly once (from write callback when inFlightWrites=0)
      // Mutated: drain fires twice (once from stream handler prematurely, once from callback)
      setTimeout(() => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        if (drainCount === 1) {
          done();
        } else {
          done(new Error(`Expected drain to fire exactly once, but fired ${drainCount} times`));
        }
      }, 2000);
    });
  });
});