import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush processes all queued keys per call', () => {
  it('should emit drain exactly once for a batch of keys set before any IO completes', (done) => {
    const dbPath = join(tmpdir(), `dirty-drain-total-${process.pid}.db`);
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
      };

      // Set all keys synchronously so they're all queued before any IO
      db.set('a', 1, check);
      db.set('b', 2, check);
      db.set('c', 3, check);

      // Wait long enough for all IO to complete
      setTimeout(() => {
        expect(callbackCount).toBe(totalKeys);
        // Original: 1 drain for the whole batch
        // Mutant: 3 drains (one per key)
        expect(drainCount).toBe(1);

        db.close();
        db.on('write_close', () => {
          try { unlinkSync(dbPath); } catch (_e) {}
          done();
        });
      }, 2000);
    });

    db.on('error', (err: Error) => done(err));
  }, 10000);
});