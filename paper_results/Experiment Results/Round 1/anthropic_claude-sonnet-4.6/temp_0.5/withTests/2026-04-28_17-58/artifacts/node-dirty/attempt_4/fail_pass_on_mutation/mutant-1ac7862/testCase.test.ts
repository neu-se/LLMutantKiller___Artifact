import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty flush behavior', () => {
  it('should emit drain exactly once after setting multiple keys simultaneously', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);
    const db = new (Dirty as any)(tmpFile);

    db.on('load', () => {
      let drainCount = 0;

      db.set('alpha', 'value1');
      db.set('beta', 'value2');
      db.set('gamma', 'value3');

      db.on('drain', () => {
        drainCount++;
      });

      // Wait long enough for all writes to complete
      setTimeout(() => {
        expect(drainCount).toBe(1);
        try { fs.unlinkSync(tmpFile); } catch {}
        done();
      }, 500);
    });
  }, 5000);
});