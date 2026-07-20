import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database flush behavior', () => {
  it('should properly handle write queue during backpressure', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let writeCompleted = 0;
    let errorOccurred = false;

    db.on('load', () => {
      // Create backpressure by writing to the file directly
      const tempStream = fs.createWriteStream(dbPath, { flags: 'a', highWaterMark: 16 });
      tempStream.write('x'.repeat(1024)); // Fill buffer
      tempStream.end();

      // Queue multiple writes
      db.set('key1', { value: 1 }, (err: unknown) => {
        if (err) {
          errorOccurred = true;
          done(err as Error);
          return;
        }
        writeCompleted++;

        // After first write completes, queue more writes
        db.set('key2', { value: 2 }, (err: unknown) => {
          if (err) {
            errorOccurred = true;
            done(err as Error);
            return;
          }
          writeCompleted++;

          db.set('key3', { value: 3 }, (err: unknown) => {
            if (err) {
              errorOccurred = true;
              done(err as Error);
              return;
            }
            writeCompleted++;

            // Verify all writes completed
            expect(writeCompleted).toBe(3);
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