import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush mutation detection', () => {
  it('should write all set keys to the database file exactly once', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 300;
      let completedCallbacks = 0;

      for (let i = 0; i < numKeys; i++) {
        const key = `key-${i}`;
        db.set(key, { index: i, payload: 'a'.repeat(3000) }, (err: unknown) => {
          completedCallbacks++;
          if (completedCallbacks === numKeys) {
            db.close();
            db.on('write_close', () => {
              // Reload the database and verify all keys are present
              const db2 = new Dirty(dbPath);
              const errors: Error[] = [];
              db2.on('error', (e: Error) => errors.push(e));
              db2.on('load', (count: number) => {
                db2.close();
                db2.on('write_close', () => {
                  fs.rmSync(tmpDir, { recursive: true, force: true });
                  expect(errors).toHaveLength(0);
                  expect(count).toBe(numKeys);
                  done();
                });
              });
            });
          }
        });
      }
    });

    db.on('error', (err: unknown) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err as Error);
    });
  }, 15000);
});