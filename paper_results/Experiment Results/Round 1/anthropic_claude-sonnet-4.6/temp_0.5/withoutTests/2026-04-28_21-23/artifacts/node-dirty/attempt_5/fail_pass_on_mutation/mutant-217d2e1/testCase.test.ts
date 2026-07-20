import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should emit drain event after write completes under backpressure conditions', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write a large value to try to trigger backpressure
      const largeVal = 'x'.repeat(1024 * 1024); // 1MB string
      let drainEmitted = false;

      db.on('drain', () => {
        drainEmitted = true;
      });

      db.set('bigkey', largeVal, () => {
        // callback fires when persisted
      });

      // Wait long enough for drain to be emitted
      setTimeout(() => {
        try {
          expect(drainEmitted).toBe(true);
          db.close();
          db.once('write_close', () => {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            done();
          });
        } catch (e) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(e);
        }
      }, 3000);
    });
  }, 10000);
});