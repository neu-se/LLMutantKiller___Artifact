import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush after drain', () => {
  it('should persist all queued writes even when write stream triggers drain event with pending queue items', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = () => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
    };

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      cleanup();
      done(err);
    });

    db.on('load', () => {
      // Write a large number of entries to increase the chance of triggering backpressure
      // When backpressure occurs, _waitForDrain is set to true and remaining keys stay in queue
      // After drain fires, original code calls _flush() to process remaining queue items
      // Mutated code does NOT call _flush(), so those items are never written
      const numWrites = 2000;
      let completedWrites = 0;

      const onWriteDone = (err?: Error | null) => {
        if (err) {
          cleanup();
          done(err);
          return;
        }
        completedWrites++;
        if (completedWrites === numWrites) {
          // All callbacks fired - now close and verify persistence
          db.close();
          db.once('write_close', () => {
            // Reopen and verify all data was persisted
            const db2 = new Dirty(dbPath);
            db2.on('error', (err2: Error) => {
              cleanup();
              done(err2);
            });
            db2.on('load', (count: number) => {
              try {
                expect(count).toBe(numWrites);
                for (let i = 0; i < numWrites; i++) {
                  expect(db2.get(`key${i}`)).toBe(`value${i}`);
                }
                cleanup();
                done();
              } catch (e) {
                cleanup();
                done(e);
              }
            });
          });
        }
      };

      // Queue all writes at once to maximize chance of backpressure
      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, `value${i}`, onWriteDone);
      }
    });
  }, 30000);
});