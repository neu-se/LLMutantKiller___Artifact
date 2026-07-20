import { tmpdir } from 'os';
import { join } from 'path';
import { unlinkSync, existsSync, readFileSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('should write all keys to disk file correctly when many keys are set', (done) => {
    const dbPath = join(tmpdir(), `dirty-many-keys-${process.pid}.db`);
    if (existsSync(dbPath)) unlinkSync(dbPath);

    // First, create a db, write many keys, close it, then reopen and verify all keys present
    const db = new Dirty(dbPath);
    const numKeys = 20;
    let callbackCount = 0;

    db.on('load', () => {
      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, i, (_err: unknown) => {
          callbackCount++;
          if (callbackCount === numKeys) {
            db.close();
            db.on('write_close', () => {
              // Reopen and verify all keys are present
              const db2 = new Dirty(dbPath);
              db2.on('load', (count: number) => {
                expect(count).toBe(numKeys);
                for (let j = 0; j < numKeys; j++) {
                  expect(db2.get(`key${j}`)).toBe(j);
                }
                db2.close();
                db2.on('write_close', () => {
                  try { unlinkSync(dbPath); } catch (_e) {}
                  done();
                });
              });
              db2.on('error', (err: Error) => done(err));
            });
          }
        });
      }
    });

    db.on('error', (err: Error) => done(err));
  }, 15000);
});