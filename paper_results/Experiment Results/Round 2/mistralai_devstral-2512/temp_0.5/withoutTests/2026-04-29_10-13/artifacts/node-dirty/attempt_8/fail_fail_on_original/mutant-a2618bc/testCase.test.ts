import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database flush behavior', () => {
  it('should properly break write loop during backpressure', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let writeCount = 0;
    let errorOccurred = false;

    db.on('load', () => {
      // Force backpressure by creating a slow write stream
      const originalWrite = db._writeStream!.write;
      let shouldReturnFalse = true;
      db._writeStream!.write = function(chunk: any, cb: any) {
        if (shouldReturnFalse) {
          shouldReturnFalse = false;
          db._waitForDrain = true;
          return false;
        }
        return originalWrite.call(this, chunk, cb);
      };

      // Queue multiple writes
      db.set('key1', { value: 1 }, (err: unknown) => {
        if (err) {
          errorOccurred = true;
          done(err as Error);
          return;
        }
        writeCount++;

        // After first write, queue more writes
        db.set('key2', { value: 2 }, (err: unknown) => {
          if (err) {
            errorOccurred = true;
            done(err as Error);
            return;
          }
          writeCount++;

          db.set('key3', { value: 3 }, (err: unknown) => {
            if (err) {
              errorOccurred = true;
              done(err as Error);
              return;
            }
            writeCount++;

            // Verify all writes completed
            expect(writeCount).toBe(3);
            expect(db.get('key1')).toEqual({ value: 1 });
            expect(db.get('key2')).toEqual({ value: 2 });
            expect(db.get('key3')).toEqual({ value: 3 });

            cleanup();
            done();
          });
        });
      });
    });

    const cleanup = () => {
      try {
        db.close();
        if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }
    };

    db.on('error', (err) => {
      errorOccurred = true;
      cleanup();
      done(err);
    });

    // Final timeout
    setTimeout(() => {
      if (!errorOccurred) {
        cleanup();
        done(new Error('Test timed out'));
      }
    }, 2000);
  });
});