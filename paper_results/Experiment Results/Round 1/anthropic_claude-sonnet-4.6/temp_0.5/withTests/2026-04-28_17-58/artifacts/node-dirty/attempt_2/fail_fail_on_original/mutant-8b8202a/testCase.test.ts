import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event timing with backpressure', () => {
  it('should only emit drain after all in-flight write callbacks have completed', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new (Dirty as any)(file);

    db.on('load', () => {
      let callbacksCompleted = 0;
      const numWrites = 30;
      // Large enough value to trigger backpressure on the write stream
      const largeValue = 'x'.repeat(65536);

      db.once('drain', () => {
        // In the original: drain only fires when _inFlightWrites <= 0,
        // meaning all write callbacks have fired.
        // In the mutated code: drain fires even when _inFlightWrites > 0,
        // so callbacksCompleted may be less than numWrites here.
        expect(callbacksCompleted).toBe(numWrites);
        rimrafSync(tmpDir);
        done();
      });

      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, largeValue, () => {
          callbacksCompleted++;
        });
      }
    });
  });
});