import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream drain handling', () => {
  it('should continue flushing remaining queue items after write stream backpressure is relieved', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-drain-test-${process.pid}-${Date.now()}.db`);
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Use large values to trigger write stream backpressure
      const largeValue = 'x'.repeat(65536);
      const keys = Array.from({ length: 30 }, (_, i) => `key${i}`);
      let allCallbacksFired = false;
      let callbackCount = 0;

      const onCallback = () => {
        callbackCount++;
        if (callbackCount === keys.length) {
          allCallbacksFired = true;
        }
      };

      db.once('drain', () => {
        // With the mutation: drain fires while queue still has items
        // (backpressure triggered, queue not empty → emit drain immediately)
        // This means not all writes have completed yet
        // With original: drain fires only when queue is empty AND inFlightWrites = 0
        
        // After drain, re-open the db and verify all keys are persisted
        db.close();
        db.once('write_close', () => {
          const db2 = new Dirty(dbPath);
          db2.on('load', (count: number) => {
            // All keys should be persisted
            // With mutation: drain fires early, so some keys may not be written yet
            expect(count).toBe(keys.length);
            for (const key of keys) {
              expect(db2.get(key)).toBeDefined();
            }
            db2.close();
            db2.once('write_close', () => {
              fs.unlink(dbPath, () => done());
            });
          });
          db2.on('error', (err: Error) => {
            fs.unlink(dbPath, () => {});
            done(err);
          });
        });
      });

      for (const key of keys) {
        db.set(key, { key, data: largeValue }, onCallback);
      }
    });

    db.on('error', (err: Error) => {
      fs.unlink(dbPath, () => {});
      done(err);
    });
  }, 30000);
});