import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush after drain', () => {
  it('should flush remaining queue items after write stream drain event', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Queue up many writes to increase chance of triggering backpressure/drain
      const numWrites = 1000;
      let completedWrites = 0;

      const checkDone = (err?: Error | null) => {
        if (err) {
          cleanup();
          done(err);
          return;
        }
        completedWrites++;
        if (completedWrites === numWrites) {
          // All writes completed, now close and reopen to verify persistence
          db.close();
          db.on('write_close', () => {
            // Reopen and verify all data was persisted
            const db2 = new Dirty(dbPath);
            db2.on('load', (count: number) => {
              try {
                expect(count).toBe(numWrites);
                for (let i = 0; i < numWrites; i++) {
                  expect(db2.get(`key${i}`)).toBe(`value${i}`);
                }
                db2.close();
                db2.on('write_close', () => {
                  cleanup();
                  done();
                });
              } catch (e) {
                cleanup();
                done(e);
              }
            });
            db2.on('error', (err: Error) => {
              cleanup();
              done(err);
            });
          });
        }
      };

      const cleanup = () => {
        rimraf.sync(tmpDir);
      };

      // Set many keys with callbacks to track completion
      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, `value${i}`, checkDone);
      }
    });

    db.on('error', (err: Error) => {
      rimraf.sync(tmpDir);
      done(err);
    });
  });
});