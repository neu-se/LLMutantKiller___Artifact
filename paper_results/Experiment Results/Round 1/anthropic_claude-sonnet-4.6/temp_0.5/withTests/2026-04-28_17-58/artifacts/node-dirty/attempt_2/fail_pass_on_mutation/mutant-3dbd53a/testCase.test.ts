import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty write stream drain behavior', () => {
  it('should emit drain event after writing multiple keys and correctly persist all data', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-drain-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const NUM_KEYS = 1000;
    let drainCount = 0;

    db.on('load', () => {
      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify all data was written correctly
          const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
          expect(lines.length).toBe(NUM_KEYS);
          for (let i = 0; i < NUM_KEYS; i++) {
            const row = JSON.parse(lines[i]);
            expect(row.val).toBe(`value${i}`);
          }
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        }
      });
    });

    db.on('error', done);
  });
});