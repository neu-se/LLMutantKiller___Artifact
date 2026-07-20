import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event after backpressure with pending in-flight writes', () => {
  it('should not emit drain prematurely when in-flight writes are still pending after stream drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut2-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(new Error('timed out'));
      }, 8000);

      // Track whether all set callbacks have fired when drain fires
      let allCallbacksFired = false;
      let callbackCount = 0;
      const totalSets = 3;

      const onSetCallback = () => {
        callbackCount++;
        if (callbackCount === totalSets) {
          allCallbacksFired = true;
        }
      };

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        // On original: drain fires only when inFlightWrites <= 0, meaning all writes done
        // On mutated: drain might fire when inFlightWrites > 0, meaning writes not done yet
        if (!allCallbacksFired) {
          done(new Error('drain fired before all write callbacks completed'));
        } else {
          done();
        }
      });

      // Write large values to trigger backpressure
      const largeValue = 'x'.repeat(64 * 1024);
      db.set('key1', largeValue, onSetCallback);
      db.set('key2', largeValue, onSetCallback);
      db.set('key3', largeValue, onSetCallback);
    });
  });
});