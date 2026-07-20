import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event count with backpressure', () => {
  it('should emit drain exactly once after all writes complete', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new (Dirty as any)(file);

    db.on('load', () => {
      let drainCount = 0;
      let allCallbacksDone = false;
      let callbacksCompleted = 0;
      const numWrites = 30;
      const largeValue = 'x'.repeat(65536);

      db.on('drain', () => {
        drainCount++;
      });

      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, largeValue, () => {
          callbacksCompleted++;
          if (callbacksCompleted === numWrites) {
            allCallbacksDone = true;
            // Give time for any extra drain events to fire
            setImmediate(() => {
              setImmediate(() => {
                // In original: drain fires only when _inFlightWrites <= 0
                // With backpressure, stream drain fires once, but since
                // _inFlightWrites > 0, original doesn't emit drain there.
                // Drain is emitted from write callbacks when count hits 0.
                // In mutated: drain fires from stream drain handler too (extra drain).
                // So mutated code emits drain more times than original.
                expect(drainCount).toBe(1);
                try { fs.unlinkSync(file); } catch (e) {}
                try { fs.rmdirSync(tmpDir); } catch (e) {}
                done();
              });
            });
          }
        });
      }
    });
  });
});