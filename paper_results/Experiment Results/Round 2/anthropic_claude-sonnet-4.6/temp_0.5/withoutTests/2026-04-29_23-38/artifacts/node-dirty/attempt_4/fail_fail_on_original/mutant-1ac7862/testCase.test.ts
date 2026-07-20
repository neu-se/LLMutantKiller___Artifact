import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush behavior with multiple keys', () => {
  it('should have processed all keys by the time the first drain event fires', (done) => {
    const dbPath = join(tmpdir(), `dirty-drain-test-${process.pid}.db`);

    if (existsSync(dbPath)) unlinkSync(dbPath);

    const db = new Dirty(dbPath);
    let callbackCount = 0;
    let firstDrainSeen = false;

    db.on('drain', () => {
      if (!firstDrainSeen) {
        firstDrainSeen = true;
        // In original code: all 3 keys flushed in one batch,
        // so all 3 write callbacks have fired before drain.
        // In mutant: only 1 key per flush, so only 1-2 callbacks fired by first drain.
        expect(callbackCount).toBe(3);

        db.close();
        db.on('write_close', () => {
          try { unlinkSync(dbPath); } catch (_e) {}
          done();
        });
      }
    });

    db.on('load', () => {
      db.set('a', 1, (_err: unknown) => { callbackCount++; });
      db.set('b', 2, (_err: unknown) => { callbackCount++; });
      db.set('c', 3, (_err: unknown) => { callbackCount++; });
    });

    db.on('error', (err: Error) => done(err));
  }, 10000);
});