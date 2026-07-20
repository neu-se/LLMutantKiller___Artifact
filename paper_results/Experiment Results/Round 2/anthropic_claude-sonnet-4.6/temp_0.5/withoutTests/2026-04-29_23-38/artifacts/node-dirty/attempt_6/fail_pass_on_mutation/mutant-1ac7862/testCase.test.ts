import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush processes all queued keys per call', () => {
  it('should not emit drain until all queued keys have been written', (done) => {
    const dbPath = join(tmpdir(), `dirty-drain-queue-${process.pid}.db`);
    if (existsSync(dbPath)) unlinkSync(dbPath);

    const db = new Dirty(dbPath);
    let callbackCount = 0;
    const totalKeys = 3;
    let finished = false;

    db.on('drain', () => {
      if (finished) return;
      // At this point, all in-flight writes are done and queue is empty.
      // All 3 callbacks must have fired already (or be firing now).
      // Give one tick for the current callback to complete.
      setImmediate(() => {
        if (callbackCount < totalKeys) {
          // Drain fired before all callbacks - this is the mutant behavior
          // (drain fires after just 1 key written, 2 still pending)
          finished = true;
          db.close();
          db.on('write_close', () => {
            try { unlinkSync(dbPath); } catch (_e) {}
            done(new Error(`Drain fired with only ${callbackCount}/${totalKeys} callbacks completed`));
          });
        }
      });
    });

    db.on('load', () => {
      const check = (_err: unknown) => {
        callbackCount++;
        if (callbackCount === totalKeys && !finished) {
          finished = true;
          // All callbacks fired successfully
          db.close();
          db.on('write_close', () => {
            try { unlinkSync(dbPath); } catch (_e) {}
            done();
          });
        }
      };

      db.set('a', 1, check);
      db.set('b', 2, check);
      db.set('c', 3, check);
    });

    db.on('error', (err: Error) => done(err));
  }, 10000);
});