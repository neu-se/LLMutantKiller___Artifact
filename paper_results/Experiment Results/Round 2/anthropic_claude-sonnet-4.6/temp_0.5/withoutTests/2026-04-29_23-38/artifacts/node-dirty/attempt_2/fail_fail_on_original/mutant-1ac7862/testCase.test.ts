import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush behavior with multiple keys', () => {
  it('should call all callbacks after a single drain when multiple keys are queued simultaneously', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-multflush-${process.pid}.db`);

    if (existsSync(dbPath)) unlinkSync(dbPath);

    const db = new Dirty(dbPath);
    let callbackCount = 0;

    db.on('drain', () => {
      // On the first drain, all 3 callbacks should have fired (original behavior).
      // With the mutant, only 1 callback fires per drain cycle.
      expect(callbackCount).toBe(3);

      db.close();
      db.on('write_close', () => {
        if (existsSync(dbPath)) {
          try { unlinkSync(dbPath); } catch (_e) {}
        }
        done();
      });
    });

    db.on('load', () => {
      db.set('a', 1, (_err: unknown) => { callbackCount++; });
      db.set('b', 2, (_err: unknown) => { callbackCount++; });
      db.set('c', 3, (_err: unknown) => { callbackCount++; });
    });

    db.on('error', (err: Error) => done(err));
  }, 5000);
});