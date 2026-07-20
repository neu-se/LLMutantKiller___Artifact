import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event timing correctness', () => {
  it('should emit drain only after all write callbacks have fired', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut3-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(new Error('timed out waiting for drain'));
      }, 8000);

      let callbackCount = 0;
      const totalSets = 3;

      const onSetCallback = () => {
        callbackCount++;
      };

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        // On original: drain fires only when inFlightWrites <= 0
        // meaning all write callbacks must have already fired
        // On mutated: drain fires when inFlightWrites > 0 (premature)
        // so callbackCount will be less than totalSets
        if (callbackCount < totalSets) {
          done(new Error(`drain fired before all write callbacks: only ${callbackCount}/${totalSets} completed`));
        } else {
          done();
        }
      });

      // Write large values to trigger backpressure so stream drain fires
      // while writes are still in-flight
      const largeValue = 'x'.repeat(64 * 1024);
      db.set('key1', largeValue, onSetCallback);
      db.set('key2', largeValue, onSetCallback);
      db.set('key3', largeValue, onSetCallback);
    });
  });
});