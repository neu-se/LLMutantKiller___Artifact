import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush backpressure behavior', () => {
  it('should call all callbacks after writing many keys when backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const numKeys = 100;
      let callbackCount = 0;
      const errors: Error[] = [];

      const checkDone = () => {
        callbackCount++;
        if (callbackCount === numKeys) {
          // All callbacks fired - now verify data integrity
          try {
            // Verify all keys are in memory
            for (let i = 0; i < numKeys; i++) {
              const val = db.get(`key${i}`);
              expect(val).toEqual({ index: i });
            }

            db.close();
            db.on('write_close', () => {
              // Verify data was persisted to disk
              const content = fs.readFileSync(dbPath, 'utf-8');
              const lines = content.trim().split('\n').filter(l => l.length > 0);
              expect(lines.length).toBe(numKeys);

              rimraf(tmpDir).then(() => done()).catch(done);
            });
          } catch (e) {
            rimraf(tmpDir).then(() => done(e as Error)).catch(done);
          }
        }
      };

      // Write many keys at once to trigger backpressure
      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, { index: i }, (err?: Error) => {
          if (err) errors.push(err);
          checkDone();
        });
      }
    });

    db.on('error', (err: Error) => {
      rimraf(tmpDir).then(() => done(err)).catch(done);
    });
  });
});