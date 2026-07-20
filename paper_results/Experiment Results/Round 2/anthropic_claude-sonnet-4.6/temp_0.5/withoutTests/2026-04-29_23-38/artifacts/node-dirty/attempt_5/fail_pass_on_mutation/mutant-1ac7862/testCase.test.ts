import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush processes all queued keys per call', () => {
  it('should emit drain only once when multiple keys are set before any flush occurs', (done) => {
    const dbPath = join(tmpdir(), `dirty-once-drain-${process.pid}.db`);
    if (existsSync(dbPath)) unlinkSync(dbPath);

    const db = new Dirty(dbPath);
    let drainCount = 0;
    let callbackCount = 0;
    const totalKeys = 3;

    db.on('drain', () => {
      drainCount++;
    });

    db.on('load', () => {
      const check = (_err: unknown) => {
        callbackCount++;
        if (callbackCount === totalKeys) {
          // All write callbacks have fired.
          // Wait a few ticks to let any additional drain events fire.
          setImmediate(() => setImmediate(() => setImmediate(() => {
            // Original: all 3 keys written in one batch → 1 drain
            // Mutant: 1 key per flush → 3 drains (one per key)
            expect(drainCount).toBe(1);

            db.close();
            db.on('write_close', () => {
              try { unlinkSync(dbPath); } catch (_e) {}
              done();
            });
          })));
        }
      };

      db.set('a', 1, check);
      db.set('b', 2, check);
      db.set('c', 3, check);
    });

    db.on('error', (err: Error) => done(err));
  }, 10000);
});